"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
    videoId: string;
    className?: string;
}

export default function YouTubeEmbed({
    videoId,
    className = "",
}: YouTubeEmbedProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!videoId) return null;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
        >
            {!isPlaying ? (
                <div
                    className="relative cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                >
                    {/* Thumbnail */}
                    <img
                        src={thumbnailUrl}
                        alt="Video thumbnail"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl">
                            <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                        <div className="text-white font-semibold text-lg mb-1">
                            Watch Video Tutorial
                        </div>
                        <div className="text-white/90 text-sm">
                            Click to play
                        </div>
                    </div>
                </div>
            ) : (
                // YouTube Embed
                <div className="relative pb-[56.25%] h-0">
                    <iframe
                        src={embedUrl}
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
        </div>
    );
}
