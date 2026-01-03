"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSnackbar } from "notistack";
import Modal from "@/component/modal/Modal";
import LoaderMinimal from "@/component/loader/LoaderMinimal";
import Pagination from "@/component/pagination/Pagination";
import EnquiryCard, { EnquiryCardEnquiry } from "./EnquiryCard";
import { apiGet, apiPatch } from "@/services/ApiService";
import {
    StudentEnquiry,
    PaginationData,
    ApiResponse,
} from "@/types/student-enquiry";

// Create a component that uses useSearchParams inside Suspense
const StudentEnquiriesContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [isArchiveModalOpen, setIsArchiveModalOpen] =
        useState<boolean>(false);
    const [selectedEnquiry, setSelectedEnquiry] =
        useState<StudentEnquiry | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [enquiries, setEnquiries] = useState<StudentEnquiry[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        count: 0,
        currentPage: 1,
        totalPages: 1,
    });

    const handleArchive = async (id: number) => {
        try {
            await apiPatch(`/api/enquiry/enquiries/${id}/archive/`, {});
            enqueueSnackbar("Enquiry archived successfully!", {
                variant: "success",
            });
            setIsArchiveModalOpen(false);
            fetchStudentEnquiries(); // refresh list
        } catch (error) {
            console.error("Failed to archive enquiry", error);
            enqueueSnackbar("Failed to archive enquiry", { variant: "error" });
        }
    };

    const fetchStudentEnquiries = useCallback(async () => {
        setLoading(true);
        try {
            const page = searchParams.get("page") || "1";
            const response: ApiResponse<StudentEnquiry[]> = await apiGet(
                `/api/enquiry/enquiries/`
            );
            console.log("User enquiries:", response);

            setEnquiries(response.results);

            setPagination({
                count: response.count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(response.count / 10),
            });
        } catch (error) {
            console.error("Error fetching user enquiries:", error);
            enqueueSnackbar("Failed to load enquiries", { variant: "error" });
        } finally {
            setLoading(false);
        }
    }, [searchParams, enqueueSnackbar]);

    useEffect(() => {
        fetchStudentEnquiries();
    }, [fetchStudentEnquiries]);

    useEffect(() => {
        document.title = "My Enquiries - MentorClap";
    }, []);

    const colors = [
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-red-200",
        "bg-purple-200",
        "bg-pink-200",
        "bg-indigo-200",
    ];

    if (loading) return <LoaderMinimal />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">My Enquiries</h1>
            <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
            </Link>

            <div className="p-4 max-w-6xl mx-auto">
                {loading ? (
                    <LoaderMinimal />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enquiries.map((enquiry: EnquiryCardEnquiry) => {
                            const randomColor =
                                colors[
                                    Math.floor(Math.random() * colors.length)
                                ];

                            return (
                                <EnquiryCard
                                    key={enquiry.id}
                                    enquiry={enquiry}
                                    randomColor={randomColor}
                                    setSelectedEnquiry={setSelectedEnquiry}
                                    setIsArchiveModalOpen={
                                        setIsArchiveModalOpen
                                    }
                                />
                            );
                        })}
                    </div>
                )}

                {!loading && enquiries.length === 0 && (
                    <div className="text-center py-12 my-[100px]">
                        <p className="text-gray-500 text-lg">
                            No enquiries found.
                        </p>
                        <Link
                            href="/student/enquiries/add"
                            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Create Your First Enquiry
                        </Link>
                    </div>
                )}

                {enquiries.length > 0 && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        basePath="/student/enquiries"
                    />
                )}
            </div>

            <Modal
                isOpen={isArchiveModalOpen}
                title="Archive Confirmation"
                content={`Are you sure you want to archive "${
                    selectedEnquiry?.title || "this enquiry"
                }"?`}
                buttons={[
                    {
                        label: "No",
                        onClick: () => setIsArchiveModalOpen(false),
                        className: "bg-gray-500 text-white",
                    },
                    {
                        label: "Yes, Archive",
                        onClick: () =>
                            selectedEnquiry &&
                            handleArchive(selectedEnquiry.id),
                        className: "bg-red-500 text-white",
                    },
                ]}
            />
        </div>
    );
};

// Main component with Suspense
const StudentEnquiriesList = () => {
    return (
        <Suspense fallback={<LoaderMinimal />}>
            <StudentEnquiriesContent />
        </Suspense>
    );
};

export default StudentEnquiriesList;
