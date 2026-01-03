"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    MapPin,
    Monitor,
    Star,
    Coins,
    Sparkles,
} from "lucide-react";
import { useSnackbar } from "notistack";
import LoaderMinimal from "@/component/loader/LoaderMinimal";
import Spinner from "@/component/loader/Spinner";
import Pagination from "@/component/pagination/Pagination";
import { apiGet, apiPost } from "@/services/ApiService";
import {
    StarredEnquiry,
    StarredEnquiriesResponse,
    StarResponse,
    PaginationData,
} from "@/types/enquiry";

// Component that uses useSearchParams inside Suspense
const StarredEnquiriesContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [enquiries, setEnquiries] = useState<StarredEnquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [enquiryId, setEnquiryId] = useState<number | null>(null);
    const [togglingStar, setTogglingStar] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationData>({
        count: 0,
        currentPage: 1,
        totalPages: 1,
    });

    const toggleStar = async (id: number) => {
        setTogglingStar(true);
        setEnquiryId(id);
        try {
            const data: StarResponse = await apiPost(
                `/api/enquiry/${id}/star/`,
                {}
            );

            // If unstarring (status is 'unstarred'), remove from list
            if (data.status === "unstarred") {
                setEnquiries((prevEnquiries) =>
                    prevEnquiries.filter((enquiry) => enquiry.id !== id)
                );
                enqueueSnackbar("Enquiry removed from starred list", {
                    variant: "success",
                });
            } else {
                // Update star status if it stays starred
                setEnquiries((prevEnquiries) =>
                    prevEnquiries.map((enquiry) =>
                        enquiry.id === id
                            ? { ...enquiry, is_starred: true }
                            : enquiry
                    )
                );
                enqueueSnackbar("Enquiry starred successfully!", {
                    variant: "success",
                });
            }
        } catch (error) {
            console.error("Error toggling star:", error);
            enqueueSnackbar("Failed to update star status", {
                variant: "error",
            });
        } finally {
            setTogglingStar(false);
            setEnquiryId(null);
        }
    };

    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);

            try {
                const page = searchParams.get("page") || "1";
                const data: StarredEnquiriesResponse = await apiGet(
                    `/api/enquiry/starred/`
                );
                console.log(data, "starred-enquiries");
                setEnquiries(data.results);
                setPagination({
                    count: data.count,
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(data.count / 10),
                });
            } catch (error) {
                console.error("Error fetching starred enquiries:", error);
                enqueueSnackbar("Failed to load starred enquiries", {
                    variant: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, [searchParams, enqueueSnackbar]);

    useEffect(() => {
        document.title = "Starred Enquiries - MentorClap";
        const metaDescription = document.querySelector(
            "meta[name='description']"
        );
        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                "View and manage your starred (favorite) enquiries on MentorClap."
            );
        }
    }, []);

    const colors = ["bg-blue-200", "bg-purple-200"];

    if (loading) return <LoaderMinimal />;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Starred Enquiries
                    </h1>
                    {enquiries.length > 0 && (
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                            {enquiries.length}{" "}
                            {enquiries.length === 1 ? "enquiry" : "enquiries"}
                        </span>
                    )}
                </div>
                <p className="text-gray-600">
                    Your favorite enquiries that you've starred for quick access
                </p>
            </div>

            <Link
                href="/dashboard"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
            >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>

            {enquiries.length === 0 && !loading ? (
                <div className="text-center py-16 my-[60px] bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="max-w-md mx-auto">
                        <div className="text-gray-300 mb-4">
                            <Star className="w-20 h-20 mx-auto opacity-40" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            No Starred Enquiries Yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Star enquiries you're interested in to save them
                            here for quick access.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/enquiry"
                                className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                            >
                                Browse Enquiries
                            </Link>
                            <Link
                                href="/contacted-enquiries"
                                className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                View Contacted
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Starred Enquiries Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enquiries.map((enquiry) => {
                            const randomColor =
                                colors[
                                    Math.floor(Math.random() * colors.length)
                                ];

                            return (
                                <div
                                    key={enquiry.id}
                                    className="bg-white text-left shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative group border border-transparent hover:border-yellow-200"
                                >
                                    {/* Star Button - Already starred */}
                                    <button
                                        onClick={() => toggleStar(enquiry.id)}
                                        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm z-10 transition-colors duration-300 hover:bg-yellow-50"
                                        disabled={
                                            togglingStar &&
                                            enquiryId === enquiry.id
                                        }
                                        type="button"
                                        aria-label="Unstar enquiry"
                                    >
                                        {togglingStar &&
                                        enquiryId === enquiry.id ? (
                                            <Spinner />
                                        ) : (
                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 hover:fill-yellow-500 hover:text-yellow-500 transition-colors" />
                                        )}
                                    </button>

                                    <Link href={`/enquiry/${enquiry.id}`}>
                                        <div className="p-5">
                                            <div className="flex items-start">
                                                {/* Profile image or fallback */}
                                                {enquiry.image ? (
                                                    <div className="w-16 h-16 rounded-full mr-4 border-2 border-gray-100 shadow-sm shrink-0 relative overflow-hidden">
                                                        <Image
                                                            src={enquiry.image}
                                                            alt={`${enquiry.name}'s profile`}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${randomColor} border-2 border-gray-100 shadow-sm shrink-0`}
                                                    >
                                                        <span className="text-xl font-bold text-gray-700">
                                                            {enquiry.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Main info */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <h3
                                                            className={`text-lg font-semibold mb-1 ${
                                                                enquiry.viewed
                                                                    ? "text-gray-400"
                                                                    : "text-gray-800"
                                                            }`}
                                                        >
                                                            {enquiry.name}
                                                        </h3>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                                            {
                                                                enquiry.class_level
                                                            }{" "}
                                                            Tuition
                                                        </span>
                                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                                            {enquiry.subject}
                                                        </span>
                                                    </div>

                                                    <div className="text-sm text-gray-600 space-y-2">
                                                        <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                                                            {enquiry.address ? (
                                                                <span className="truncate">
                                                                    {
                                                                        enquiry
                                                                            .address
                                                                            .city
                                                                    }
                                                                    ,{" "}
                                                                    {
                                                                        enquiry
                                                                            .address
                                                                            .state
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400">
                                                                    Location not
                                                                    specified
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center">
                                                            <Monitor className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                                                            <span>
                                                                Mode:{" "}
                                                                {
                                                                    enquiry.study_mode
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center">
                                                            <Coins className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                                                            <span>
                                                                Coins required:{" "}
                                                                <b className="text-blue-600">
                                                                    {enquiry.coins_reduced >
                                                                    0
                                                                        ? enquiry.coins_reduced
                                                                        : enquiry.coins_required}
                                                                </b>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    {enquiry.responded_count ===
                                                    0 ? (
                                                        <span className="text-xs text-amber-600 font-medium">
                                                            Be the first to
                                                            respond -{" "}
                                                            {enquiry.days_left}d
                                                            left
                                                        </span>
                                                    ) : (
                                                        <div className="text-sm">
                                                            <span className="text-blue-600 font-semibold">
                                                                {
                                                                    enquiry.responded_count
                                                                }
                                                            </span>{" "}
                                                            <span className="text-gray-500">
                                                                of{" "}
                                                                {
                                                                    enquiry.total_responses
                                                                }{" "}
                                                                responded
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs py-1 px-3 rounded-full bg-green-100 text-green-700 font-medium">
                                                        {enquiry.time_ago}
                                                    </span>
                                                    <span className="text-xs py-1 px-2 rounded-full bg-yellow-100 text-yellow-700">
                                                        Starred
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {enquiries.length > 0 && (
                        <div className="mt-10">
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                basePath="/starred-enquiries"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// Main component with Suspense
const StarredEnquiries = () => {
    return (
        <Suspense fallback={<LoaderMinimal />}>
            <StarredEnquiriesContent />
        </Suspense>
    );
};

export default StarredEnquiries;
