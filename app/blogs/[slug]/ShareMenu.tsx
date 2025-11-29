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
} from "lucide-react";

interface ShareMenuProps {
    url: string;
    title: string;
    image?: string | null;
    variant?: "default" | "mobile" | "large";
}

export default function ShareMenu({
    url,
    title,
    image,
    variant = "default",
}: ShareMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    const shareOptions = [
        {
            name: "Copy Link",
            icon: copied ? CheckCircle2 : Link2,
            color: "text-gray-700 hover:text-gray-900",
            bgColor: "hover:bg-gray-100",
            action: () => copyToClipboard(),
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            color: "text-green-600 hover:text-green-700",
            bgColor: "hover:bg-green-50",
            action: () => shareOnWhatsApp(),
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "text-blue-600 hover:text-blue-700",
            bgColor: "hover:bg-blue-50",
            action: () => shareOnFacebook(),
        },
        {
            name: "Twitter",
            icon: Twitter,
            color: "text-sky-500 hover:text-sky-600",
            bgColor: "hover:bg-sky-50",
            action: () => shareOnTwitter(),
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "text-blue-700 hover:text-blue-800",
            bgColor: "hover:bg-blue-50",
            action: () => shareOnLinkedIn(),
        },
        {
            name: "Email",
            icon: Mail,
            color: "text-red-600 hover:text-red-700",
            bgColor: "hover:bg-red-50",
            action: () => shareOnEmail(),
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareOnWhatsApp = () => {
        const text = `Check out this blog: ${title}`;
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
            "_blank"
        );
    };

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
            )}`,
            "_blank"
        );
    };

    const shareOnTwitter = () => {
        const text = `Check out this blog: ${title}`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                text
            )}&url=${encodeURIComponent(url)}`,
            "_blank"
        );
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                url
            )}`,
            "_blank"
        );
    };

    const shareOnEmail = () => {
        const subject = `Check out this blog: ${title}`;
        const body = `I thought you might find this interesting:\n\n${title}\n${url}`;
        window.open(
            `mailto:?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`
        );
    };

    // Native Web Share API (for mobile devices)
    const shareNative = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this blog: ${title}`,
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
        if (variant === "mobile" && (await navigator.share())) {
            shareNative();
        } else {
            setIsOpen(!isOpen);
        }
    };

    // Variant styles
    const getButtonStyles = () => {
        switch (variant) {
            case "mobile":
                return "p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700";
            case "large":
                return "px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold";
            default:
                return "px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-medium";
        }
    };

    const getMenuStyles = () => {
        switch (variant) {
            case "mobile":
                return "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50";
            case "large":
                return "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white rounded-lg shadow-xl border z-50";
            default:
                return "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50";
        }
    };

    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Share Button */}
            <button
                onClick={handleShareClick}
                className={`flex items-center gap-2 transition-all duration-200 ${getButtonStyles()}`}
            >
                <Share2 className="w-4 h-4" />
                {variant !== "mobile" && "Share"}
            </button>

            {/* Share Dropdown Menu */}
            {isOpen && (
                <div className={getMenuStyles()}>
                    <div className="p-2">
                        <h3 className="text-sm font-semibold text-gray-900 px-2 py-1 mb-1">
                            Share this post
                        </h3>
                        {shareOptions.map((option) => {
                            const IconComponent = option.icon;
                            return (
                                <button
                                    key={option.name}
                                    onClick={option.action}
                                    className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors ${option.bgColor} ${option.color}`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{option.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
