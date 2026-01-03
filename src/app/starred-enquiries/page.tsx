import type { Metadata } from "next";
import { Suspense } from "react";
import StarredEnquiries from "./StarredEnquiries";
import LoaderMinimal from "@/component/loader/LoaderMinimal";

export const metadata: Metadata = {
    title: "Starred Enquiries - MentorClap",
    description:
        "View and manage your starred (favorite) enquiries on MentorClap.",
};

export default function StarredEnquiriesPage() {
    return (
        <Suspense fallback={<LoaderMinimal />}>
            <StarredEnquiries />
        </Suspense>
    );
}
