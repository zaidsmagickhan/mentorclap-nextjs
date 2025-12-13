import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function FAQNotFound() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HelpCircle className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    FAQ Not Found
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                    The FAQ you're looking for doesn't exist or may have been
                    moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/faqs"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to FAQs
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
