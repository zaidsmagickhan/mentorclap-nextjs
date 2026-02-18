"use client";

import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";
import { useSocialAuth } from "@/hooks";

export default function AuthHandler({ provider }: { provider: string }) {
	const [authenticate] = useSocialAuthenticateMutation();
	useSocialAuth(authenticate, provider);
	return null;
}
