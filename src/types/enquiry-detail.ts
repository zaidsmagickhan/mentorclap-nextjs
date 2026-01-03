export interface User {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    profile_avatar?: string;
    last_login: string;
    [key: string]: any;
}

export interface Address {
    id: number;
    formatted_address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    [key: string]: any;
}

export interface Enquiry {
    id: number;
    name: string;
    class_level: string;
    subject: string;
    board: string;
    study_mode: string;
    coins_reduced: number;
    coins_required: number;
    days_left: number;
    user_budget: number;
    is_starred: boolean;
    address: Address;
    user: User;
    [key: string]: any;
}

export interface ContactDetails {
    id: number;
    contact_number: string;
    conversation_id: number;
    when_to_start: string;
    price_quote: number;
    price_type: string;
    [key: string]: any;
}

export interface ContactedStatus {
    exists: boolean;
    contact_details: ContactDetails | null;
}

export interface StarResponse {
    status: "starred" | "unstarred";
}
