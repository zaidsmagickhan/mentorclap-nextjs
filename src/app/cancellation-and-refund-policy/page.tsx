import type { Metadata } from "next";
import CancellationRefundPolicyPage from "./CancellationAndRefundPolicyPage";

export const metadata: Metadata = {
    title: "Cancellation and Refund Policy - MentorClap",
    description: "Cancellation and Refund Policy of MentorClap",
};

export default function TermsOfUse() {
    return <CancellationRefundPolicyPage />;
}
