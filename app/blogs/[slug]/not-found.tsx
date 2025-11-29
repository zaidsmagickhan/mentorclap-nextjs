import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Blog Post Not Found
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                    The blog post you're looking for doesn't exist or may have
                    been moved.
                </p>
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blogs
                </Link>
            </div>
        </div>
    );
}
