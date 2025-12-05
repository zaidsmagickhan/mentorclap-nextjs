// import { Metadata } from "next";
// import { Suspense } from "react";
// import { apiGet } from "@/lib/api/ApiService";
// import Pagination from "@/component/pagination/Pagination";
// import Filters from "./Filters";
// import ArticleCard from "./ArticleCard";

// // Types
// interface Article {
//     id: number;
//     slug: string;
//     title: string;
//     content: string;
//     category: "student" | "teacher" | "general";
//     created_at: string;
//     updated_at: string;
//     video_id?: string;
// }

// interface PaginationInfo {
//     count: number;
//     currentPage: number;
//     totalPages: number;
// }

// interface ArticleListProps {
//     searchParams: Promise<{
//         page?: string;
//         search?: string;
//         category?: string;
//     }>;
// }

// // Generate metadata for SEO
// export async function generateMetadata({
//     searchParams,
// }: ArticleListProps): Promise<Metadata> {
//     const params = await searchParams;
//     const search = params.search;
//     const category = params.category;

//     let title = "FAQs - MentorClap";
//     let description = "Frequently asked questions for students and tutors";

//     if (search) {
//         title = `Search: "${search}" - FAQs`;
//         description = `Search results for "${search}" in FAQs`;
//     } else if (category) {
//         const categoryName = category === "student" ? "Student" : "Tutor";
//         title = `${categoryName} FAQs - MentorClap`;
//         description = `Frequently asked questions for ${categoryName.toLowerCase()}s`;
//     }

//     return {
//         title,
//         description,
//         keywords: "FAQs, help, support, questions, students, tutors, education",
//         openGraph: {
//             title,
//             description,
//             type: "website",
//         },
//     };
// }

// // Server Component - Article List
// async function ArticleListContent({ searchParams }: ArticleListProps) {
//     const params = await searchParams;
//     const page = params.page || "1";
//     const search = params.search || "";
//     const category = params.category || "";

//     try {
//         let url = `/api/blog/articles/?page=${page}`;
//         if (search) {
//             url += `&search=${encodeURIComponent(search)}`;
//         }
//         if (category) {
//             url += `&category=${category}`;
//         }

//         const response = await apiGet(url);
//         const articles: Article[] = response.results || [];
//         const pagination: PaginationInfo = {
//             count: response.count || 0,
//             currentPage: parseInt(page),
//             totalPages: Math.ceil((response.count || 0) / 10),
//         };

//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="text-center mb-8">
//                     <h1 className="text-4xl font-bold text-gray-800 mb-4">
//                         Frequently Asked Questions
//                     </h1>
//                     <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//                         Find answers to common questions about MentorClap for
//                         students and tutors
//                     </p>
//                 </div>

//                 {/* Filters - Client Component */}
//                 <Filters initialSearch={search} initialCategory={category} />

//                 {/* Articles Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                     {articles.map((article) => (
//                         <ArticleCard key={article.id} article={article} />
//                     ))}
//                 </div>

//                 {/* No Results */}
//                 {articles.length === 0 && (
//                     <div className="text-center py-12 bg-gray-50 rounded-lg">
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                             No FAQs found
//                         </h3>
//                         <p className="text-gray-500">
//                             {search || category
//                                 ? "Try adjusting your search or filter criteria"
//                                 : "No FAQs available at the moment. Check back soon!"}
//                         </p>
//                     </div>
//                 )}

//                 {/* Pagination */}
//                 {pagination.totalPages > 1 && (
//                     <Pagination
//                         currentPage={pagination.currentPage}
//                         totalPages={pagination.totalPages}
//                         basePath="/faqs"
//                         searchParams={params}
//                     />
//                 )}
//             </div>
//         );
//     } catch (error) {
//         console.error("Error fetching articles:", error);
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="text-center py-12">
//                     <h2 className="text-2xl font-bold text-red-600 mb-4">
//                         Error Loading FAQs
//                     </h2>
//                     <p className="text-gray-600">
//                         Failed to load FAQs. Please try again later.
//                     </p>
//                 </div>
//             </div>
//         );
//     }
// }

// // Main Page Component
// export default function FAQPage({ searchParams }: ArticleListProps) {
//     return (
//         <Suspense fallback={<LoadingSkeleton />}>
//             <ArticleListContent searchParams={searchParams} />
//         </Suspense>
//     );
// }

// // Loading Skeleton
// function LoadingSkeleton() {
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="animate-pulse">
//                 <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
//                 <div className="h-12 bg-gray-200 rounded w-full max-w-2xl mx-auto mb-8"></div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[...Array(6)].map((_, i) => (
//                         <div
//                             key={i}
//                             className="bg-gray-200 rounded-lg h-48"
//                         ></div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { Metadata } from "next";
import { Suspense } from "react";
import { apiGet } from "@/lib/api/ApiService";
import Pagination from "@/component/pagination/Pagination";
import Filters from "./Filters";
import ArticleCard from "./ArticleCard";
import { PAGE_SIZE } from "@/lib/constants/base";

// Types
interface Article {
    id: number;
    slug: string;
    title: string;
    content: string;
    category: "student" | "teacher";
    created_at: string;
    updated_at: string;
    video_id?: string;
}

interface PaginationInfo {
    count: number;
    currentPage: number;
    totalPages: number;
}

interface ArticleListProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category?: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({
    searchParams,
}: ArticleListProps): Promise<Metadata> {
    const params = await searchParams;
    const search = params.search;
    const category = params.category;

    let title = "FAQs - MentorClap";
    let description = "Frequently asked questions for students and tutors";

    if (search) {
        title = `Search: "${search}" - FAQs`;
        description = `Search results for "${search}" in FAQs`;
    } else if (category) {
        const categoryName = category === "student" ? "Student" : "Tutor";
        title = `${categoryName} FAQs - MentorClap`;
        description = `Frequently asked questions for ${categoryName.toLowerCase()}s`;
    }

    return {
        title,
        description,
        keywords: "FAQs, help, support, questions, students, tutors, education",
        openGraph: {
            title,
            description,
            type: "website",
        },
    };
}

// Helper function to clean params (remove page=1)
function cleanParams(params: Record<string, string>) {
    const cleaned = { ...params };
    if (cleaned.page === "1") {
        delete cleaned.page;
    }
    return cleaned;
}

// Server Component - Article List
async function ArticleListContent({ searchParams }: ArticleListProps) {
    const params = await searchParams;
    const page = params.page || "1";
    const search = params.search || "";
    const category = params.category || "";

    try {
        // Always include page in API request, even if it's 1
        let url = `/api/blog/articles/?page=${page}`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
        if (category) {
            url += `&category=${category}`;
        }

        const response = await apiGet(url);
        console.log("API Response:", response);
        const articles: Article[] = response.results || [];
        const pagination: PaginationInfo = {
            count: response.count || 0,
            currentPage: parseInt(page),
            totalPages: Math.ceil((response.count || 0) / PAGE_SIZE),
        };

        // Clean params for display (remove page=1)
        const displayParams = cleanParams(params);

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Find answers to common questions about MentorClap for
                        students and tutors
                    </p>
                </div>

                {/* Filters - Client Component */}
                <Filters initialSearch={search} initialCategory={category} />

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {/* No Results */}
                {articles.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No FAQs found
                        </h3>
                        <p className="text-gray-500">
                            {search || category
                                ? "Try adjusting your search or filter criteria"
                                : "No FAQs available at the moment. Check back soon!"}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        basePath="/faqs"
                        searchParams={displayParams}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching articles:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        Error Loading FAQs
                    </h2>
                    <p className="text-gray-600">
                        Failed to load FAQs. Please try again later.
                    </p>
                </div>
            </div>
        );
    }
}

// Main Page Component
export default function FAQPage({ searchParams }: ArticleListProps) {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <ArticleListContent searchParams={searchParams} />
        </Suspense>
    );
}

// Loading Skeleton
function LoadingSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
                <div className="h-12 bg-gray-200 rounded w-full max-w-2xl mx-auto mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-200 rounded-lg h-48"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
