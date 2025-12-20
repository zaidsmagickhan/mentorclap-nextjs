import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "./providers";
import Footer from "../component/layout/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Welcome - MentorClap",
    description: "MentorClap Home page for tutor and students",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <Providers>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    );
}
