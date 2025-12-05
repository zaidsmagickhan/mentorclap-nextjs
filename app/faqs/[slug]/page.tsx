import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiGet } from "@/lib/api/ApiService";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";
import YouTubeEmbed from "@/component/shared/YouTubeEmbed";
import ShareMenu from "@/component/shared/SharedMenu";

// Types
interface Article {
    id: number;
    slug: string;
    title: string;
    content: string;
    category: "student" | "teacher" | "general";
    created_at: string;
    updated_at: string;
    video_id?: string;
    view_count?: number;
    reading_time?: number;
}

interface ArticleDetailProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: ArticleDetailProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const article: Article = await apiGet(`/api/blog/articles/${slug}/`);

        const description =
            article.content.replace(/<[^>]*>/g, "").substring(0, 160) + "...";
        const categoryName =
            article.category === "student"
                ? "Student"
                : article.category === "teacher"
                ? "Tutor"
                : "General";

        return {
            title: `${article.title} | FAQ - MentorClap`,
            description,
            keywords: `FAQ, ${categoryName}, questions, help, ${article.title}`,
            authors: [{ name: "MentorClap Support" }],
            openGraph: {
                title: article.title,
                description,
                type: "article",
                publishedTime: article.created_at,
                modifiedTime: article.updated_at,
                tags: ["FAQ", categoryName, "Education"],
            },
            twitter: {
                card: "summary_large_image",
                title: article.title,
                description,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        return {
            title: "FAQ Not Found",
            description: "The requested FAQ could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

// Generate static paths for better performance
export async function generateStaticParams() {
    try {
        const response = await apiGet("/api/blog/articles/");
        const articles: Article[] = response.results || [];

        return articles.map((article) => ({
            slug: article.slug,
        }));
    } catch (error) {
        return [];
    }
}

// Server Component - Article Detail
export default async function ArticleDetail({ params }: ArticleDetailProps) {
    const { slug } = await params;

    let article: Article | null = null;

    try {
        article = await apiGet(`/api/blog/articles/${slug}/`);
    } catch (error) {
        console.error("Error fetching article:", error);
        notFound();
    }

    if (!article) {
        notFound();
    }

    // Construct full URL for sharing
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shareUrl = `${baseUrl}/faqs/${article.slug}`;
    const shareTitle = article.title;

    // Calculate reading time if not provided
    const readingTime =
        article.reading_time ||
        Math.ceil(
            article.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200
        );

    // Category styling
    const categoryColors = {
        student: "bg-blue-100 text-blue-800 border-blue-200",
        teacher: "bg-purple-100 text-purple-800 border-purple-200",
        general: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const categoryLabels = {
        student: "Student FAQ",
        teacher: "Tutor FAQ",
        general: "General FAQ",
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Back Button and Share Menu */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <Link
                    href="/faqs"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-lg font-medium">Back to FAQs</span>
                </Link>

                <ShareMenu
                    url={shareUrl}
                    title={shareTitle}
                    type="faq"
                    variant="default"
                />
            </div>

            {/* Article Content */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6 md:p-8">
                    {/* Category Badge */}
                    <div className="mb-4">
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border ${
                                categoryColors[article.category]
                            }`}
                        >
                            {categoryLabels[article.category]}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                                Posted:{" "}
                                {new Date(
                                    article.created_at
                                ).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{readingTime} min read</span>
                        </div>

                        {article.view_count !== undefined && (
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>
                                    {article.view_count.toLocaleString()} views
                                </span>
                            </div>
                        )}

                        {article.updated_at !== article.created_at && (
                            <div className="text-gray-500 text-sm">
                                Updated:{" "}
                                {new Date(
                                    article.updated_at
                                ).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </div>
                        )}
                    </div>

                    {/* Article Content */}
                    <div
                        className="prose prose-lg max-w-none 
                      prose-headings:text-gray-900
                      prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-gray-700 prose-p:leading-relaxed
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-em:text-gray-700
                      prose-blockquote:border-blue-500 prose-blockquote:border-l-4
                      prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4
                      prose-blockquote:text-gray-700 prose-blockquote:italic
                      prose-ul:text-gray-700 prose-ol:text-gray-700
                      prose-li:text-gray-700 prose-li:my-1
                      prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium
                      hover:prose-a:text-blue-800
                      prose-table:border prose-table:border-gray-300
                      prose-th:bg-gray-100 prose-th:text-gray-900 prose-th:p-3
                      prose-td:p-3 prose-td:border-t prose-td:border-gray-300
                      prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* YouTube Video Embed */}
                    {article.video_id && (
                        <div className="mt-10">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Video Explanation
                                </h3>
                                <p className="text-gray-600">
                                    Watch a video tutorial related to this FAQ
                                </p>
                            </div>
                            <YouTubeEmbed videoId={article.video_id} />
                        </div>
                    )}

                    {/* Share Section */}
                    <div className="mt-10 pt-8 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Was this helpful?
                                </h3>
                                <p className="text-gray-600">
                                    Share this FAQ with others who might need it
                                </p>
                            </div>
                            <ShareMenu
                                url={shareUrl}
                                title={shareTitle}
                                type="faq"
                                variant="mobile"
                            />
                        </div>
                    </div>
                </div>
            </article>

            {/* Related FAQs Section */}
            <RelatedFAQs
                currentSlug={article.slug}
                category={article.category}
            />
        </div>
    );
}

// Related FAQs Component
async function RelatedFAQs({
    currentSlug,
    category,
}: {
    currentSlug: string;
    category: string;
}) {
    try {
        const response = await apiGet(
            `/api/blog/articles/?category=${category}&page=1&page_size=3`
        );
        const relatedArticles = response.results
            ?.filter((article: any) => article.slug !== currentSlug)
            .slice(0, 2);

        if (!relatedArticles?.length) return null;

        return (
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Related FAQs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedArticles.map((article: any) => (
                        <Link
                            key={article.id}
                            href={`/faqs/${article.slug}`}
                            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {article.content
                                    .replace(/<[^>]*>/g, "")
                                    .substring(0, 100)}
                                ...
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>
                                    {new Date(
                                        article.created_at
                                    ).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                                <span className="text-blue-600 font-medium">
                                    Read →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        return null;
    }
}
