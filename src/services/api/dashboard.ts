import { EnquiryLimitDetail, UnreadCountResponse } from "@/types/dashboard";
import { apiGet } from "../ApiService";

export const fetchUnreadMessageCount =
    async (): Promise<UnreadCountResponse> => {
        return await apiGet<UnreadCountResponse>(
            "/api/chat/messages-list/unread_count/"
        );
    };

export const fetchTotalEnquiryCount = async (): Promise<EnquiryLimitDetail> => {
    return await apiGet<EnquiryLimitDetail>(
        "/api/enquiry/enquiries/total_enquiries/"
    );
};
