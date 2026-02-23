// app/teacher/onboarding/add-phone/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Link from "next/link";
import { useAddPhoneRequestMutation } from "@/redux/features/authApiSlice";

export default function AddPhonePage() {
	const router = useRouter();
	const [phone, setPhone] = useState<string | undefined>("");
	const [error, setError] = useState("");

	// Mutation to request OTP
	const [requestOTP, { isLoading }] = useAddPhoneRequestMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!phone) {
			setError("Please enter a valid phone number.");
			return;
		}

		try {
			const countryCode = phone.match(/^\+(\d+)/)?.[0] || "+91";
			const phoneNumber = phone.replace(countryCode, "");

			await requestOTP({
				phone_number: phoneNumber,
				country_code: countryCode,
			}).unwrap();

			// Success: Redirect to Verify Page
			// We pass the full phone number so the verify page knows what to display
			router.push(
				`/teacher/onboarding/verify-phone?phone=${encodeURIComponent(phone)}`,
			);
		} catch (err: any) {
			setError(err.data?.detail || "Failed to send OTP. Try again.");
		}
	};

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Add Mobile Number
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Verify your identity by adding a mobile number. This is
					required to complete your profile.
				</p>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-900"
						>
							Mobile Number
						</label>
						<div className="mt-2">
							<PhoneInput
								international
								defaultCountry="IN"
								value={phone}
								onChange={setPhone}
								placeholder="Enter mobile number"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
							/>
						</div>
					</div>

					{error && (
						<div className="rounded-md bg-red-50 p-3">
							<p className="text-sm text-red-700">{error}</p>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading || !phone}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
					>
						{isLoading ? "Sending OTP..." : "Send OTP"}
					</button>
				</form>

				<p className="mt-10 text-center text-xs text-gray-500">
					By continuing, you agree to receive verification codes via
					SMS.
				</p>
			</div>
		</div>
	);
}
