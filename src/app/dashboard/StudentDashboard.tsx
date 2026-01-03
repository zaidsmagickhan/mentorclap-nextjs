import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    BookOpen,
    MessageCircle,
    User,
    MapPin,
    Plus,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { EnquiryLimitDetail } from "@/types/dashboard";

interface StudentDashboardProps {
    userFullName: string;
    totalEnquiryCount: number;
    enquiryLimitDetail: EnquiryLimitDetail | null;
    unreadCount: number;
}

const StudentDashboard = ({
    userFullName,
    totalEnquiryCount,
    enquiryLimitDetail,
    unreadCount,
}: StudentDashboardProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white">
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Student Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back,{" "}
                        <span className="font-medium">{userFullName}</span>
                    </p>
                </div>

                {/* Enquiry Card */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">
                                Active Enquiries
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Total number of current enquiries
                            </p>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">
                            {totalEnquiryCount}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {enquiryLimitDetail?.can_create_more ? (
                            <Link
                                href="/student/enquiries/add"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Create New Enquiry
                            </Link>
                        ) : (
                            <div
                                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                                title="Archive previous enquiry to create new one"
                            >
                                Enquiry Limit Exceeded
                            </div>
                        )}

                        <button
                            onClick={() => router.push("/student/enquiries")}
                            className="bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                            type="button"
                        >
                            View Enquiries
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Your Enquiries */}
                        <Link
                            href="/student/enquiries"
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                        >
                            <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-gray-600 group-hover:text-blue-600 mr-3" />
                                <span className="text-gray-700 group-hover:text-blue-900 font-medium">
                                    Your Enquiries
                                </span>
                            </div>
                        </Link>

                        {/* Messages */}
                        <Link
                            href="/chat"
                            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                        >
                            <div className="flex items-center">
                                <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-purple-600 mr-3" />
                                <span className="text-gray-700 group-hover:text-purple-900 font-medium">
                                    Messages{" "}
                                    {unreadCount > 0 && `(${unreadCount})`}
                                </span>
                            </div>
                        </Link>

                        {/* Profile */}
                        <Link
                            href="/profile"
                            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
                        >
                            <div className="flex items-center">
                                <User className="h-5 w-5 text-gray-600 group-hover:text-green-600 mr-3" />
                                <span className="text-gray-700 group-hover:text-green-900 font-medium">
                                    Your Profile
                                </span>
                            </div>
                        </Link>

                        {/* Add Address */}
                        <Link
                            href="/address-management"
                            className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                        >
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-gray-600 group-hover:text-orange-600 mr-3" />
                                <span className="text-gray-700 group-hover:text-orange-900 font-medium">
                                    Add Address
                                </span>
                            </div>
                        </Link>

                        {/* Create New Enquiry (if available) */}
                        {enquiryLimitDetail?.can_create_more && (
                            <Link
                                href="/student/enquiries/add"
                                className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors group"
                            >
                                <div className="flex items-center">
                                    <Plus className="h-5 w-5 text-gray-600 group-hover:text-teal-600 mr-3" />
                                    <span className="text-gray-700 group-hover:text-teal-900 font-medium">
                                        Create New Enquiry
                                    </span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Status Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                        {enquiryLimitDetail?.can_create_more ? (
                            <>
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                You can create new enquiries
                            </>
                        ) : (
                            <>
                                <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                                Enquiry limit reached. Archive previous
                                enquiries to create new ones.
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
