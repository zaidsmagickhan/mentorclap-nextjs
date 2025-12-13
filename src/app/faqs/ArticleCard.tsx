"use client";

import Link from "next/link";
import { Calendar, User, MessageSquare } from "lucide-react";
import { memo } from "react";

interface Article {
    id: number;
    slug: string;
    title: string;
    content: string;
    category: "student" | "teacher";
    created_at: string;
}

interface ArticleCardProps {
    article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
    const categoryColors = {
        student: "bg-blue-100 text-blue-800",
        teacher: "bg-purple-100 text-purple-800",
    };

    const categoryLabels = {
        student: "Student",
        teacher: "Tutor",
    };

    return (
        <Link
            href={`/faqs/${article.slug}`}
            className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            prefetch={false} // Optional: disable prefetching if you have many cards
        >
            <div className="p-6">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-4">
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            categoryColors[article.category]
                        }`}
                    >
                        {categoryLabels[article.category]}
                    </span>
                    <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.content.replace(/<[^>]*>/g, "").substring(0, 120)}
                    ...
                </p>

                {/* Footer with date */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {new Date(article.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </span>
                    </div>
                    <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Read More →
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default memo(ArticleCard);
