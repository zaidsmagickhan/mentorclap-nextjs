"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import { EnquiryLimitDetail } from "@/types/dashboard";
import {
    fetchTotalEnquiryCount,
    fetchUnreadMessageCount,
} from "@/services/api/dashboard";
import LoaderMinimal from "@/component/loader/LoaderMinimal";

export default function DashboardPage() {
    const { authTokens, user, loading } = useAuth();
    const [error, setError] = useState<string>("");
    const [totalEnquiryCount, setTotalEnquiryCount] = useState<number>(0);
    const [enquiryLimitDetail, setEnquiryLimitDetail] =
        useState<EnquiryLimitDetail | null>(null);
    const [unreadCount, setUnreadCount] = useState<number>(0);

    useEffect(() => {
        const getTotalEnquiryCount = async () => {
            try {
                const data = await fetchTotalEnquiryCount();
                console.log(data, "data");
                setTotalEnquiryCount(data.total_enquiries);
                setEnquiryLimitDetail(data);
            } catch (error) {
                console.error("Error fetching enquiry count:", error);
                setError("Failed to load enquiry data");
            }
        };

        if (user?.role === "student") {
            getTotalEnquiryCount();
        }
    }, [authTokens?.access, user?.role]);

    useEffect(() => {
        document.title = "Dashboard - MentorClap";
    }, []);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const res = await fetchUnreadMessageCount();
                console.log(res);
                setUnreadCount(res.unread_count);
            } catch (error) {
                console.error("Error fetching unread count:", error);
            }
        };

        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, []);

    if (loading) return <LoaderMinimal />;

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
            {error && (
                <p className="text-red-500 bg-slate-100 py-3 mb-2 text-center">
                    {error}
                </p>
            )}

            {/* Teacher Dashboard */}
            {user?.role === "teacher" && (
                <TeacherDashboard
                    userFullName={user.full_name || ""}
                    unreadCount={unreadCount}
                />
            )}

            {/* Student Dashboard */}
            {user?.role === "student" && (
                <StudentDashboard
                    userFullName={user.full_name || ""}
                    totalEnquiryCount={totalEnquiryCount}
                    enquiryLimitDetail={enquiryLimitDetail}
                    unreadCount={unreadCount}
                />
            )}
        </div>
    );
}
