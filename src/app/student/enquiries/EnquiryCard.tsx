import Link from "next/link";
import Image from "next/image";
import { Eye, Archive } from "lucide-react";

export interface EnquiryCardEnquiry {
    id: number;
    name: string;
    user_budget: number;
    title: string;
    description?: string;
    class_level: string;
    subject: string;
    board?: string;
    study_mode: string;
    status: string;
    created_at: string;
    updated_at: string;
    coins_reduced: number;
    coins_required: number;
    days_left: number;
    responded_count: number;
    total_responses: number;
    address?: {
        city: string;
        state: string;
        country?: string;
    };
    user?: {
        profile_avatar?: string;
        full_name?: string;
    };
    [key: string]: any;
}

export interface EnquiryCardProps {
    enquiry: EnquiryCardEnquiry;
    randomColor: string;
    setIsArchiveModalOpen: (isOpen: boolean) => void;
    setSelectedEnquiry: (enquiry: EnquiryCardEnquiry) => void;
}

const EnquiryCard = ({
    enquiry,
    randomColor,
    setIsArchiveModalOpen,
    setSelectedEnquiry,
}: EnquiryCardProps) => {
    const handleArchiveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsArchiveModalOpen(true);
        setSelectedEnquiry(enquiry);
    };

    return (
        <Link href={`/student/enquiries/${enquiry.id}`}>
            <div className="bg-white text-left rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                <div className="p-5">
                    {/* Header with profile */}
                    <div className="flex items-center mb-4">
                        {enquiry.profile_image ? (
                            <div className="w-12 h-12 rounded-full mr-3 relative overflow-hidden shrink-0">
                                <Image
                                    src={enquiry.profile_image}
                                    alt={`${enquiry.name}'s profile`}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                        ) : (
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${randomColor} shrink-0`}
                            >
                                <span className="text-lg font-semibold">
                                    {enquiry.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                            {enquiry.name}
                        </h2>
                    </div>

                    {/* Enquiry details */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                            <span className="font-medium w-24 shrink-0">
                                Subject:
                            </span>
                            <span className="truncate">{enquiry.subject}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                            <span className="font-medium w-24 shrink-0">
                                Mode:
                            </span>
                            <span>{enquiry.study_mode}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                            <span className="font-medium w-24 shrink-0">
                                Response:
                            </span>
                            <span>{enquiry.responded_count}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                            <span className="font-medium w-24 shrink-0">
                                Days left:
                            </span>
                            <span
                                className={
                                    enquiry.days_left <= 2
                                        ? "text-red-500 font-semibold"
                                        : "text-gray-700"
                                }
                            >
                                {enquiry.days_left}
                            </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                            <span className="font-medium w-24 shrink-0">
                                Budget/hr:
                            </span>
                            <span className="font-semibold text-green-600">
                                ₹ {enquiry.user_budget}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-3 pt-3 border-t border-gray-100">
                        <div className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center justify-center group-hover:bg-blue-600">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                        </div>

                        {!enquiry.archived && (
                            <button
                                onClick={handleArchiveClick}
                                type="button"
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors duration-300 flex items-center justify-center"
                                aria-label={`Archive ${enquiry.name}`}
                            >
                                <Archive className="h-4 w-4 mr-1" />
                                Archive
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EnquiryCard;
