export interface Enquiry {
    id: number;
    name: string;
    class_level: string;
    subject: string;
    board?: string;
    study_mode: string;
    coins_reduced: number;
    coins_required: number;
    days_left: number;
    responded_count: number;
    total_responses: number;
    time_ago: string;
    viewed: boolean;
    is_starred: boolean;
    address?: {
        city: string;
        state: string;
        country?: string;
    };
    user?: {
        profile_avatar?: string;
    };
}

export interface Address {
    id: number;
    formatted_address: string;
    is_primary: boolean;
    city?: string;
    state?: string;
    country?: string;
}

export interface Filters {
    classes: string[];
    subjects: string[];
    requirements: string[];
    addresses: Address[];
    selected_address_id: number | null;
    enquiry_types: string[];
}

export interface AvailableFilters {
    classes: string[];
    subjects: string[];
    requirements: string[];
    addresses: Address[];
}

export interface PaginationData {
    count: number;
    currentPage: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    results: T;
    count: number;
    filters?: AvailableFilters;
    enquiries?: Enquiry[];
}

export interface StarResponse {
    status: "starred" | "unstarred";
}

// Contacted enquiry

export interface ContactedEnquiry {
    id: number;
    name: string;
    class_level: string;
    subject: string;
    study_mode: string;
    coins_reduced: number;
    coins_required: number;
    days_left: number;
    responded_count: number;
    total_responses: number;
    time_ago: string;
    viewed: boolean;
    is_starred: boolean;
    image?: string;
    address?: {
        city: string;
        state: string;
        country?: string;
    };
    [key: string]: any;
}

export interface ContactedEnquiriesResponse {
    results: ContactedEnquiry[];
    count: number;
    next: string | null;
    previous: string | null;
}

export interface PaginationData {
    count: number;
    currentPage: number;
    totalPages: number;
}

