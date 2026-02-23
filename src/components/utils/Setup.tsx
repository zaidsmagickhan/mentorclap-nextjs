"use client";

import { useVerify } from "@/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useGetCompletionStatusQuery } from "@/redux/features/profileApiSlice";

const ONBOARDING_PREFIXES = [
	"/teacher/onboarding",
	"/student/onboarding",
	"/auth", // Login/Register pages
	"/password-reset",
];

export default function Setup() {
	useVerify();

	const router = useRouter();
	const pathname = usePathname();

	// Check if user is logged in (from your existing authSlice)
	const isAuthenticated = useAppSelector(
		(state) => state.auth.isAuthenticated,
	);

	// Fetch status only if authenticated
	const { data, isLoading, isError } = useGetCompletionStatusQuery(
		undefined,
		{
			skip: !isAuthenticated,
		},
	);

	useEffect(() => {
		if (!isAuthenticated || isLoading || !data) return;

		// 1. If profile is complete, do nothing (let them browse)
		if (data.is_complete) return;

		// 2. If user is ALREADY on an onboarding page, don't redirect (prevent loops)
		const isOnOnboardingPage = ONBOARDING_PREFIXES.some((prefix) =>
			pathname.startsWith(prefix),
		);

		if (isOnOnboardingPage) return;

		// 3. REDIRECT to the specific missing step
		console.log(
			"Redirecting to complete profile:",
			data.next_step_url,
			data,
		);
		// router.push("/u");
		router.push(data.next_step_url);
	}, [data, isAuthenticated, isLoading, pathname, router]);

	return <ToastContainer />;
}
