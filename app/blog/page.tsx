// app/blog/page.tsx
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog-data';

// This page uses SSR by default in Next.js App Router
export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {post.imageUrl && (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-3">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>By {post.author}</span>
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </time>
                            </div>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Read More
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            {posts.length === 0 && (
                <p className="text-center text-gray-500">No blog posts found.</p>
            )}
        </div>
    );
}

// Optional: Generate metadata for the page
export async function generateMetadata() {
    return {
        title: 'Blog Posts',
        description: 'Read our latest blog posts about web development and Next.js',
    };
}