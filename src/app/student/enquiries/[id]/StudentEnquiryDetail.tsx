"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    User,
    Book,
    MapPin,
    ArrowLeft,
    School,
    History,
    DollarSign,
    Phone,
    Mail,
    Archive,
} from "lucide-react";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { apiGet, apiPatch } from "@/services/ApiService";
import LoaderMinimal from "@/component/loader/LoaderMinimal";
import Modal, { ModalButton } from "@/component/modal/Modal";
import { StudentEnquiryDetail as StudentEnquiryDetailType } from "@/types/student-enquiry";

const StudentEnquiryDetail = () => {
    const params = useParams();
    const id = params.id as string;

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [enquiry, setEnquiry] = useState<StudentEnquiryDetailType | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [isArchiveModalOpen, setIsArchiveModalOpen] =
        useState<boolean>(false);
    const [archiving, setArchiving] = useState<boolean>(false);

    const handleArchive = async (enquiryId: number) => {
        console.log("Archiving enquiry:", enquiryId);
        setArchiving(true);

        try {
            await apiPatch(`/api/enquiry/enquiries/${enquiryId}/archive/`, {});

            // Update local state
            setEnquiry((prev) =>
                prev
                    ? {
                          ...prev,
                          archived: true,
                      }
                    : null
            );

            setIsArchiveModalOpen(false);
            enqueueSnackbar("Enquiry archived successfully!", {
                variant: "success",
            });
        } catch (error: any) {
            console.error("Failed to archive enquiry", error);
            enqueueSnackbar(error?.detail || "Failed to archive enquiry", {
                variant: "error",
            });
        } finally {
            setArchiving(false);
        }
    };

    useEffect(() => {
        const fetchEnquiryDetails = async () => {
            setLoading(true);
            try {
                const response: StudentEnquiryDetailType = await apiGet(
                    `/api/enquiry/enquiries/${id}/`
                );
                console.log(response, "res enq");
                setEnquiry(response);
            } catch (error) {
                console.error("Error fetching enquiry details:", error);
                enqueueSnackbar("Failed to load enquiry details", {
                    variant: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEnquiryDetails();
        }
    }, [id, enqueueSnackbar]);

    useEffect(() => {
        document.title = "Enquiry Details - MentorClap";
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <LoaderMinimal />
            </div>
        );
    }

    if (!enquiry) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Enquiry Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        The enquiry you're looking for doesn't exist or has been
                        deleted.
                    </p>
                    <button
                        onClick={() => router.push("/student/enquiries")}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                        type="button"
                    >
                        Back to Enquiries
                    </button>
                </div>
            </div>
        );
    }

    const modalButtons: ModalButton[] = [
        {
            label: "Cancel",
            onClick: () => setIsArchiveModalOpen(false),
            className: "bg-gray-500 text-white hover:bg-gray-600",
        },
        {
            label: archiving ? "Archiving..." : "Yes, Archive",
            onClick: () => handleArchive(enquiry.id),
            className: "bg-red-500 text-white hover:bg-red-600",
            disabled: archiving,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg text-left w-full max-w-md p-6 relative">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/student/enquiries")}
                    className="absolute top-4 left-4 z-10"
                    type="button"
                    aria-label="Go back to enquiries"
                >
                    <ArrowLeft className="w-8 h-8 text-blue-400 hover:text-blue-600 transition-colors duration-200" />
                </button>

                {/* Header */}
                <div className="text-center mb-6 pt-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Your Enquiry
                    </h1>
                    <p className="text-gray-500">
                        {enquiry.class_level} {enquiry.custom_class ?? ""} |{" "}
                        {enquiry.subject} {enquiry.custom_subject ?? ""}
                    </p>
                </div>

                {/* Details Grid */}
                <div className="space-y-4">
                    {/* Personal Details */}
                    <div className="flex items-start space-x-4">
                        <User className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Personal Details
                            </p>
                            <p className="text-gray-600">{enquiry.name}</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start space-x-4">
                        <MapPin className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Location
                            </p>
                            <p className="text-gray-600">
                                {enquiry.address?.city},{" "}
                                {enquiry.address?.state},{" "}
                                {enquiry.address?.country}
                            </p>
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="flex items-start space-x-4">
                        <School className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Academic Details
                            </p>
                            <p className="text-gray-600">
                                {enquiry.board} <br />
                                Mode - <b>{enquiry.study_mode}</b>
                            </p>
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="flex items-start space-x-4">
                        <Book className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Subject
                            </p>
                            <p className="text-gray-600">
                                {enquiry.subject}{" "}
                                {enquiry.custom_subject
                                    ? `(${enquiry.custom_subject})`
                                    : ""}
                            </p>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-start space-x-4">
                        <DollarSign className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Budget
                            </p>
                            <p className="text-gray-600">
                                ₹ {enquiry.user_budget}
                            </p>
                        </div>
                    </div>

                    {/* Contact Number */}
                    <div className="flex items-start space-x-4">
                        <Phone className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Contact Number
                            </p>
                            <p className="text-gray-600">
                                {enquiry.user?.phone_number || "Not provided"}
                            </p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start space-x-4">
                        <Mail className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">Email</p>
                            <p className="text-gray-600">
                                {enquiry.user?.email || "Not provided"}
                            </p>
                        </div>
                    </div>

                    {/* Response Count */}
                    <div className="flex items-start space-x-4">
                        <User className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Responded Count
                            </p>
                            <p className="text-gray-600">
                                {enquiry.responded_count} /{" "}
                                {enquiry.total_responses}
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                            <p className="text-sm text-gray-600">Days Left</p>
                            <p
                                className={`font-bold text-lg ${
                                    enquiry.days_left <= 3
                                        ? "text-red-600"
                                        : "text-green-600"
                                }`}
                            >
                                {enquiry.days_left}
                            </p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                            <p className="text-sm text-gray-600">Posted</p>
                            <p className="font-bold text-blue-600 text-lg">
                                {format(
                                    new Date(enquiry.posted_at),
                                    "dd-MMM-yyyy"
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                    {!enquiry.archived ? (
                        <button
                            onClick={() => setIsArchiveModalOpen(true)}
                            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                            disabled={archiving}
                        >
                            {archiving ? (
                                <>
                                    <Archive className="w-4 h-4 mr-2 animate-pulse" />
                                    Archiving...
                                </>
                            ) : (
                                <>
                                    <History className="w-4 h-4 mr-2" />
                                    Archive Enquiry
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="text-center p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600 font-medium">
                                This enquiry has been archived
                            </p>
                        </div>
                    )}
                </div>

                {/* Archive Confirmation Modal */}
                <Modal
                    isOpen={isArchiveModalOpen}
                    title="Archive Confirmation"
                    content={
                        <div>
                            <p className="mb-2">
                                Are you sure you want to archive this enquiry?
                            </p>
                            <p className="text-sm text-gray-500">
                                Once archived, this enquiry will be moved to
                                your archive section and will no longer be
                                visible to tutors.
                            </p>
                        </div>
                    }
                    buttons={modalButtons}
                    onClose={() => setIsArchiveModalOpen(false)}
                    showCloseButton={true}
                />
            </div>
        </div>
    );
};

export default StudentEnquiryDetail;
