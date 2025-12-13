import type { Metadata } from "next";
import PrivacyPolicyPage from "./PrivacyPolicyPage";

export const metadata: Metadata = {
    title: "Privacy Policy - MentorClap",
    description: "Privacy Policy of MentorClap",
};

export default function ContactUs() {
    return <PrivacyPolicyPage />;
}
