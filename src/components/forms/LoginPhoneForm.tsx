// "use client";

// import { useState } from "react";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import { Input } from "@/components/forms";
// import { useLoginPhone } from "@/hooks"; // We will create this hook

// export default function LoginPhoneForm() {
// 	const [phone, setPhone] = useState<string | undefined>("");
// 	const [step, setStep] = useState<"send" | "verify">("send");

// 	const { isLoading, onSendOTP, onVerifyOTP, resendOTP } = useLoginPhone();

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!phone) return alert("Please enter a phone number");

// 		if (step === "send") {
// 			await onSendOTP(phone);
// 			// If successful, hook will change step to 'verify'
// 		} else {
// 			// Step is 'verify', but we need the OTP value from somewhere
// 			// We will handle OTP input separately below
// 		}
// 	};

// 	return (
// 		<div className="space-y-6">
// 			{/* Step Indicator */}
// 			<div className="text-center text-sm text-gray-500">
// 				{step === "send"
// 					? "Enter your mobile number to receive an OTP"
// 					: `Enter the OTP sent to ${phone}`}
// 			</div>

// 			{step === "send" ? (
// 				/* STEP 1: Phone Input */
// 				<form onSubmit={handleSubmit} className="space-y-6">
// 					<div>
// 						<label
// 							htmlFor="phone"
// 							className="block text-sm/6 font-medium text-gray-900"
// 						>
// 							Mobile Number
// 						</label>
// 						<div className="mt-2">
// 							<PhoneInput
// 								international
// 								defaultCountry="IN"
// 								value={phone}
// 								onChange={setPhone}
// 								placeholder="Enter mobile number"
// 								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
// 							/>
// 						</div>
// 					</div>

// 					<button
// 						type="submit"
// 						disabled={isLoading || !phone}
// 						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:opacity-50"
// 					>
// 						{isLoading ? "Sending OTP..." : "Send OTP"}
// 					</button>
// 				</form>
// 			) : (
// 				/* STEP 2: OTP Input */
// 				<OtpVerificationStep
// 					phone={phone}
// 					isLoading={isLoading}
// 					onVerify={onVerifyOTP}
// 					onResend={resendOTP}
// 					onBack={() => setStep("send")}
// 				/>
// 			)}
// 		</div>
// 	);
// }

// // Sub-component for OTP Input to keep logic clean
// function OtpVerificationStep({
// 	phone,
// 	isLoading,
// 	onVerify,
// 	onResend,
// 	onBack,
// }: {
// 	phone: string | undefined;
// 	isLoading: boolean;
// 	onVerify: (otp: string) => Promise<void>;
// 	onResend: () => Promise<void>;
// 	onBack: () => void;
// }) {
// 	const [otp, setOtp] = useState("");
// 	const [error, setError] = useState("");

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (otp.length < 6) {
// 			setError("Please enter a valid 6-digit OTP");
// 			return;
// 		}
// 		try {
// 			await onVerify(otp);
// 			// Hook handles redirect on success
// 		} catch (err: any) {
// 			setError(err?.message || "Invalid OTP");
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className="space-y-6">
// 			<Input
// 				labelId="otp"
// 				type="text"
// 				value={otp}
// 				onChange={(e) => {
// 					setOtp(e.target.value);
// 					setError("");
// 				}}
// 				required
// 			>
// 				OTP Code
// 			</Input>

// 			{error && (
// 				<p className="text-red-600 text-sm text-center">{error}</p>
// 			)}

// 			<button
// 				type="submit"
// 				disabled={isLoading}
// 				className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:opacity-50"
// 			>
// 				{isLoading ? "Verifying..." : "Login"}
// 			</button>

// 			<div className="flex justify-between text-xs">
// 				<button
// 					type="button"
// 					onClick={onBack}
// 					className="text-gray-500 hover:text-gray-700 underline"
// 				>
// 					Wrong number?
// 				</button>
// 				<button
// 					type="button"
// 					onClick={onResend}
// 					disabled={isLoading}
// 					className="text-indigo-600 hover:text-indigo-500 font-semibold disabled:opacity-50"
// 				>
// 					Resend OTP
// 				</button>
// 			</div>
// 		</form>
// 	);
// }

"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "@/components/forms";
import { useLoginPhone } from "@/hooks"; // We will create this hook

export default function LoginPhoneForm() {
	const [phone, setPhone] = useState<string | undefined>("");
	const [step, setStep] = useState<"send" | "verify">("send");

	const { isLoading, onSendOTP, onVerifyOTP, resendOTP } = useLoginPhone();

	const handleSendOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!phone) return alert("Please enter a phone number");

		// Call onSendOTP and check if it was successful
		const success = await onSendOTP(phone);

		// ✅ Move to next step only if successful
		if (success) {
			setStep("verify");
		}
	};

	const handleVerifyOTP = async (otp: string) => {
		try {
			await onVerifyOTP(otp);
			// The hook will redirect to dashboard on success
		} catch (error) {
			// Error is already handled in the component
		}
	};

	return (
		<div className="space-y-6">
			{/* Step Indicator */}
			<div className="text-center text-sm text-gray-500">
				{step === "send"
					? "Enter your mobile number to receive an OTP"
					: `Enter the OTP sent to ${phone}`}
			</div>

			{step === "send" ? (
				/* STEP 1: Phone Input */
				<form onSubmit={handleSendOTP} className="space-y-6">
					<div>
						<label
							htmlFor="phone"
							className="block text-sm/6 font-medium text-gray-900"
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
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading || !phone}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:opacity-50"
					>
						{isLoading ? "Sending OTP..." : "Send OTP"}
					</button>
				</form>
			) : (
				/* STEP 2: OTP Input */
				<OtpVerificationStep
					phone={phone}
					isLoading={isLoading}
					onVerify={handleVerifyOTP}
					onResend={async () => {
						await resendOTP();
						// Stay on verify step after resend
					}}
					onBack={() => setStep("send")}
				/>
			)}
		</div>
	);
}

// Sub-component for OTP Input to keep logic clean
function OtpVerificationStep({
	phone,
	isLoading,
	onVerify,
	onResend,
	onBack,
}: {
	phone: string | undefined;
	isLoading: boolean;
	onVerify: (otp: string) => Promise<void>;
	onResend: () => Promise<void>;
	onBack: () => void;
}) {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (otp.length < 6) {
			setError("Please enter a valid 6-digit OTP");
			return;
		}
		try {
			await onVerify(otp);
			// Hook handles redirect on success
		} catch (err: any) {
			setError(err?.message || "Invalid OTP");
		}
	};

	return (
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
				<p className="text-red-600 text-sm text-center">{error}</p>
			)}

			<button
				type="submit"
				disabled={isLoading}
				className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:opacity-50"
			>
				{isLoading ? "Verifying..." : "Login"}
			</button>

			<div className="flex justify-between text-xs">
				<button
					type="button"
					onClick={onBack}
					className="text-gray-500 hover:text-gray-700 underline"
				>
					Wrong number?
				</button>
				<button
					type="button"
					onClick={onResend}
					disabled={isLoading}
					className="text-indigo-600 hover:text-indigo-500 font-semibold disabled:opacity-50"
				>
					Resend OTP
				</button>
			</div>
		</form>
	);
}
