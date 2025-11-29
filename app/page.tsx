// app/page.tsx
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog-data';

export default async function HomePage() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Welcome to My Blog</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A modern blog built with Next.js featuring Server-Side Rendering for optimal performance and SEO.
        </p>
        <Link
          href="/blog"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Posts
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}