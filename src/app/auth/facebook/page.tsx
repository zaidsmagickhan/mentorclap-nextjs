"use client";

export const dynamic = "force-dynamic";

import { Spinner } from "@/components/common";
import { Suspense } from "react";
import { AuthHandler } from "@/components/common";

export default function Page() {
	return (
		<div className="my-8">
			<Suspense fallback={<Spinner lg />}>
				<AuthHandler provider="facebook" />
			</Suspense>
		</div>
	);
}
