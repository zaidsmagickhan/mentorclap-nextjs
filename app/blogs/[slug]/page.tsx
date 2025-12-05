import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api/ApiService";
import { ArrowLeft } from "lucide-react";
import ShareMenu from "@/component/shared/SharedMenu";

// Types
interface Blog {
    id: number;
    slug: string;
    tags: string[];
    title: string;
    content: string;
    featured_image: string | null;
    created_at: string;
    author: {
        username: string;
        first_name?: string;
        last_name?: string;
    };
    excerpt?: string;
}

interface BlogDetailProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: BlogDetailProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const blog: Blog = await apiGet(`/api/blog/blogs/${slug}/`);

        return {
            title: `${blog.title} | MentorClap Blog`,
            description: blog.excerpt || blog.content.substring(0, 160) + "...",
            keywords: blog.tags?.join(", ") || "education, tutoring, learning",
            authors: [{ name: blog.author.username }],
            openGraph: {
                title: blog.title,
                description:
                    blog.excerpt || blog.content.substring(0, 160) + "...",
                type: "article",
                publishedTime: blog.created_at,
                authors: [blog.author.username],
                images: blog.featured_image ? [blog.featured_image] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: blog.title,
                description:
                    blog.excerpt || blog.content.substring(0, 160) + "...",
                images: blog.featured_image ? [blog.featured_image] : [],
            },
        };
    } catch (error) {
        return {
            title: "Blog Post Not Found",
            description: "The requested blog post could not be found.",
        };
    }
}

// Generate static paths for better performance (optional)
export async function generateStaticParams() {
    try {
        const response = await apiGet("/api/blog/blogs/");
        const blogs: Blog[] = response.results || [];

        return blogs.map((blog) => ({
            slug: blog.slug,
        }));
    } catch (error) {
        return [];
    }
}

// Server Component - This runs on the server
export default async function BlogDetail({ params }: BlogDetailProps) {
    const { slug } = await params;

    let blog: Blog | null = null;

    try {
        blog = await apiGet(`/api/blog/blogs/${slug}/`);
    } catch (error) {
        console.error("Error fetching blog:", error);
        notFound();
    }

    if (!blog) {
        notFound();
    }

    // Construct full URL for sharing
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shareUrl = `${baseUrl}/blogs/${blog.slug}`;
    const shareTitle = blog.title;
    const shareImage = blog.featured_image;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Back Button */}
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/blogs"
                    className="flex items-center gap-2 hover:text-blue-500 transition-colors group"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-500 transition-colors" />
                    <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-500">
                        Back to blogs
                    </span>
                </Link>

                {/* Share Button */}
                <ShareMenu
                    url={shareUrl}
                    title={shareTitle}
                    type="blog"
                    variant="default" // or whatever variant you need
                />
            </div>

            {/* Blog Content */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                {blog.featured_image && (
                    <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-64 md:h-96 object-cover"
                    />
                )}

                <div className="p-6 md:p-8 text-left">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">
                        {blog.title}
                    </h1>

                    {/* Blog Meta Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-800">
                                    By{" "}
                                    {blog.author.first_name &&
                                    blog.author.last_name
                                        ? `${blog.author.first_name} ${blog.author.last_name}`
                                        : blog.author.username}
                                </span>
                                <span className="mx-2">•</span>
                                <span>
                                    {new Date(
                                        blog.created_at
                                    ).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Share button for mobile */}
                        <div className="sm:hidden">
                            <ShareMenu
                                url={shareUrl}
                                title={shareTitle}
                                type="blog"
                                variant="mobile" // or whatever variant you need
                            />
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div
                        className="prose prose-lg max-w-none
                      prose-headings:text-gray-900
                      prose-p:text-gray-700
                      prose-strong:text-gray-900
                      prose-em:text-gray-700
                      prose-blockquote:border-blue-500
                      prose-blockquote:bg-blue-50
                      prose-blockquote:text-gray-700
                      prose-ul:text-gray-700
                      prose-ol:text-gray-700
                      prose-li:text-gray-700
                      prose-a:text-blue-600
                      prose-a:no-underline
                      hover:prose-a:text-blue-800
                      prose-img:rounded-lg
                      prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>

            {/* Bottom Share Section */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                    Found this article helpful? Share it!
                </p>
                <ShareMenu
                    url={shareUrl}
                    title={shareTitle}
                    type="blog"
                    variant="large" // or whatever variant you need
                />
            </div>
        </div>
    );
}
