"use client";

import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
    searchParams?: { [key: string]: string }; // Add searchParams prop
}

export default function Pagination({
    currentPage,
    totalPages,
    basePath,
    searchParams = {},
}: PaginationProps) {
    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams();

        // Add all existing search params
        Object.entries(searchParams).forEach(([key, value]) => {
            if (key !== "page" && value) {
                params.set(key, value);
            }
        });

        // Add the new page number
        params.set("page", pageNumber.toString());

        return `${basePath}?${params.toString()}`;
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            {/* Previous Button */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-3 py-2 rounded border ${
                    currentPage <= 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-blue-600 hover:bg-blue-50 border-blue-600"
                }`}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
            >
                Previous
            </Link>

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
                <Link
                    key={page}
                    href={createPageURL(page)}
                    className={`px-3 py-2 rounded border ${
                        page === currentPage
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-blue-600 hover:bg-blue-50 border-blue-600"
                    }`}
                >
                    {page}
                </Link>
            ))}

            {/* Next Button */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={`px-3 py-2 rounded border ${
                    currentPage >= totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-blue-600 hover:bg-blue-50 border-blue-600"
                }`}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
            >
                Next
            </Link>
        </div>
    );
}
