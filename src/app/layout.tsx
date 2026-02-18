import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Footer, Navbar } from "@/components/common";
import Provider from "@/redux/provider";
import { Setup } from "@/components/utils";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Welcome - MentorClap",
	description: "Find the best tutor for your child",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable}`}>
				<Provider>
					<Setup />
					<Navbar />
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8">
						{children}
					</div>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
