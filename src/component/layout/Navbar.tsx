"use client";

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
    const { user, authChecked, loading, logoutUser } = useAuth();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-800 hover:text-gray-600"
                        >
                            Logo
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Navigation Links - Always visible */}
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/blogs"
                                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                            >
                                Blogs
                            </Link>
                            <Link
                                href="/faqs"
                                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                            >
                                FAQs
                            </Link>
                            <Link
                                href="/contact-us"
                                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* User Section */}
                        {loading ? (
                            // Loading skeletons
                            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6 ml-2">
                                {/* Coins Skeleton */}
                                <div className="animate-pulse bg-gray-200 px-3 py-1 rounded-full w-20 h-8"></div>

                                {/* User Avatar Skeleton */}
                                <div className="animate-pulse flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="hidden lg:block">
                                        <div className="bg-gray-200 rounded h-4 w-24"></div>
                                    </div>
                                    <div className="w-4 h-4 bg-gray-200"></div>
                                </div>
                            </div>
                        ) : authChecked && user ? (
                            // Authenticated User UI
                            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6 ml-2">
                                {/* Coins Display */}
                                <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                                    <span className="text-yellow-600 font-semibold text-sm">
                                        {user.coins || 0}
                                    </span>
                                    <span className="text-yellow-500 text-sm">
                                        coins
                                    </span>
                                </div>

                                {/* User Avatar & Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 focus:outline-none">
                                        <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                {user?.full_name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    user?.email
                                                        ?.charAt(0)
                                                        ?.toUpperCase() ||
                                                    "U"}
                                            </span>
                                        </div>
                                        <span className="text-gray-700 text-sm font-medium hidden lg:block">
                                            {user?.full_name ||
                                                user?.email?.split("@")[0] ||
                                                "User"}
                                        </span>
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-2">
                                            <div className="px-3 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user?.full_name || "User"}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>

                                            <Link
                                                href="/account"
                                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                <span>Account</span>
                                            </Link>

                                            <Link
                                                href="/dashboard"
                                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                    />
                                                </svg>
                                                <span>Dashboard</span>
                                            </Link>

                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={logoutUser}
                                                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : authChecked && !user ? (
                            // Not authenticated - Show Login/Register buttons
                            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6 ml-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : null}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        {loading ? (
                            // Mobile loading skeleton
                            <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-md"></div>
                        ) : (
                            <MobileMenu
                                user={user}
                                authChecked={authChecked}
                                logoutUser={logoutUser}
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Mobile Menu Component
function MobileMenu({
    user,
    authChecked,
    logoutUser,
}: {
    user: any;
    authChecked: boolean;
    logoutUser: () => void;
}) {
    return (
        <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Mobile Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                    {authChecked && user ? (
                        // Authenticated mobile menu
                        <>
                            {/* User Info */}
                            <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                                <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {user?.full_name
                                            ?.charAt(0)
                                            ?.toUpperCase() ||
                                            user?.email
                                                ?.charAt(0)
                                                ?.toUpperCase() ||
                                            "U"}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {user?.full_name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Coins Display */}
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-sm text-gray-600">
                                    Coins
                                </span>
                                <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                                    <span className="text-yellow-600 font-semibold text-sm">
                                        {user.coins || 0}
                                    </span>
                                    <span className="text-yellow-500 text-xs">
                                        coins
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Navigation Links */}
                            <div className="space-y-1 py-2">
                                <Link
                                    href="/blogs"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                        />
                                    </svg>
                                    <span>Blogs</span>
                                </Link>
                                <Link
                                    href="/faqs"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>FAQs</span>
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>Contact Us</span>
                                </Link>

                                <Link
                                    href="/dashboard"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span>Dashboard</span>
                                </Link>

                                <Link
                                    href="/account"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span>Account</span>
                                </Link>
                            </div>

                            {/* Logout Button */}
                            <div className="pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={logoutUser}
                                    className="flex items-center space-x-2 w-full px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                                {/* </form> */}
                            </div>
                        </>
                    ) : authChecked && !user ? (
                        // Not authenticated mobile menu
                        <>
                            <div className="space-y-1 py-2">
                                <Link
                                    href="/blogs"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                        />
                                    </svg>
                                    <span>Blogs</span>
                                </Link>
                                <Link
                                    href="/faqs"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>FAQs</span>
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>Contact Us</span>
                                </Link>
                            </div>

                            {/* Login/Signup Buttons */}
                            <div className="pt-2 border-t border-gray-100">
                                <Link
                                    href="/login"
                                    className="flex items-center space-x-2 w-full px-2 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors mb-2"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Login</span>
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center space-x-2 w-full px-2 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                        />
                                    </svg>
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        </>
                    ) : (
                        // Loading state for mobile menu
                        <div className="space-y-3">
                            <div className="animate-pulse flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div className="space-y-2">
                                    <div className="bg-gray-200 rounded h-3 w-24"></div>
                                    <div className="bg-gray-200 rounded h-2 w-32"></div>
                                </div>
                            </div>
                            <div className="animate-pulse bg-gray-200 h-8 rounded"></div>
                            <div className="space-y-2">
                                <div className="bg-gray-200 h-4 rounded"></div>
                                <div className="bg-gray-200 h-4 rounded"></div>
                                <div className="bg-gray-200 h-4 rounded"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
