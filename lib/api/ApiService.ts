// Types for TypeScript
interface ApiError extends Error {
    response?: {
        data: any;
        status: number;
        statusText: string;
    };
    isNetworkError?: boolean;
}

interface ApiRequestOptions {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}

// Token management
let apiToken: string | null = null;

export const setToken = (token: string | null): void => {
    apiToken = token;
    // Also store in localStorage for client-side access
    if (typeof window !== 'undefined') {
        if (token) {
            localStorage.setItem('authTokens', JSON.stringify({ access: token }));
        } else {
            localStorage.removeItem('authTokens');
        }
    }
};

export const clearToken = (): void => {
    apiToken = null;
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authTokens');
    }
};

// Initialize token from localStorage on client side
if (typeof window !== 'undefined') {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
        try {
            const tokens = JSON.parse(storedTokens);
            apiToken = tokens.access;
        } catch (error) {
            console.error('Failed to parse stored tokens:', error);
            clearToken();
        }
    }
}

// Network utilities
// Network utilities - FIXED for SSR
export const isOnline = (): boolean => {
    // ✅ FIX: Check if we're in browser environment
    if (typeof navigator === 'undefined') {
        // During SSR, assume we're online
        return true;
    }
    return navigator.onLine;
};

export const getNetworkErrorInfo = () => {
    // ✅ FIX: Return null during SSR instead of throwing error
    if (typeof window === 'undefined') {
        return null; // No network errors during SSR
    }

    if (!isOnline()) {
        return {
            type: 'NO_INTERNET',
            message: 'No internet connection. Please check your network and try again.',
            userMessage: 'No internet connection. Please check your network and try again.'
        };
    }
    return null;
};

// Enhanced error handler
const handleApiError = (error: any): never => {
    console.error('API request failed:', error);

    // ✅ FIX: Only check network status in browser environment
    if (typeof window !== 'undefined' && !isOnline()) {
        const networkError: ApiError = new Error('No internet connection');
        networkError.response = {
            data: {
                error: 'No internet connection',
                detail: 'Please check your network connection and try again.',
                code: 'NETWORK_OFFLINE'
            },
            status: 0,
            statusText: 'Offline'
        };
        networkError.isNetworkError = true;
        throw networkError;
    }

    // Request timeout
    if (error.name === 'AbortError') {
        const timeoutError: ApiError = new Error('Request timeout');
        timeoutError.response = {
            data: {
                error: 'Request timeout',
                detail: 'The request took too long. Please check your internet connection and try again.',
                code: 'REQUEST_TIMEOUT'
            },
            status: 0,
            statusText: 'Timeout'
        };
        timeoutError.isNetworkError = true;
        throw timeoutError;
    }

    // General network issues
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        const networkError: ApiError = new Error('Network error');
        networkError.response = {
            data: {
                error: 'Network error',
                detail: 'Slow or no internet connection. Please check your network and try again.',
                code: 'NETWORK_ERROR'
            },
            status: 0,
            statusText: 'Network Error'
        };
        networkError.isNetworkError = true;
        throw networkError;
    }

    // Already structured error
    if (error.response) {
        throw error;
    }

    // Unknown error
    const unknownError: ApiError = new Error(error.message || 'Unknown error occurred');
    unknownError.response = {
        data: {
            error: 'Unknown error',
            detail: 'Something went wrong. Please try again later.',
            code: 'UNKNOWN_ERROR'
        },
        status: 0,
        statusText: 'Unknown Error'
    };
    throw unknownError;
};

// Request interceptor
const requestInterceptor = (url: string, config: RequestInit) => {
    // Add authentication token
    if (apiToken) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${apiToken}`
        };
    }

    // Add request ID for tracking
    const requestId = Math.random().toString(36).substring(7);
    config.headers = {
        ...config.headers,
        'X-Request-ID': requestId
    };

    console.log(`🚀 API Request: ${config.method} ${url}`, {
        requestId,
        hasAuth: !!apiToken
    });

    return config;
};

// Response interceptor
const responseInterceptor = async (response: Response, url: string) => {
    console.log(`✅ API Response: ${response.status} ${url}`);

    if (response.status === 401) {
        // Token expired - trigger logout
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('auth-logout'));
        }
    }

    return response;
};

// Main API request function
export const apiRequest = async <T = any>(
    url: string,
    method: string = 'GET',
    body: any = null,
    headers: Record<string, string> = {},
    options: ApiRequestOptions = {}
): Promise<T> => {
    const {
        timeout = 15000,
        retries = 0,
        retryDelay = 1000
    } = options;

    // ✅ FIX: Only check network in browser environment
    if (typeof window !== 'undefined') {
        const networkError = getNetworkErrorInfo();
        if (networkError) {
            const error: ApiError = new Error(networkError.message);
            error.response = {
                data: {
                    error: networkError.message,
                    detail: networkError.userMessage,
                    code: networkError.type
                },
                status: 0,
                statusText: 'Offline'
            };
            error.isNetworkError = true;
            throw error;
        }
    }

    const isFormData = body instanceof FormData;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let config: RequestInit = {
        method,
        headers: {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...headers,
        },
        signal: controller.signal,
    };

    // Apply request interceptor
    config = requestInterceptor(url, config);

    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    let lastError: any;

    // Retry logic
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!baseUrl) {
                throw new Error('API base URL not configured');
            }

            const fullUrl = `${baseUrl}${url}`;
            const response = await fetch(fullUrl, config);
            clearTimeout(timeoutId);

            // Apply response interceptor
            await responseInterceptor(response, url);

            let data: any;
            try {
                data = await response.json();
            } catch (parseError) {
                data = {
                    detail: response.statusText || 'Invalid response from server',
                    error: 'PARSE_ERROR'
                };
            }

            if (!response.ok) {
                const error: ApiError = new Error(data.detail || data.error || 'Request failed');
                error.response = {
                    data: data,
                    status: response.status,
                    statusText: response.statusText
                };

                console.error(`❌ API Error ${response.status}:`, {
                    url,
                    status: response.status,
                    data: data,
                    method: config.method
                });

                // Don't retry on client errors (4xx) except specific cases
                if (response.status >= 400 && response.status < 500 &&
                    response.status !== 408 && response.status !== 429) {
                    throw error;
                }

                // For retryable errors, store the error and continue to retry
                lastError = error;
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
                    continue;
                }
                throw error;
            }

            return data;
        } catch (error: any) {
            clearTimeout(timeoutId);

            // Retry network errors
            if ((error.name === 'AbortError' || error.message === 'Failed to fetch') &&
                attempt < retries) {
                lastError = error;
                await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
                continue;
            }

            if (attempt === retries) {
                return handleApiError(lastError || error);
            }
        }
    }

    throw lastError;
};

// Helper methods with TypeScript generics
export const apiGet = <T = any>(url: string, headers: Record<string, string> = {}, options: ApiRequestOptions = {}): Promise<T> =>
    apiRequest<T>(url, 'GET', null, headers, options);

export const apiPost = <T = any>(url: string, body: any = null, headers: Record<string, string> = {}, options: ApiRequestOptions = {}): Promise<T> =>
    apiRequest<T>(url, 'POST', body, headers, options);

export const apiPut = <T = any>(url: string, body: any = null, headers: Record<string, string> = {}, options: ApiRequestOptions = {}): Promise<T> =>
    apiRequest<T>(url, 'PUT', body, headers, options);

export const apiDelete = <T = any>(url: string, headers: Record<string, string> = {}, options: ApiRequestOptions = {}): Promise<T> =>
    apiRequest<T>(url, 'DELETE', null, headers, options);

export const apiPatch = <T = any>(url: string, body: any = null, headers: Record<string, string> = {}, options: ApiRequestOptions = {}): Promise<T> =>
    apiRequest<T>(url, 'PATCH', body, headers, options);

// Utility to get user-friendly error message
export const getUserFriendlyErrorMessage = (error: any): string => {
    if (!error) return 'An unexpected error occurred';

    // Network errors
    if (error.isNetworkError || error.response?.status === 0) {
        const errorCode = error.response?.data?.code;

        switch (errorCode) {
            case 'NETWORK_OFFLINE':
                return 'No internet connection. Please check your network and try again.';
            case 'REQUEST_TIMEOUT':
                return 'Request timed out. Please check your internet connection and try again.';
            case 'NETWORK_ERROR':
            default:
                return 'Slow or no internet connection. Please check your network and try again.';
        }
    }

    // Server errors
    if (error.response?.status >= 500) {
        return 'Server is temporarily unavailable. Please try again later.';
    }

    // Client errors with specific messages
    if (error.response?.data?.detail) {
        return error.response.data.detail;
    }

    if (error.response?.data?.error) {
        return error.response.data.error;
    }

    // Fallback
    return error.message || 'Something went wrong. Please try again.';
};