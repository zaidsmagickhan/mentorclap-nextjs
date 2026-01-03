"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CTAFooter from "./footer/CTAFooter";
import BangaloreBasedTutors from "./footer/BangaloreBasedTutors";
import TuitionCategoriesSection from "./footer/TuitionCategoriesSection";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (loading) {
        return null;
    }

    return (
        <>
            {!user && !loading && (
                <TuitionCategoriesSection isAuthenticated={false} />
            )}
            {!user && !loading && <BangaloreBasedTutors />}
            {!user && !loading && <CTAFooter />}
            {/* Main Footer */}
            {!loading && (
                <footer className="bg-[#0f172a] text-white py-12">
                    <div className="container mx-auto px-6">
                        {/* Main Footer Content - Desktop Layout */}
                        <div className="hidden lg:grid grid-cols-4 gap-8 mb-12">
                            {/* MentorClap Column */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">
                                    MentorClap™
                                </h2>
                                <p className="text-gray-300 text-sm">
                                    Learn, Connect and Grow with MentorClap.
                                </p>
                            </div>

                            {/* Company Column */}
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold text-lg mb-4">
                                    Company
                                </h3>
                                <Link
                                    href="/about"
                                    className="text-gray-300 hover:text-white mb-2"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/blogs"
                                    className="text-gray-300 hover:text-white mb-2"
                                >
                                    Blogs
                                </Link>
                            </div>

                            {/* Support Column */}
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold text-lg mb-4">
                                    Support
                                </h3>
                                <Link
                                    href="/contact-us"
                                    className="text-gray-300 hover:text-white mb-2"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="/faqs"
                                    className="text-gray-300 hover:text-white mb-2"
                                >
                                    FAQs
                                </Link>
                                {!user && (
                                    <>
                                        <Link
                                            href="/forgot-password"
                                            className="text-gray-300 hover:text-white mb-2"
                                        >
                                            Forgot Password
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Legal Column */}
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold text-lg mb-4">
                                    Legal
                                </h3>
                                <Link
                                    href="/terms-of-use"
                                    className="text-gray-300 hover:text-white mb-2"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    className="text-gray-300 hover:text-white mb-2"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/cancellation-and-refund-policy"
                                    className="text-gray-300 hover:text-white mb-2"
                                >
                                    Cancellation/Refund Policy
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Layout - Updated to show all sections */}
                        <div className="lg:hidden grid grid-cols-2 gap-8 mb-8">
                            {/* Company Section */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Company
                                </h3>
                                <div className="flex flex-col space-y-2">
                                    <Link
                                        href="/about"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href="/blogs"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Blogs
                                    </Link>
                                </div>
                            </div>

                            {/* Support Section */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Support
                                </h3>
                                <div className="flex flex-col space-y-2">
                                    <Link
                                        href="/contact-us"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Contact Us
                                    </Link>
                                    <Link
                                        href="/faqs"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        FAQs
                                    </Link>
                                    {!user && (
                                        <Link
                                            href="/forgot-password"
                                            className="text-gray-300 hover:text-white"
                                        >
                                            Forgot Password
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Legal Section */}
                            <div className="col-span-2 mt-4">
                                <h3 className="font-semibold text-lg mb-4">
                                    Legal
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <Link
                                        href="/terms-of-use"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Terms of Service
                                    </Link>
                                    <Link
                                        href="/privacy-policy"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link
                                        href="/cancellation-and-refund-policy"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Cancellation/Refund
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* MentorClap Section - For mobile only */}
                        <div className="lg:hidden text-center mb-8">
                            <h2 className="text-xl font-bold mb-4">
                                MentorClap™
                            </h2>
                            <p className="text-gray-300 text-sm">
                                Learn, Connect and Grow with MentorClap.
                            </p>
                        </div>

                        {/* Follow Us Section - Both Mobile and Desktop */}
                        <div className="text-center mt-8">
                            <h3 className="font-semibold text-lg mb-6">
                                Follow Us
                            </h3>
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="https://www.facebook.com/people/MentorClap/61574755565867/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="bg-[#1e293b] p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                >
                                    <Facebook
                                        size={20}
                                        className="text-gray-300"
                                    />
                                </a>
                                <a
                                    href="https://www.instagram.com/mentorclap/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="bg-[#1e293b] p-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
                                >
                                    <Instagram
                                        size={20}
                                        className="text-gray-300"
                                    />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/mentorclap-education/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="bg-[#1e293b] p-3 rounded-full hover:bg-blue-500 transition-colors duration-300"
                                >
                                    <Linkedin
                                        size={20}
                                        className="text-gray-300"
                                    />
                                </a>
                                <a
                                    href="https://www.youtube.com/@MentorClap"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="bg-[#1e293b] p-3 rounded-full hover:bg-red-600 transition-colors duration-300"
                                >
                                    <Youtube
                                        size={20}
                                        className="text-gray-300"
                                    />
                                </a>
                                <a
                                    href="https://x.com/mentorclap"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="bg-[#1e293b] p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                >
                                    <Twitter
                                        size={20}
                                        className="text-gray-300"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* Separator Line */}
                        <div className="border-t border-gray-800 my-8"></div>

                        {/* Copyright Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © {currentYear} MentorClap™ Education Private
                                Limited. All rights reserved.
                            </p>
                            <div className="mt-4 md:mt-0 text-sm">
                                <Link
                                    href="/terms-of-use"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Terms
                                </Link>
                                <span className="mx-2">·</span>
                                <Link
                                    href="/privacy-policy"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Privacy
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
};

export default Footer;
