import type { Metadata } from "next";
import EnquiryDetail from "./EnquiryDetail";

interface EnquiryPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params,
}: EnquiryPageProps): Promise<Metadata> {
    return {
        title: `Enquiry #${params.id} - MentorClap`,
        description: `View detailed information about enquiry #${params.id}. Contact the student directly for more information.`,
    };
}

export default function IndividualEnquiryPage({ params }: EnquiryPageProps) {
    return <EnquiryDetail />;
}
