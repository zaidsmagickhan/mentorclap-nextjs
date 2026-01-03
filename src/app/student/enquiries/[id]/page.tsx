import type { Metadata } from "next";
import { Suspense } from "react";
import StudentEnquiryDetail from "./StudentEnquiryDetail";
import LoaderMinimal from "@/component/loader/LoaderMinimal";

interface StudentEnquiryDetailPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params,
}: StudentEnquiryDetailPageProps): Promise<Metadata> {
    return {
        title: `Enquiry #${params.id} Details - MentorClap`,
        description: `View detailed information about your enquiry #${params.id} on MentorClap.`,
    };
}

export default function StudentEnquiryDetailPage({
    params,
}: StudentEnquiryDetailPageProps) {
    return (
        <Suspense fallback={<LoaderMinimal />}>
            <StudentEnquiryDetail />
        </Suspense>
    );
}
