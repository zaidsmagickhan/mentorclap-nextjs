// components/auth/LoginWrapper.tsx
"use client";

import { useState } from "react";
import { LoginEmailForm, LoginPhoneForm } from "@/components/forms";
import { AuthToggle } from "@/components/common";

export default function LoginWrapper() {
	const [method, setMethod] = useState<"email" | "phone">("email");

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			{/* Toggle Switcher */}
			<AuthToggle currentMethod={method} setMethod={setMethod} />

			{/* Conditional Form Rendering */}
			<div className="transition-all duration-300 ease-in-out">
				{method === "email" ? <LoginEmailForm /> : <LoginPhoneForm />}
			</div>
		</div>
	);
}
