"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
    useRouter,
    useSearchParams as useNextSearchParams,
} from "next/navigation";
import { Search, Filter, X } from "lucide-react";

interface FiltersProps {
    initialSearch: string;
    initialCategory: string;
}

export default function Filters({
    initialSearch,
    initialCategory,
}: FiltersProps) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [categoryFilter, setCategoryFilter] = useState(initialCategory);
    const router = useRouter();
    const searchParams = useNextSearchParams();

    // Use refs to track if this is the initial render and debounce
    const isInitialMount = useRef(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastAppliedSearch = useRef(initialSearch);
    const lastAppliedCategory = useRef(initialCategory);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Apply filters to URL
    const applyFilters = useCallback(
        (search: string, category: string) => {
            const params = new URLSearchParams();

            if (search) {
                params.set("search", search);
            }

            if (category) {
                params.set("category", category);
            }

            // Don't add page=1 to URL
            const currentPage = searchParams.get("page");
            if (currentPage && currentPage !== "1") {
                params.set("page", currentPage);
            }

            const queryString = params.toString();
            const url = queryString ? `/faqs?${queryString}` : "/faqs";

            // Update last applied filters
            lastAppliedSearch.current = search;
            lastAppliedCategory.current = category;

            router.push(url, { scroll: false });
        },
        [router, searchParams]
    );

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Debounce the search
        timeoutRef.current = setTimeout(() => {
            // Don't apply if value hasn't changed
            if (value !== lastAppliedSearch.current) {
                applyFilters(value, categoryFilter);
            }
        }, 300);
    };

    // Handle category change
    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);

        // Apply immediately for category changes
        if (value !== lastAppliedCategory.current) {
            applyFilters(searchTerm, value);
        }
    };

    // Reset filters
    const handleReset = () => {
        setSearchTerm("");
        setCategoryFilter("");

        // Clear timeout if exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Update refs
        lastAppliedSearch.current = "";
        lastAppliedCategory.current = "";

        router.push("/faqs", { scroll: false });
    };

    // Clear search individually
    const clearSearch = () => {
        setSearchTerm("");
        if (searchTerm !== lastAppliedSearch.current) {
            applyFilters("", categoryFilter);
            router.push("/faqs", { scroll: false });
        }
    };

    // Clear category individually
    const clearCategory = () => {
        setCategoryFilter("");
        if (categoryFilter !== lastAppliedCategory.current) {
            applyFilters(searchTerm, "");
            router.push("/faqs", { scroll: false });
        }
    };

    // Only sync from URL on initial load or external navigation
    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";
        const currentCategory = searchParams.get("category") || "";

        // Update state if URL params have changed externally
        if (
            currentSearch !== lastAppliedSearch.current ||
            currentCategory !== lastAppliedCategory.current
        ) {
            setSearchTerm(currentSearch);
            setCategoryFilter(currentCategory);
            lastAppliedSearch.current = currentSearch;
            lastAppliedCategory.current = currentCategory;
        }
    }, [searchParams]);

    return (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Category Filter */}
                <div className="w-full md:w-64 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Filter className="w-5 h-5" />
                    </div>
                    <select
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                        value={categoryFilter}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="student">Student</option>
                        <option value="teacher">Tutor</option>
                    </select>
                </div>

                {/* Reset Button - Only show when there are active filters */}
                {(searchTerm || categoryFilter) && (
                    <button
                        onClick={handleReset}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Active Filters Display */}
            {(searchTerm || categoryFilter) && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {searchTerm && (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1.5 rounded-full">
                            Search: "{searchTerm}"
                            <button
                                onClick={clearSearch}
                                className="ml-1 text-blue-600 hover:text-blue-800 p-0.5 rounded-full hover:bg-blue-200"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {categoryFilter && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-sm px-3 py-1.5 rounded-full">
                            Category:{" "}
                            {categoryFilter === "student"
                                ? "Student"
                                : categoryFilter === "teacher"
                                ? "Tutor"
                                : "General"}
                            <button
                                onClick={clearCategory}
                                className="ml-1 text-green-600 hover:text-green-800 p-0.5 rounded-full hover:bg-green-200"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
