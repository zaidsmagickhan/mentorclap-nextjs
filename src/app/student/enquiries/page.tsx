import { Suspense } from "react";
import type { Metadata } from "next";
import StudentEnquiriesList from "./StudentEnquiriesList";
import LoaderMinimal from "@/component/loader/LoaderMinimal";

export const metadata: Metadata = {
    title: "My Enquiries - MentorClap",
    description: "View and manage your enquiries as a student on MentorClap.",
};

export default function StudentEnquiriesPage() {
    return (
        <Suspense fallback={<LoaderMinimal />}>
            <StudentEnquiriesList />
        </Suspense>
    );
}
