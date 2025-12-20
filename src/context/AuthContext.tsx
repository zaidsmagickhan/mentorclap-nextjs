"use client"; // This must be a client component

import {
    createContext,
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { setToken, clearToken, apiGet } from "@/services/ApiService";

// Types for TypeScript
interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    [key: string]: any;
}

interface AuthTokens {
    access: string;
    refresh: string;
}

interface AuthContextType {
    user: User | null;
    authTokens: AuthTokens | null;
    loading: boolean;
    authChecked: boolean;
    loginUser: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; user?: User; error?: string }>;
    logoutUser: () => void;
    registerFirstStep: (
        email: string,
        password: string,
        confirm_password: string,
        full_name: string,
        role: string
    ) => Promise<{ success: boolean; user?: User; error?: string }>;
    updateToken: () => Promise<boolean>;
    checkAuthStatus: () => Promise<{
        shouldRedirect: boolean;
        path?: string;
        statusData?: any;
    }>;
}

// Create context with TypeScript
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Constants
const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
const TOKEN_REFRESH_THRESHOLD = 1000 * 60 * 3.5; // 3.5 minutes

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();
    const logoutRef = useRef(() => {});
    const authChannelRef = useRef<BroadcastChannel | null>(null);

    // Initialize BroadcastChannel for multi-tab sync
    useEffect(() => {
        if (typeof window !== "undefined") {
            authChannelRef.current = new BroadcastChannel("auth");
        }

        return () => {
            if (authChannelRef.current) {
                authChannelRef.current.close();
            }
        };
    }, []);

    // Helper function to set auth state
    const setAuthState = useCallback((tokens: AuthTokens) => {
        const decoded: User = jwtDecode(tokens.access);
        setAuthTokens(tokens);
        setUser(decoded);
        setToken(tokens.access);

        // Store in localStorage
        localStorage.setItem("authTokens", JSON.stringify(tokens));
        localStorage.setItem("lastTokenRefresh", Date.now().toString());

        // Notify other tabs
        if (authChannelRef.current) {
            try {
                authChannelRef.current.postMessage({
                    type: "auth_update",
                    tokens,
                });
            } catch (err) {
                console.warn("BroadcastChannel postMessage failed:", err);
            }
        }

        return decoded;
    }, []);

    const clearAuthState = useCallback(() => {
        localStorage.removeItem("authTokens");
        localStorage.removeItem("lastTokenRefresh");
        setAuthTokens(null);
        setUser(null);
        clearToken();

        // Notify other tabs
        if (authChannelRef.current) {
            try {
                authChannelRef.current.postMessage({
                    type: "auth_logout",
                });
            } catch (err) {
                console.warn("BroadcastChannel postMessage failed:", err);
            }
        }
    }, []);

    // Handle messages from other tabs
    useEffect(() => {
        const channel = authChannelRef.current;
        if (!channel) return;

        const handleMessage = (event: MessageEvent) => {
            switch (event.data.type) {
                case "auth_update":
                    setAuthTokens(event.data.tokens);
                    setUser(jwtDecode(event.data.tokens.access));
                    setToken(event.data.tokens.access);
                    break;
                case "auth_logout":
                    clearAuthState();
                    break;
                default:
                    break;
            }
        };

        channel.addEventListener("message", handleMessage);
        return () => {
            channel.removeEventListener("message", handleMessage);
        };
    }, [clearAuthState]);

    const logoutUser = useCallback(() => {
        clearAuthState();
        router.push("/login");
    }, [router, clearAuthState]);

    useEffect(() => {
        logoutRef.current = logoutUser;
    }, [logoutUser]);

    // Check auth status
    const checkAuthStatus = useCallback(async () => {
        try {
            const data = await apiGet(`/api/auth/user/status/`);

            if (!data.is_authenticated) {
                logoutUser();
                return { shouldRedirect: true, path: "/login" };
            }

            if (data.redirect_to && data.redirect_to !== "dashboard") {
                return {
                    shouldRedirect: true,
                    path: `/${data.redirect_to}`,
                    statusData: data,
                };
            }

            return { shouldRedirect: false, statusData: data };
        } catch (error) {
            console.error("Auth status check failed:", error);
            logoutUser();
            return { shouldRedirect: true, path: "/login" };
        }
    }, [logoutUser]);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                if (typeof window === "undefined") {
                    setLoading(false);
                    return;
                }

                const storedTokens = localStorage.getItem("authTokens");
                if (storedTokens) {
                    const parsedTokens: AuthTokens = JSON.parse(storedTokens);
                    setAuthState(parsedTokens);

                    // Verify tokens are still valid
                    try {
                        const decoded: User = jwtDecode(parsedTokens.access);
                        const currentTime = Date.now() / 1000;

                        if (decoded.exp && decoded.exp < currentTime) {
                            // Token expired
                            await updateToken();
                        }
                    } catch (error) {
                        console.error("Token validation failed:", error);
                        clearAuthState();
                    }

                    if (!authChecked) {
                        await checkAuthStatus();
                    }
                }
            } catch (error) {
                console.error("Failed to initialize auth state:", error);
                clearAuthState();
            } finally {
                setAuthChecked(true);
                setLoading(false);
            }
        };

        initializeAuth();
    }, [setAuthState, authChecked, clearAuthState, checkAuthStatus]);

    const loginUser = async (username: string, password: string) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
            const response = await fetch(`${API_URL}/api/auth/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Login failed");
            }

            const tokens: AuthTokens = await response.json();
            const decoded = setAuthState(tokens);

            return { success: true, user: decoded };
        } catch (error: any) {
            let errorMessage = "Login failed. Please try again.";
            if (error.message) {
                errorMessage = error.message;
            }
            return { success: false, error: errorMessage };
        }
    };

    const registerFirstStep = async (
        email: string,
        password: string,
        confirm_password: string,
        full_name: string,
        role: string
    ) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
            const response = await fetch(`${API_URL}/api/auth/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    confirm_password,
                    full_name,
                    role,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.detail ||
                        errorData.errors?.email ||
                        "Registration failed"
                );
            }

            const tokens: AuthTokens = await response.json();
            const decoded = setAuthState(tokens);
            return { success: true, user: decoded };
        } catch (error: any) {
            let errorMessage = "Registration failed. Please try again.";
            if (error.message) {
                errorMessage = error.message;
            }
            return { success: false, error: errorMessage };
        }
    };

    const updateToken = useCallback(async () => {
        console.log("updateToken called");
        if (!authTokens?.refresh) {
            return false;
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
            const response = await fetch(`${API_URL}/api/auth/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: authTokens.refresh }),
            });

            if (!response.ok) {
                throw new Error("Token refresh failed");
            }

            const tokens: AuthTokens = await response.json();
            setAuthState(tokens);
            return true;
        } catch (error) {
            console.error("Token refresh failed:", error);
            logoutRef.current();
            return false;
        }
    }, [authTokens, setAuthState]);

    // Token refresh logic
    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (!authTokens) return;

            const lastRefresh = localStorage.getItem("lastTokenRefresh");
            const shouldRefresh =
                !lastRefresh ||
                Date.now() - parseInt(lastRefresh) > TOKEN_REFRESH_THRESHOLD;

            if (shouldRefresh) {
                await updateToken();
            }
        };

        // Initial check
        checkAndRefreshToken();

        // Set up interval for periodic checks
        const interval = setInterval(
            checkAndRefreshToken,
            TOKEN_REFRESH_INTERVAL
        );
        return () => clearInterval(interval);
    }, [authTokens, updateToken]);

    const contextData: AuthContextType = {
        user,
        authTokens,
        loading,
        authChecked,
        loginUser,
        logoutUser,
        registerFirstStep,
        updateToken,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
