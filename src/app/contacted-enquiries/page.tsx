import type { Metadata } from "next";
import { Suspense } from "react";
import ContactedEnquiries from "./ContactedEnquiries";
import LoaderMinimal from "@/component/loader/LoaderMinimal";

export const metadata: Metadata = {
    title: "Contacted Enquiries - MentorClap",
    description: "View and manage your contacted enquiries on MentorClap.",
};

export default function ContactedEnquiriesPage() {
    return (
        <Suspense fallback={<LoaderMinimal />}>
            <ContactedEnquiries />
        </Suspense>
    );
}
