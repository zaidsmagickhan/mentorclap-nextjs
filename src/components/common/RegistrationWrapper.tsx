"use client";

import { useState } from "react";
import { RegisterEmailForm, RegisterPhoneForm } from "@/components/forms/";
import { AuthToggle } from "@/components/common";

export default function RegistrationWrapper() {
	const [method, setMethod] = useState<"email" | "phone">("email");

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<AuthToggle currentMethod={method} setMethod={setMethod} />

			<div className="transition-all duration-300 ease-in-out">
				{method === "email" ? (
					<RegisterEmailForm />
				) : (
					<RegisterPhoneForm />
				)}
			</div>
		</div>
	);
}
