import { useState } from "react";
import { useRequestPhoneRegistrationOtpMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function useRegisterPhone() {
	const router = useRouter();
	const [registerPhone, { isLoading }] =
		useRequestPhoneRegistrationOtpMutation();
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [role, setRole] = useState("teacher"); // Default #TODO need this dynamic

	// Inject the mutation for Phone Registration
	// const [registerPhone, { isLoading }] = authApiSlice.useMutation({
	// 	// You need to add this endpoint to your authApiSlice first
	// 	// query: (data) => ({ url: '/v2/auth/register-phone/', method: 'POST', body: data })
	// });

	// const [formData, setFormData] = useState({
	// 	first_name: "",
	// 	last_name: "",
	// 	role: "teacher",
	// });

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "first_name") setFirstName(value);
		if (name === "last_name") setLastName(value);
		if (name === "role") setRole(value);
	};

	const onSubmit = async (
		e: React.FormEvent,
		phone?: string,
		countryCode?: string,
	) => {
		e.preventDefault();
		if (!phone) return alert("Please enter a phone number");
		console.log("Phone number", phone, countryCode);

		try {
			// Prepare payload matching your requirement
			const payload = {
				first_name,
				last_name,
				role,
				phone_number: phone.replace(countryCode!, ""), // Strip code if backend wants pure number
				country_code: countryCode,
				// No password needed yet
			};

			console.log(payload, "Payload");

			await registerPhone(payload).unwrap();

			// On success, redirect to Verify OTP page
			router.push(
				`/auth/verify-phone?phone=${encodeURIComponent(phone.replace(countryCode!, ""))}&code=${countryCode}`,
			);
		} catch (error) {
			console.error("Registration failed", error);
			// Handle error toast
		}
	};

	return {
		first_name,
		last_name,
		role,
		isLoading,
		onChange,
		onSubmit,
	};
}
