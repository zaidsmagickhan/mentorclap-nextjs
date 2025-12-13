// app/page.tsx
import Link from "next/link";

export default async function HomePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <section className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6">
                    Welcome to mentorclap
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    A modern blog built with Next.js featuring Server-Side
                    Rendering for optimal performance and SEO.
                </p>
                <Link
                    href="/blogs"
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    View All Posts
                </Link>
            </section>
        </div>
    );
}
