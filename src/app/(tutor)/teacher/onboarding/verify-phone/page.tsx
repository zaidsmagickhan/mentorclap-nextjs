// app/teacher/onboarding/verify-phone/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/forms";
import { useAppDispatch } from "@/redux/hooks";
import { useGetCompletionStatusQuery } from "@/redux/features/profileApiSlice"; // To refresh status
import { useAddPhoneVerifyMutation } from "@/redux/features/authApiSlice";

export default function VerifyPhoneOnboardingPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const fullPhone = searchParams.get("phone");
	const countryCode = fullPhone?.match(/^\+(\d+)/)?.[0] || "+91";
	const phoneNumber = fullPhone?.replace(countryCode, "") || "";

	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");

	// Use the specific mutation for Onboarding Verification
	const [verifyOTP, { isLoading }] = useAddPhoneVerifyMutation();

	// Hook to refetch completion status after success
	const { refetch: refetchStatus } = useGetCompletionStatusQuery(undefined, {
		skip: true,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!otp || otp.length < 6) {
			setError("Please enter a valid 6-digit OTP");
			return;
		}

		try {
			await verifyOTP({ otp }).unwrap(); // Backend knows which user via Auth Token

			// Refresh the profile completion status
			const status = await refetchStatus().unwrap();

			// Redirect based on next missing step
			if (status.is_complete) {
				router.push("/dashboard");
			} else {
				router.push(status.next_step_url);
			}
		} catch (err: any) {
			setError(err.data?.detail || "Invalid OTP");
		}
	};

	const handleResend = async () => {
		// Call the request OTP endpoint again
		// You might need to inject the 'requestOTP' mutation here too
		alert(
			"OTP resent! (Implement resend logic calling /add-phone-request/)",
		);
	};

	if (!fullPhone) {
		// If no phone param, redirect to add-phone page
		router.push("/teacher/onboarding/add-phone");
		return null;
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Verify Mobile Number
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Enter the OTP sent to{" "}
					<span className="font-semibold">{fullPhone}</span>
				</p>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleSubmit} className="space-y-6">
					<Input
						labelId="otp"
						type="text"
						value={otp}
						onChange={(e) => {
							setOtp(e.target.value);
							setError("");
						}}
						required
					>
						OTP Code
					</Input>

					{error && (
						<p className="text-red-600 text-sm text-center">
							{error}
						</p>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:opacity-50"
					>
						{isLoading ? "Verifying..." : "Verify & Continue"}
					</button>
				</form>

				<div className="mt-4 flex justify-between text-sm">
					<Link
						href="/teacher/onboarding/add-phone"
						className="font-semibold text-gray-600 hover:text-gray-500"
					>
						Wrong number?
					</Link>
					<button
						onClick={handleResend}
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Resend OTP
					</button>
				</div>
			</div>
		</div>
	);
}
