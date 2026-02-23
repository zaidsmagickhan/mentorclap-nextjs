"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/forms";
import {
	useGetPendingRegistrationDataQuery,
	useRequestPhoneRegistrationOtpMutation,
	useVerifyRegistrationOtpAndCreateUserMutation,
} from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { Spinner } from "@/components/common";

export default function VerifyPhonePage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const phoneNumber = searchParams.get("phone");
	const countryCode = searchParams.get("code");

	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");

	// ✅ FIX 1: Move hooks to top level (unconditionally)
	const {
		data: userData,
		isLoading: isPendingLoading,
		error: pendingError,
	} = useGetPendingRegistrationDataQuery(
		{
			phone_number: phoneNumber!,
			country_code: countryCode!,
		},
		{
			// Skip query if phoneNumber or countryCode is missing
			skip: !phoneNumber || !countryCode,
		},
	);

	// Mutations
	const [verifyOTP, { isLoading: isVerifying }] =
		useVerifyRegistrationOtpAndCreateUserMutation();

	const [requestOTP, { isLoading: isResending }] =
		useRequestPhoneRegistrationOtpMutation();

	// ✅ FIX 2: Redirect in useEffect
	useEffect(() => {
		if (!phoneNumber || !countryCode) {
			router.push("/auth/register");
		}
	}, [phoneNumber, countryCode, router]);

	// ✅ FIX 3: Handle pending data in useEffect
	useEffect(() => {
		if (pendingError) {
			console.error("Error fetching pending data:", pendingError);
			// Handle error appropriately
		}
	}, [pendingError]);

	// Handle Verify Submit
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!otp || otp.length < 6) {
			setError("Please enter a valid 6-digit OTP");
			return;
		}

		try {
			await verifyOTP({
				phone_number: phoneNumber!,
				otp,
			}).unwrap();
			dispatch(setAuth());
			router.push("/dashboard");
		} catch (err: any) {
			setError(err.data?.error || "Invalid OTP");
		}
	};

	// Handle Resend
	const handleResend = async () => {
		if (!userData) return;

		try {
			await requestOTP({
				phone_number: phoneNumber!,
				country_code: countryCode!,
				first_name: userData.first_name,
				last_name: userData.last_name,
				role: userData.role,
			}).unwrap();

			alert("OTP resent successfully!");
			setError("");
		} catch (err: any) {
			alert(err.data?.detail || "Failed to resend OTP");
		}
	};

	// Show loading state
	if (!phoneNumber || !countryCode || isPendingLoading) {
		return (
			<div className="flex justify-center my-8">
				<Spinner lg />
			</div>
		);
	}

	// Show error if pending data fetch failed
	if (pendingError) {
		return (
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="text-center text-red-600">
						Failed to load registration data. Please try again.
					</div>
					<div className="mt-4 text-center">
						<Link
							href="/auth/register"
							className="font-semibold text-indigo-600 hover:text-indigo-500"
						>
							Go back
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Verify Mobile Number
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Enter the OTP sent to{" "}
					<span className="font-semibold">{`${countryCode} ${phoneNumber}`}</span>
				</p>
				{userData && (
					<p className="text-xs text-center text-gray-500 mt-1">
						Registering as: {userData.first_name}{" "}
						{userData.last_name} ({userData.role})
					</p>
				)}
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
						disabled={isVerifying}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:opacity-50"
					>
						{isVerifying
							? "Verifying..."
							: "Verify & Create Account"}
					</button>
				</form>

				<div className="mt-4 text-center">
					<button
						onClick={handleResend}
						disabled={isResending || !userData}
						className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
					>
						{isResending ? "Sending..." : "Resend OTP"}
					</button>
				</div>

				<p className="mt-10 text-center text-sm/6 text-gray-500">
					Wrong number?{" "}
					<Link
						href="/auth/register"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Go back
					</Link>
				</p>
			</div>
		</div>
	);
}
