// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '@/lib/blog-data';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

// This page uses SSR by default
export default async function BlogPostPage(props: BlogPostPageProps) {
    // Await the params promise first
    const params = await props.params;
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                ← Back to Blog
            </Link>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                    />
                )}

                <div className="p-8">
                    <header className="mb-6">
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center text-gray-600 text-sm">
                            <span>By {post.author}</span>
                            <span className="mx-2">•</span>
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                    </header>

                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </div>
    );
}

// Generate metadata for SEO
export async function generateMetadata(props: BlogPostPageProps) {
    // Await the params promise first
    const params = await props.params;
    const post = await getBlogPost(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author],
        },
    };
}

// Generate static paths for SSG (optional - for better performance)
export async function generateStaticParams() {
    const posts = await getBlogPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}