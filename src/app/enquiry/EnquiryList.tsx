"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Filter, ArrowLeft, MapPin, Monitor, Star, Coins } from "lucide-react";
import { useSnackbar } from "notistack";
import LoaderMinimal from "@/component/loader/LoaderMinimal";
import Spinner from "@/component/loader/Spinner";
import Pagination from "@/component/pagination/Pagination";
import { apiGet, apiPost } from "@/services/ApiService";
import {
    Enquiry,
    Address,
    Filters,
    AvailableFilters,
    PaginationData,
    ApiResponse,
    StarResponse,
} from "@/types/enquiry";

const EnquiryList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();

    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [enquiryId, setEnquiryId] = useState<number | null>(null);
    const [togglingStar, setTogglingStar] = useState<boolean>(false);

    const [filters, setFilters] = useState<Filters>({
        classes: [],
        subjects: [],
        requirements: [],
        addresses: [],
        selected_address_id: null,
        enquiry_types: [],
    });

    const [availableFilters, setAvailableFilters] = useState<AvailableFilters>({
        classes: [],
        subjects: [],
        requirements: [],
        addresses: [],
    });

    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationData>({
        count: 0,
        currentPage: 1,
        totalPages: 1,
    });

    const toggleFilterSection = () => {
        setShowFilters(!showFilters);
    };

    const toggleStar = async (id: number) => {
        setTogglingStar(true);
        setEnquiryId(id);
        try {
            const data: StarResponse = await apiPost(
                `/api/enquiry/${id}/star/`,
                {}
            );
            setEnquiries((prevEnquiries) =>
                prevEnquiries.map((enquiry) =>
                    enquiry.id === id
                        ? {
                              ...enquiry,
                              is_starred:
                                  data.status === "starred" ? true : false,
                          }
                        : enquiry
                )
            );
            enqueueSnackbar(`Enquiry ${data.status} successfully!`, {
                variant: "success",
            });
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
        document.title = "Enquiries - MentorClap";
        const metaDescription = document.querySelector(
            "meta[name='description']"
        );
        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                "View and manage your enquiries on MentorClap. Stay updated with the latest inquiries from students."
            );
        }
    }, []);

    const loadFilters = useCallback(async () => {
        setLoading(true);
        try {
            const page = searchParams.get("page") || "1";
            const response: ApiResponse<{
                filters: AvailableFilters;
                enquiries: Enquiry[];
            }> = await apiGet("/api/enquiry/teacher/enquiry-filters/");

            console.log(response, "Filters ✅✅");
            const res_filters = response.results.filters;

            setAvailableFilters(res_filters);
            setEnquiries(response.results.enquiries);

            setPagination({
                count: response.count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(response.count / 10),
            });

            // Set default filters based on teacher's profile
            setFilters((prev) => ({
                ...prev,
                classes: res_filters.classes,
                subjects: res_filters.subjects,
                requirements: res_filters.requirements,
                selected_address_id:
                    res_filters.addresses.find((a) => a.is_primary)?.id || null,
            }));
        } catch (error) {
            console.error("Error loading filters:", error);
            enqueueSnackbar("Failed to load filters", {
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    }, [searchParams, enqueueSnackbar]);

    useEffect(() => {
        loadFilters();
    }, [loadFilters]);

    const handleFilterChange = (
        filterType: keyof Filters,
        value: string,
        isChecked: boolean
    ) => {
        setFilters((prev) => {
            const currentValues = [...(prev[filterType] as string[])];
            if (isChecked) {
                return {
                    ...prev,
                    [filterType]: [...currentValues, value],
                };
            } else {
                return {
                    ...prev,
                    [filterType]: currentValues.filter(
                        (item) => item !== value
                    ),
                };
            }
        });
    };

    const handleAddressChange = (addressId: number, isChecked: boolean) => {
        setFilters((prev) => ({
            ...prev,
            selected_address_id: isChecked ? addressId : null,
        }));
    };

    const applyFilters = async () => {
        try {
            const page = searchParams.get("page") || "1";
            const response: ApiResponse<Enquiry[]> = await apiPost(
                "/api/enquiry/teacher/enquiry-filters/",
                {
                    filters: {
                        ...filters,
                        classes: filters.classes.filter((cls) =>
                            availableFilters.classes.includes(cls)
                        ),
                        subjects: filters.subjects.filter((subj) =>
                            availableFilters.subjects.includes(subj)
                        ),
                        requirements: filters.requirements.filter((req) =>
                            availableFilters.requirements.includes(req)
                        ),
                    },
                }
            );

            console.log(response, "Filtered Enquiries");
            setEnquiries(response.results);

            setPagination({
                count: response.count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(response.count / 10),
            });

            setShowFilters(false);
        } catch (error) {
            console.error("Error applying filters:", error);
            enqueueSnackbar("Failed to apply filters", {
                variant: "error",
            });
        }
    };

    const clearFilters = () => {
        setFilters((prev) => ({
            ...prev,
            classes: [],
            subjects: [],
            requirements: [],
            enquiry_types: [],
        }));
    };

    const colors = ["bg-blue-200", "bg-purple-200"];

    if (loading) return <LoaderMinimal />;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Enquiries ({enquiries.length})
            </h1>

            <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
            </Link>

            <button
                onClick={toggleFilterSection}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                type="button"
            >
                <Filter className="mr-2" />{" "}
                {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showFilters && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-4 shadow-md rounded-lg mb-4 space-y-4 text-left text-sm w-full max-w-4xl">
                        {/* Interested Classes */}
                        <div>
                            <h4 className="font-semibold mb-2">
                                Interested Classes
                            </h4>
                            <div className="space-y-2">
                                {availableFilters.classes?.map((cls) => (
                                    <label key={cls} className="mr-2">
                                        <input
                                            type="checkbox"
                                            checked={filters.classes.includes(
                                                cls
                                            )}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "classes",
                                                    cls,
                                                    e.target.checked
                                                )
                                            }
                                        />{" "}
                                        {cls}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Subjects */}
                        <div>
                            <h4 className="font-semibold mb-2">Subject</h4>
                            <div className="space-y-2">
                                {availableFilters.subjects?.map((subj) => (
                                    <label key={subj} className="mr-2">
                                        <input
                                            type="checkbox"
                                            checked={filters.subjects.includes(
                                                subj
                                            )}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "subjects",
                                                    subj,
                                                    e.target.checked
                                                )
                                            }
                                        />{" "}
                                        {subj}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Requirement */}
                        <div>
                            <h4 className="font-semibold mb-2">Requirement</h4>
                            <div className="space-y-2">
                                {availableFilters.requirements?.map(
                                    (req, index) => (
                                        <span key={index}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={filters.requirements.includes(
                                                        req
                                                    )}
                                                    onChange={(e) =>
                                                        handleFilterChange(
                                                            "requirements",
                                                            req,
                                                            e.target.checked
                                                        )
                                                    }
                                                />{" "}
                                                {req.charAt(0).toUpperCase() +
                                                    req.slice(1)}
                                            </label>
                                            <br />
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Addresses */}
                        <div>
                            <h4 className="font-semibold mb-2">Addresses</h4>
                            <div className="space-y-2">
                                {availableFilters.addresses?.map((addr) => (
                                    <p key={addr.id}>
                                        <label key={addr.id}>
                                            <input
                                                type="radio"
                                                name="address"
                                                checked={
                                                    filters.selected_address_id ===
                                                    addr.id
                                                }
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        addr.id,
                                                        e.target.checked
                                                    )
                                                }
                                            />{" "}
                                            {addr.formatted_address}
                                            {addr.is_primary && " (Primary)"}
                                        </label>
                                        <br />
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Enquiry Type */}
                        <div>
                            <h4 className="font-semibold mb-2">Enquiry Type</h4>
                            <div className="space-y-2">
                                <label className="mr-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.enquiry_types.includes(
                                            "responded"
                                        )}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                "enquiry_types",
                                                "responded",
                                                e.target.checked
                                            )
                                        }
                                    />{" "}
                                    Responded
                                </label>
                                <label className="mr-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.enquiry_types.includes(
                                            "viewed"
                                        )}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                "enquiry_types",
                                                "viewed",
                                                e.target.checked
                                            )
                                        }
                                    />{" "}
                                    Viewed
                                </label>
                                <label className="mr-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.enquiry_types.includes(
                                            "reported"
                                        )}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                "enquiry_types",
                                                "reported",
                                                e.target.checked
                                            )
                                        }
                                    />{" "}
                                    Reported
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full max-w-4xl">
                            <button
                                onClick={clearFilters}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                                type="button"
                            >
                                Clear Filters
                            </button>
                            <button
                                onClick={applyFilters}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
                                type="button"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enquiries.map((enquiry) => {
                    const randomColor =
                        colors[Math.floor(Math.random() * colors.length)];

                    return (
                        <div
                            key={enquiry.id}
                            className="bg-white text-left shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                        >
                            {/* Star Button */}
                            <button
                                onClick={() => toggleStar(enquiry.id)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm z-7 transition-colors duration-300"
                                disabled={
                                    togglingStar && enquiryId === enquiry.id
                                }
                                type="button"
                            >
                                {togglingStar && enquiryId === enquiry.id ? (
                                    <Spinner />
                                ) : (
                                    <Star
                                        className={`w-5 h-5 ${
                                            enquiry.is_starred
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300 hover:text-yellow-400"
                                        } transition-colors duration-200`}
                                    />
                                )}
                            </button>

                            <Link href={`/enquiry/${enquiry.id}`}>
                                <div className="p-5">
                                    <div className="flex items-start">
                                        {/* Profile image or fallback */}
                                        {enquiry?.user?.profile_avatar ? (
                                            <div className="w-16 h-16 rounded-full mr-4 border-2 border-gray-100 shadow-sm shrink-0 relative overflow-hidden">
                                                <Image
                                                    src={
                                                        enquiry.user
                                                            .profile_avatar
                                                    }
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
                                                <span className="text-xl font-bold">
                                                    {enquiry.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                        )}

                                        {/* Main info */}
                                        <div className="flex-1">
                                            <h3
                                                className={`text-lg font-semibold mb-1 ${
                                                    enquiry.viewed
                                                        ? "text-gray-400"
                                                        : "text-gray-800"
                                                }`}
                                            >
                                                {enquiry.name}
                                            </h3>

                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                                    {enquiry.class_level}{" "}
                                                    Tuition
                                                </span>
                                                <span className="px-2 py-1 bg-yellow-200 text-gray-500 text-xs font-medium rounded-full">
                                                    {enquiry.subject}
                                                </span>
                                            </div>

                                            <div className="text-sm text-gray-600 space-y-1">
                                                <div className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    {enquiry.address && (
                                                        <span>
                                                            {
                                                                enquiry.address
                                                                    ?.city
                                                            }
                                                            ,{" "}
                                                            {
                                                                enquiry.address
                                                                    ?.state
                                                            }{" "}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center">
                                                    <Monitor className="w-4 h-4 mr-1 text-gray-500" />
                                                    <span>
                                                        Mode:{" "}
                                                        {enquiry.study_mode}
                                                    </span>
                                                </div>

                                                <div className="flex items-center">
                                                    <Coins className="w-4 h-4 mr-1 text-gray-500" />
                                                    <span>
                                                        Coins required:{" "}
                                                        <b>
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
                                            {enquiry.responded_count === 0 ? (
                                                <span className="text-xs">
                                                    Be the first one to respond
                                                    - {enquiry.days_left}d left
                                                </span>
                                            ) : (
                                                <div className="text-sm font-medium">
                                                    <span className="text-blue-600">
                                                        {
                                                            enquiry.responded_count
                                                        }
                                                    </span>{" "}
                                                    of {enquiry.total_responses}{" "}
                                                    responded
                                                </div>
                                            )}
                                        </div>

                                        <span className="text-xs py-1 px-3 rounded-full bg-green-200">
                                            {enquiry.time_ago}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {!loading && enquiries.length === 0 && (
                <div className="text-center py-12 my-[100px]">
                    <p className="text-gray-500 text-lg">No enquiry found.</p>
                </div>
            )}

            {enquiries.length > 0 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    basePath="/enquiry"
                />
            )}
        </div>
    );
};

export default EnquiryList;
