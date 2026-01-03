export interface EnquiryLimitDetail {
    total_enquiries: number;
    can_create_more: boolean;
    [key: string]: any;
}

export interface UnreadCountResponse {
    unread_count: number;
}
