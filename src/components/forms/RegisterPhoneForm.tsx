"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "@/components/forms";
import { useRegisterPhone } from "@/hooks";
import { Spinner } from "@/components/common";

export default function RegisterPhoneForm() {
	const [phone, setPhone] = useState<string | undefined>("");
	const [countryCode, setCountryCode] = useState<string>("+91");

	const {
		first_name,
		last_name,
		role,
		isLoading,
		onChange, // Handles name/role inputs
		onSubmit, // Handles the final submit with phone
	} = useRegisterPhone();

	const handlePhoneChange = (value: string | undefined) => {
		setPhone(value);

		if (value) {
			try {
				// Parse the phone number using the library
				const phoneNumber = parsePhoneNumber(value);

				if (phoneNumber) {
					// Get country calling code (e.g., "91" for India)
					const countryCode = `+${phoneNumber.countryCallingCode}`;
					console.log("Country code:", countryCode); // Will be "+91"
					setCountryCode(countryCode);

					// Get the national number (without country code)
					console.log("Local number:", phoneNumber.nationalNumber); // Will be "6377" etc.
					// setLocalNumber(phoneNumber.nationalNumber);
				}
			} catch (error) {
				console.error("Error parsing phone number:", error);
			}
		} else {
			setCountryCode("");
		}
	};

	const config = [
		{
			labelText: "First name",
			labelId: "first_name",
			type: "text",
			value: first_name,
			required: true,
		},
		{
			labelText: "Last name",
			labelId: "last_name",
			type: "text",
			value: last_name,
			required: true,
		},
	];

	return (
		<form
			onSubmit={(e) => onSubmit(e, phone, countryCode)}
			className="space-y-6"
		>
			{config.map((input) => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					value={input.value}
					onChange={onChange}
					required
				>
					{input.labelText}
				</Input>
			))}

			{/* Custom Phone Input Section */}
			<div>
				<label className="block text-sm/6 font-medium text-gray-900">
					Mobile Number
				</label>
				<div className="mt-2">
					<PhoneInput
						international
						defaultCountry="IN"
						value={phone}
						onChange={handlePhoneChange}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading || !phone}
				className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
			>
				{isLoading ? <Spinner sm /> : "Send OTP & Register"}
			</button>

			<p className="text-xs text-gray-500 text-center mt-2">
				By continuing, you agree to receive an OTP on this number.
			</p>
		</form>
	);
}
