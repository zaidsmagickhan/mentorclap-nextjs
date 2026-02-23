import { useState } from "react";
import { useRouter } from "next/navigation";
import { parsePhoneNumber } from "react-phone-number-input";
import {
	useLoginRequestOTPMutation,
	useLoginVerifyOTPMutation,
} from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function useLoginPhone() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [currentPhone, setCurrentPhone] = useState<string>("");

	const [sendLoginOTP, { isLoading: isSending }] =
		useLoginRequestOTPMutation();

	const [verifyLoginOTP, { isLoading: isVerifying }] =
		useLoginVerifyOTPMutation();

	const isLoading = isSending || isVerifying;

	// const onSendOTP = async (phone: string | undefined) => {
	// 	if (!phone) return;
	// 	try {
	// 		const phoneNumberObj = parsePhoneNumber(phone);

	// 		if (!phoneNumberObj) {
	// 			throw new Error("Invalid phone number format");
	// 		}

	// 		// Get country code with plus sign
	// 		const countryCode = `+${phoneNumberObj.countryCallingCode}`;

	// 		// Get national number (without country code)
	// 		const phoneNumber = phoneNumberObj.nationalNumber;

	// 		console.log(
	// 			"Parsed - Country Code:",
	// 			countryCode,
	// 			"Phone:",
	// 			phoneNumber,
	// 		);

	// 		const res = await sendLoginOTP({
	// 			phone_number: phoneNumber,
	// 			country_code: countryCode,
	// 		}).unwrap().then(() => {

	// 		});

	// 		console.log(res);

	// 		setCurrentPhone(phone);
	// 		// Move to next step handled in component state
	// 	} catch (error: any) {
	// 		console.log(error, "errors");
	// 		alert(
	// 			error.data?.detail || "Failed to send OTP. User may not exist.",
	// 		);
	// 	}
	// };

	const onSendOTP = async (phone: string | undefined) => {
		if (!phone) return;
		try {
			const phoneNumberObj = parsePhoneNumber(phone);

			if (!phoneNumberObj) {
				throw new Error("Invalid phone number format");
			}

			const countryCode = `+${phoneNumberObj.countryCallingCode}`;
			const phoneNumber = phoneNumberObj.nationalNumber;

			console.log(
				"Parsed - Country Code:",
				countryCode,
				"Phone:",
				phoneNumber,
			);

			const res = await sendLoginOTP({
				phone_number: phoneNumber,
				country_code: countryCode,
			}).unwrap();

			console.log(res);

			setCurrentPhone(phone);

			// Return true to indicate success
			return true;
		} catch (error: any) {
			console.log(error, "errors");
			alert(
				error.data?.detail || "Failed to send OTP. User may not exist.",
			);
			// Return false to indicate failure
			return false;
		}
	};

	const onVerifyOTP = async (otp: string) => {
		try {
			const phoneNumberObj = parsePhoneNumber(currentPhone);

			if (!phoneNumberObj) {
				throw new Error("Invalid phone number format");
			}

			const countryCode = `+${phoneNumberObj.countryCallingCode}`;
			const phoneNumber = phoneNumberObj.nationalNumber;
			// const countryCode = currentPhone.match(/^\+(\d+)/)?.[0] || "+91";
			// const phoneNumber = currentPhone.replace(countryCode, "");

			const response = await verifyLoginOTP({
				phone_number: phoneNumber,
				country_code: countryCode,
				otp,
			}).unwrap();

			// Assuming backend returns a token
			dispatch(setAuth());
			router.push("/dashboard");
		} catch (error: any) {
			throw error; // Rethrow to be caught by component
		}
	};

	const resendOTP = async () => {
		if (!currentPhone) return;
		await onSendOTP(currentPhone);
		alert("OTP resent!");
	};

	return {
		isLoading,
		onSendOTP,
		onVerifyOTP,
		resendOTP,
	};
}
