import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

export default function usePasswordReset() {
	const router = useRouter();
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const [email, setEmail] = useState("");

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		resetPassword(email)
			.unwrap()
			.then(() => {
				toast.success("Request sent, check your email for reset link");
			})
			.catch(() => {
				toast.error("Failed to send request");
			});
	};

	return {
		email,
		isLoading,
		onChange,
		onSubmit,
	};
}
