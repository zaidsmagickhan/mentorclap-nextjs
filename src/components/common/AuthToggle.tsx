// components/auth/AuthToggle.tsx
"use client";

interface Props {
	currentMethod: "email" | "phone";
	setMethod: (m: "email" | "phone") => void;
}

export default function AuthToggle({ currentMethod, setMethod }: Props) {
	return (
		<div className="flex justify-center mb-6">
			<div className="bg-gray-100 p-1 rounded-lg inline-flex shadow-sm">
				<button
					type="button"
					onClick={() => setMethod("email")}
					className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
						currentMethod === "email"
							? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
							: "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
					}`}
				>
					Email
				</button>
				<button
					type="button"
					onClick={() => setMethod("phone")}
					className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
						currentMethod === "phone"
							? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
							: "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
					}`}
				>
					Phone
				</button>
			</div>
		</div>
	);
}
