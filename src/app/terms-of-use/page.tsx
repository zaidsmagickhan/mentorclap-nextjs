import type { Metadata } from "next";
import TermsOfUsePage from "./TermsOfUsePage";

export const metadata: Metadata = {
    title: "Terms of Use - MentorClap",
    description: "Terms and conditions of MentorClap",
};

export default function TermsOfUse() {
    return <TermsOfUsePage />;
}
