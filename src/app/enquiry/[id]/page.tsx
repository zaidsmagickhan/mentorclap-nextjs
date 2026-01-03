import type { Metadata } from "next";
import EnquiryDetail from "./EnquiryDetail";

interface EnquiryPageProps {
    params: Promise<{
        id: number;
    }>;
}

export async function generateMetadata({
    params,
}: EnquiryPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    return {
        title: `Enquiry #${resolvedParams.id} - MentorClap`,
        description: `View detailed information about enquiry #${resolvedParams.id}. Contact the student directly for more information.`,
    };
}

export default function IndividualEnquiryPage({ params }: EnquiryPageProps) {
    return <EnquiryDetail />;
}
