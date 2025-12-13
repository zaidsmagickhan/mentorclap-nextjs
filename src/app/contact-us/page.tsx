import type { Metadata } from "next";
import ContactUsPage from "./ContactUsPage";

export const metadata: Metadata = {
    title: "Contact Us - MentorClap",
    description:
        "Get in touch with MentorClap for any inquiries, feedback, or support. We are here to help you with your learning journey.",
};

export default function ContactUs() {
    return <ContactUsPage />;
}
