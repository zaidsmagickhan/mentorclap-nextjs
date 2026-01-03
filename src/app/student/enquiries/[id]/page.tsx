import type { Metadata } from "next";
import { Suspense } from "react";
import StudentEnquiryDetail from "./StudentEnquiryDetail";
import LoaderMinimal from "@/component/loader/LoaderMinimal";

interface StudentEnquiryDetailPageProps {
    params: Promise<{
        id: number;
    }>;
}

export async function generateMetadata({
    params,
}: StudentEnquiryDetailPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    return {
        title: `Enquiry #${resolvedParams.id} Details - MentorClap`,
        description: `View detailed information about your enquiry #${resolvedParams.id} on MentorClap.`,
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
