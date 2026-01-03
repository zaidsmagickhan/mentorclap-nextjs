import type { Metadata } from "next";
import UpgradePlan from "./UpgradePlan";

export const metadata: Metadata = {
    title: "Upgrade Plan - MentorClap",
    description:
        "Upgrade your MentorClap plan to get more coins and premium features.",
};

export default function UpgradePlanPage() {
    return <UpgradePlan />;
}
