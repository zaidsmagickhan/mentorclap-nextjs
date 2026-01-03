"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
    Star,
    Phone,
    User,
    MapPin,
    X,
    ChevronDown,
    ArrowLeft,
    CheckCircle,
    Coins,
    MessageCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { enqueueSnackbar } from "notistack";
import { apiGet, apiPost } from "@/services/ApiService";
import LoaderMinimal from "@/component/loader/LoaderMinimal";
import Spinner from "@/component/loader/Spinner";
import CallLink from "./CallLink";
import {
    Enquiry,
    ContactedStatus,
    StarResponse,
    ContactDetails,
} from "@/types/enquiry-detail";

// Dynamically import Google Maps iframe to avoid SSR issues
const MapIframe = dynamic(() => import("./MapIframe"), { ssr: false });
// import MapIframe from "./MapIframe";

const EnquiryDetail = () => {
    const params = useParams();
    const enquiryId = params.id as string;
    const router = useRouter();

    const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    // Send message states
    const [selectedPriceType, setSelectedPriceType] =
        useState<string>("Hourly");
    const [priceQuote, setPriceQuote] = useState<number>(0);
    const [messageBody, setMessageBody] = useState<string>("");
    const [contactDetails, setContactDetails] = useState<ContactDetails | null>(
        null
    );
    const [sendingMessage, setSendingMessage] = useState<boolean>(false);
    const [alreadyContacted, setAlreadyContacted] = useState<boolean>(false);

    const [togglingStar, setTogglingStar] = useState<boolean>(false);

    const priceTypes = ["Hourly", "Monthly", "Yearly"];

    const handleContactClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleStar = async (id: number) => {
        setTogglingStar(true);
        try {
            const data: StarResponse = await apiPost(
                `/api/enquiry/${id}/star/`,
                {}
            );
            setEnquiry((prev) =>
                prev
                    ? {
                          ...prev,
                          is_starred: data.status === "starred",
                      }
                    : null
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
        }
    };

    const handleSendMessage = async () => {
        console.log("send message Clicked");

        if (priceQuote <= 0) {
            enqueueSnackbar("Please enter correct price quote", {
                variant: "info",
            });
            return;
        }
        if (!messageBody.trim()) {
            enqueueSnackbar("Please enter your message", { variant: "info" });
            return;
        }
        if (!selectedPriceType) {
            enqueueSnackbar("Please select price type", { variant: "info" });
            return;
        }

        setSendingMessage(true);
        try {
            const response: ContactDetails = await apiPost(
                `/api/enquiry/${enquiryId}/send-message/`,
                {
                    price_quote: parseInt(priceQuote.toString()),
                    price_type: selectedPriceType,
                    message: messageBody,
                }
            );
            setContactDetails(response);
            enqueueSnackbar("Message sent successfully", {
                variant: "success",
            });
            setAlreadyContacted(true);
            closeModal();
        } catch (error: any) {
            console.log("Error sending message:", error);
            if (error.message && error.message.includes("Insufficient coins")) {
                enqueueSnackbar(
                    "Please recharge, as your coin is less to contact this enquiry.",
                    { variant: "info" }
                );
                setTimeout(() => {
                    router.push("/teacher/upgrade-plan");
                }, 1000);
            } else {
                enqueueSnackbar(error.message || "Error sending message", {
                    variant: "error",
                });
            }
        } finally {
            setSendingMessage(false);
        }
    };

    useEffect(() => {
        const getEnquiry = async () => {
            setLoading(true);
            try {
                const enquiryData: Enquiry = await apiGet(
                    `/api/enquiry/enquiries/${enquiryId}/`
                );
                const contactedStatus: ContactedStatus = await apiGet(
                    `/api/enquiry/${enquiryId}/check-contacted/`
                );
                setAlreadyContacted(contactedStatus.exists);
                setContactDetails(contactedStatus.contact_details || null);
                setEnquiry(enquiryData);
            } catch (error) {
                console.error("Error fetching enquiry:", error);
                enqueueSnackbar("Failed to load enquiry details", {
                    variant: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        getEnquiry();
    }, [enquiryId, enqueueSnackbar]);

    useEffect(() => {
        document.title = "Enquiry Details - MentorClap";
        const metaDescription = document.querySelector(
            "meta[name='description']"
        );
        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                "View detailed information about the enquiry. Contact the student directly for more information."
            );
        }
    }, []);

    if (loading) return <LoaderMinimal />;

    if (!enquiry) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6 text-center">
                    <p className="text-gray-700">
                        Enquiry not found or has been archived.
                    </p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6 relative text-left">
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 z-7"
                    type="button"
                >
                    <ArrowLeft
                        className={`w-6 h-6 text-blue-400 transition-colors duration-200`}
                    />
                </button>

                {/* Star Button */}
                <button
                    onClick={() => toggleStar(enquiry.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm z-7 transition-colors duration-300"
                    disabled={togglingStar}
                    type="button"
                >
                    {togglingStar ? (
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

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {enquiry.name}
                    </h1>
                    <p className="text-gray-500">
                        {enquiry.class_level} | {enquiry.subject}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Location
                            </p>
                            {enquiry.address && (
                                <p className="text-gray-600">
                                    {enquiry.address.city},{" "}
                                    {enquiry.address.state},{" "}
                                    {enquiry.address.country}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <User className="w-5 h-5 text-green-500" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Board & Study Mode
                            </p>
                            <p className="text-gray-600">
                                {enquiry.board} <br />{" "}
                                <span className="">
                                    Mode: {enquiry.study_mode}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Phone className="w-5 h-5 text-purple-500" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Contact
                            </p>
                            <p className="text-gray-600">
                                {alreadyContacted &&
                                contactDetails?.contact_number
                                    ? contactDetails.contact_number
                                    : enquiry.user.phone_number}
                                <CheckCircle className="w-4 h-4 text-green-400 inline-block ml-1" />{" "}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <div>
                            <p className="font-semibold text-gray-700">
                                Coin required
                            </p>
                            <p className="text-gray-600">
                                {enquiry.coins_reduced > 0
                                    ? enquiry.coins_reduced
                                    : enquiry.coins_required}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">
                                Budget per hour
                            </p>
                            <p className="font-bold text-blue-600">
                                ₹ {enquiry.user_budget}
                            </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Days Left</p>
                            <p className="font-bold text-green-600">
                                {enquiry.days_left}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mini Google Map Box */}
                {["both", "offline"].includes(enquiry.study_mode) &&
                    enquiry.address && (
                        <div className="mt-3">
                            <a
                                href={`https://maps.google.com/?q=${enquiry.address.latitude},${enquiry.address.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 block"
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "120px",
                                        marginBottom: "15px",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <MapIframe
                                        latitude={enquiry.address.latitude}
                                        longitude={enquiry.address.longitude}
                                    />
                                </div>
                            </a>
                        </div>
                    )}

                {alreadyContacted ? (
                    <>
                        <div className="mt-6 flex space-x-4">
                            <button
                                className="flex items-center justify-center w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                                onClick={() =>
                                    router.push(
                                        `/chat/${contactDetails?.conversation_id}`
                                    )
                                }
                                type="button"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Open Chat
                            </button>
                        </div>
                        <div className="text-center mt-4 space-y-2">
                            <div className="flex flex-wrap gap-2 justify-center">
                                <a
                                    href={`https://wa.me/${contactDetails?.contact_number}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    Chat on WhatsApp
                                </a>
                                {contactDetails?.contact_number && (
                                    <CallLink
                                        phoneNumber={
                                            contactDetails.contact_number
                                        }
                                    />
                                )}
                            </div>
                            <p className="text-gray-700 mt-2">
                                Tutor needed:{" "}
                                <b>{contactDetails?.when_to_start}</b>
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={handleContactClick}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                            type="button"
                        >
                            Contact
                        </button>
                    </div>
                )}

                {enquiry.user?.last_login && (
                    <p className="text-center text-xs text-gray-500 mt-4">
                        Last Login:
                        {formatDistanceToNow(
                            new Date(enquiry.user.last_login),
                            {
                                addSuffix: true,
                            }
                        )}
                    </p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">
                                Send a Message
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500"
                                type="button"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative mb-4">
                            <div className="flex">
                                <div className="relative grow mr-2">
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded pr-10"
                                        onChange={(e) =>
                                            setPriceQuote(
                                                parseFloat(e.target.value) || 0
                                            )
                                        }
                                        placeholder="Price Quote"
                                        min="0"
                                        step="0.01"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <span className="text-gray-500 mr-2">
                                            ₹
                                        </span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                        className="w-32 p-2 border rounded flex items-center justify-between"
                                        type="button"
                                    >
                                        {selectedPriceType}
                                        <ChevronDown className="w-4 h-4 ml-2" />
                                    </button>

                                    {isDropdownOpen && (
                                        <ul className="absolute right-0 mt-1 w-32 text-left border rounded bg-white shadow-lg z-10">
                                            {priceTypes.map((type) => (
                                                <li
                                                    key={type}
                                                    onClick={() => {
                                                        setSelectedPriceType(
                                                            type
                                                        );
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                    }}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {type}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <textarea
                            className="w-full p-2 border rounded mb-4"
                            rows={4}
                            placeholder="Type your message here..."
                            onChange={(e) => setMessageBody(e.target.value)}
                            value={messageBody}
                        ></textarea>
                        <button
                            onClick={handleSendMessage}
                            disabled={sendingMessage}
                            className="bg-blue-500 text-white w-full py-2 rounded-lg disabled:opacity-50"
                            type="button"
                        >
                            {sendingMessage ? (
                                <Spinner message="Sending..." />
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnquiryDetail;
