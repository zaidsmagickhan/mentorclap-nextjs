"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface SearchFormProps {
    initialSearch: string;
}

export default function SearchForm({ initialSearch }: SearchFormProps) {
    const [searchInput, setSearchInput] = useState(initialSearch);
    const router = useRouter();

    const handleSearch = useCallback(
        (value: string) => {
            setSearchInput(value);

            // Debounce the search
            const timer = setTimeout(() => {
                const params = new URLSearchParams();
                if (value) {
                    params.set("search", value);
                }
                // Reset to page 1 when searching
                params.set("page", "1");

                router.push(`/blogs?${params.toString()}`);
            }, 300);

            return () => clearTimeout(timer);
        },
        [router]
    );

    return (
        <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchInput}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
            </div>
        </div>
    );
}
