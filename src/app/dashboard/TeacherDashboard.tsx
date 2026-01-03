import Link from "next/link";
import {
    MessageSquare,
    Star,
    List,
    PhoneCall,
    User,
    MapPin,
} from "lucide-react";

interface TeacherDashboardProps {
    userFullName: string;
    unreadCount: number;
}

const TeacherDashboard = ({
    userFullName,
    unreadCount,
}: TeacherDashboardProps) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Welcome back, {userFullName}!
                </h2>
                <p className="text-gray-600">
                    Here&apos;s what&apos;s happening today.
                </p>
            </div>

            <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Useful Links
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <Link
                        href="/enquiry"
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50"
                    >
                        <div className="bg-indigo-100 p-3 rounded-lg mb-3">
                            <List size={24} className="text-indigo-600" />
                        </div>
                        <h4 className="font-medium text-gray-800">
                            All Enquiries
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                            View and manage all student enquiries
                        </p>
                    </Link>

                    <Link
                        href="/contacted-enquiries"
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-purple-50"
                    >
                        <div className="bg-purple-100 p-3 rounded-lg mb-3">
                            <PhoneCall size={24} className="text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-800">
                            Contacted Enquiries
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                            Contacted enquiries
                        </p>
                    </Link>

                    <Link
                        href="/starred-enquiries"
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-purple-50"
                    >
                        <div className="bg-purple-100 p-3 rounded-lg mb-3">
                            <Star size={24} className="text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-800">
                            Starred Enquiries
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                            Your starred enquiries
                        </p>
                    </Link>

                    <Link
                        href="/chat"
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-50"
                    >
                        <div className="bg-emerald-100 p-3 rounded-lg mb-3 relative">
                            <MessageSquare
                                size={24}
                                className="text-emerald-600"
                            />
                            {unreadCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <h4 className="font-medium text-gray-800">Messages</h4>
                        <p className="text-xs text-gray-500 mt-1">
                            Check your inbox
                        </p>
                    </Link>

                    <Link
                        href="/profile"
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50"
                    >
                        <div className="bg-blue-100 p-3 rounded-lg mb-3">
                            <User size={24} className="text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-800">Profile</h4>
                        <p className="text-xs text-gray-500 mt-1">
                            Update your personal information
                        </p>
                    </Link>

                    <Link
                        href="/address-management"
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-pink-50"
                    >
                        <div className="bg-pink-100 p-3 rounded-lg mb-3">
                            <MapPin size={24} className="text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-800">Address</h4>
                        <p className="text-xs text-gray-500 mt-1">
                            Add address
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TeacherDashboard;
