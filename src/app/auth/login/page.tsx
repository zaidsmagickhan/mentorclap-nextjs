import Link from "next/link";
import { Metadata } from "next";
import { SocialButtons, LoginWrapper } from "@/components/common";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account",
};

export default function Page() {
	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					alt="MentorClap"
					src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
					className="mx-auto h-10 w-auto"
				/>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
				<LoginWrapper />
				<SocialButtons />

				<p className="mt-10 text-center text-sm/6 text-gray-500">
					Don&apos;t have an account?{" "}
					<Link
						href="/auth/register"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
}
