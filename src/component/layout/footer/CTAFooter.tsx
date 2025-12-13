import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CTAFooter = () => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="w-full bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                    <div className="bg-blue-500 rounded-lg p-2 mr-3">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                    </div>
                    <Link href={"/teacher-register"} className="font-medium">
                        Signup as Teacher
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link
                        href={"/student-register"}
                        className="px-6 py-2 bg-transparent border border-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200"
                    >
                        Find a Tutor
                    </Link>
                    <Link
                        href={"/login"}
                        className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CTAFooter;
