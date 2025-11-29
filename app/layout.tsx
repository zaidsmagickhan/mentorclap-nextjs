import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/layout/Navbar";
import { AuthProvider } from "@/lib/context/AuthContext";

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
                    <Navbar />
                    <main>{children}</main>
                    <footer className="bg-gray-100 border-t mt-12">
                        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
                            <p>&copy; 2024 My Blog App. All rights reserved.</p>
                        </div>
                    </footer>
                </AuthProvider>
            </body>
        </html>
    );
}
