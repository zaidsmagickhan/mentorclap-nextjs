"use client";

import { useState, useRef, useEffect } from "react";
import {
    Share2,
    Link2,
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    MessageCircle,
    CheckCircle2,
    Copy,
    ChevronDown,
} from "lucide-react";

interface ShareMenuProps {
    url: string;
    title: string;
    type?: "blog" | "faq" | "article";
    variant?: "default" | "mobile" | "large";
    className?: string;
}

export default function ShareMenu({
    url,
    title,
    type = "blog",
    variant = "default",
    className = "",
}: ShareMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get share text based on type
    const getShareText = () => {
        switch (type) {
            case "faq":
                return "Check out this FAQ";
            case "article":
                return "Check out this article";
            case "blog":
            default:
                return "Check out this blog";
        }
    };

    const getShareTitle = () => {
        switch (type) {
            case "faq":
                return "FAQ";
            case "article":
                return "Article";
            case "blog":
            default:
                return "post";
        }
    };

    const shareOptions = [
        {
            name: "Copy Link",
            icon: copied ? CheckCircle2 : Copy,
            color: "text-gray-700",
            bgColor: "bg-gray-50 hover:bg-gray-100",
            action: () => copyToClipboard(),
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            color: "text-green-600",
            bgColor: "bg-green-50 hover:bg-green-100",
            action: () => shareOnWhatsApp(),
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "text-blue-600",
            bgColor: "bg-blue-50 hover:bg-blue-100",
            action: () => shareOnFacebook(),
        },
        {
            name: "Twitter",
            icon: Twitter,
            color: "text-sky-500",
            bgColor: "bg-sky-50 hover:bg-sky-100",
            action: () => shareOnTwitter(),
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "text-blue-700",
            bgColor: "bg-blue-50 hover:bg-blue-100",
            action: () => shareOnLinkedIn(),
        },
        {
            name: "Email",
            icon: Mail,
            color: "text-red-600",
            bgColor: "bg-red-50 hover:bg-red-100",
            action: () => shareOnEmail(),
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setIsOpen(false);
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setIsOpen(false);
            }, 2000);
        }
    };

    const shareOnWhatsApp = () => {
        const text = `${getShareText()}: ${title}`;
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
            "_blank"
        );
        setIsOpen(false);
    };

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
            )}`,
            "_blank"
        );
        setIsOpen(false);
    };

    const shareOnTwitter = () => {
        const text = `${getShareText()}: ${title}`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                text
            )}&url=${encodeURIComponent(url)}`,
            "_blank"
        );
        setIsOpen(false);
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                url
            )}`,
            "_blank"
        );
        setIsOpen(false);
    };

    const shareOnEmail = () => {
        const subject = `${getShareText()}: ${title}`;
        const body = `I thought you might find this ${getShareTitle().toLowerCase()} helpful:\n\n${title}\n${url}`;
        window.open(
            `mailto:?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`
        );
        setIsOpen(false);
    };

    // Native Web Share API (for mobile devices)
    const shareNative = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `${getShareText()}: ${title}`,
                    url: url,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            // Fallback to custom share menu
            setIsOpen(true);
        }
    };

    // Use native share on mobile, custom menu on desktop
    const handleShareClick = async () => {
        const shareData = {
            title: "Check this out!",
            text: "I thought you might like this.",
            url: window.location.href,
        };

        if (variant === "mobile" && navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.warn("Web Share failed:", err);
                // Fallback: open share dialog manually
                setIsOpen(!isOpen);
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    // Variant styles
    const getButtonStyles = () => {
        const baseStyles =
            "flex items-center gap-2 transition-all duration-200";

        switch (variant) {
            case "mobile":
                return `${baseStyles} p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700`;
            case "large":
                return `${baseStyles} px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold`;
            default:
                return `${baseStyles} px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-medium`;
        }
    };

    const getMenuStyles = () => {
        switch (variant) {
            case "mobile":
                return "absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50";
            case "large":
                return "absolute bottom-full left-0 mb-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50";
            default:
                return "absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50";
        }
    };

    const getButtonContent = () => {
        if (variant === "mobile") {
            return <Share2 className="w-4 h-4" />;
        }
        return (
            <>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </>
        );
    };

    return (
        <div className={`relative inline-block ${className}`} ref={menuRef}>
            {/* Share Button */}
            <button
                onClick={handleShareClick}
                className={getButtonStyles()}
                aria-expanded={isOpen}
                aria-label="Share options"
            >
                {getButtonContent()}
            </button>

            {/* Share Dropdown Menu */}
            {isOpen && (
                <div className={getMenuStyles()}>
                    <div className="p-4">
                        {/* Menu Header */}
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Share this {getShareTitle()}
                            </h3>
                            <p className="text-xs text-gray-500">
                                Share via your favorite platforms
                            </p>
                        </div>

                        {/* Share Buttons Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {shareOptions.map((option) => {
                                const IconComponent = option.icon;
                                return (
                                    <button
                                        key={option.name}
                                        onClick={option.action}
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${option.bgColor} group`}
                                        title={option.name}
                                        aria-label={`Share via ${option.name}`}
                                    >
                                        <IconComponent
                                            className={`w-5 h-5 mb-2 ${option.color} group-hover:scale-110 transition-transform`}
                                        />
                                        <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                                            {option.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* URL Copy Section */}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        readOnly
                                        value={url}
                                        className="w-full text-sm px-3 py-2 pl-9 border border-gray-300 rounded-lg bg-gray-50 truncate pr-10"
                                        onClick={(e) =>
                                            (
                                                e.target as HTMLInputElement
                                            ).select()
                                        }
                                        aria-label="Share URL"
                                    />
                                    <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    {copied && (
                                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${
                                        copied
                                            ? "bg-green-100 text-green-700 border border-green-200"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                    aria-label={copied ? "Copied!" : "Copy URL"}
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Click the URL to select, or use the copy button
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
