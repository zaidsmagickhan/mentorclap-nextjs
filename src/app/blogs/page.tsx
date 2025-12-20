import { Suspense } from "react";
import Link from "next/link";
import { apiGet } from "@/services/ApiService";
import Pagination from "@/component/pagination/Pagination";
import SearchForm from "./SearchForm";
import { PAGE_SIZE } from "@/lib/contants";

// Types for TypeScript
interface Blog {
    id: number;
    slug: string;
    title: string;
    content: string;
    featured_image: string | null;
    created_at: string;
}

interface PaginationInfo {
    count: number;
    currentPage: number;
    totalPages: number;
}

interface BlogListProps {
    searchParams: Promise<{
        // ← searchParams is now a Promise
        page?: string;
        search?: string;
    }>;
}

// Server Component - This runs on the server
async function BlogListContent({ searchParams }: BlogListProps) {
    // ✅ FIX: Await the searchParams Promise
    const params = await searchParams;
    const page = params.page || "1";
    const search = params.search || "";

    // Fetch data on the SERVER
    let url = `/api/blog/blogs/?page=${page}`;
    if (search) {
        url += `&search=${search}`;
    }

    try {
        const response = await apiGet(url);
        const blogs: Blog[] = response.results;
        const pagination: PaginationInfo = {
            count: response.count,
            currentPage: parseInt(page),
            totalPages: Math.ceil((response.count || 0) / PAGE_SIZE),
        };

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Blog Posts
                </h1>

                {/* Search Form - Client Component */}
                <SearchForm initialSearch={search} />

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>

                {/* No Results */}
                {blogs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No blog posts found.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    basePath="/blogs"
                    searchParams={params} // Pass search params to pagination
                />
            </div>
        );
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <p className="text-red-500 text-lg">
                        Failed to load blogs. Please try again later.
                    </p>
                </div>
            </div>
        );
    }
}

// Blog Card Component
function BlogCard({ blog }: { blog: Blog }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            {blog.featured_image ? (
                <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
            ) : (
                <img
                    src="/blank.jpg"
                    alt="blank blog"
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
            )}
            <div className="p-6 flex flex-col grow text-left">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <div className="text-gray-600 mb-4 grow">
                    {blog.content ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: blog.content.substring(0, 100) + "...",
                            }}
                            className="line-clamp-3"
                        />
                    ) : (
                        "No content available"
                    )}
                </div>
                <div className="flex justify-between items-center mt-auto pt-2">
                    <span className="text-sm text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                    <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Main Page Component with Suspense
export default function BlogListPage({ searchParams }: BlogListProps) {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 py-8 text-center">
                    Loading blogs...
                </div>
            }
        >
            <BlogListContent searchParams={searchParams} />
        </Suspense>
    );
}

// Optional: Generate metadata
export async function generateMetadata({ searchParams }: BlogListProps) {
    const params = await searchParams;
    const search = params.search;

    return {
        title: search ? `Search: "${search}" - Blogs` : "Blog Posts",
        description: search
            ? `Search results for "${search}" in our blog`
            : "Browse all our blog posts",
    };
}
