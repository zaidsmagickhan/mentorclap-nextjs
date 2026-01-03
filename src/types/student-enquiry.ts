export interface StudentEnquiry {
    id: number;
    name: string;
    user_budget: number;
    title: string;
    description?: string;
    class_level: string;
    subject: string;
    board?: string;
    study_mode: string;
    status: string;
    created_at: string;
    updated_at: string;
    coins_reduced: number;
    coins_required: number;
    days_left: number;
    responded_count: number;
    total_responses: number;
    address?: {
        city: string;
        state: string;
        country?: string;
    };
    user?: {
        profile_avatar?: string;
        full_name?: string;
    };
    [key: string]: any;
}

export interface PaginationData {
    count: number;
    currentPage: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    results: T;
    count: number;
    next: string | null;
    previous: string | null;
}

export interface EnquiryCardEnquiry {
    id: number;
    name: string;
    subject: string;
    study_mode: string;
    responded_count: number;
    days_left: number;
    user_budget: number;
    profile_image?: string;
    archived?: boolean;
    address?: {
        city: string;
        state: string;
        country?: string;
    };
    [key: string]: any;
}

export interface StudentEnquiryDetail {
    id: number;
    name: string;
    class_level: string;
    custom_class?: string;
    subject: string;
    custom_subject?: string;
    board: string;
    study_mode: string;
    user_budget: number;
    responded_count: number;
    total_responses: number;
    days_left: number;
    posted_at: string;
    archived: boolean;
    address: {
        city: string;
        state: string;
        country: string;
    };
    user: {
        phone_number: string;
        email: string;
        full_name?: string;
        [key: string]: any;
    };
    [key: string]: any;
}

export interface ArchiveResponse {
    success: boolean;
    message?: string;
}
