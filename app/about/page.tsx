import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About MentorClap - MentorClap",
    description:
        "Discover how MentorClap connects students with expert tutors using AI-driven matching. Learn about our mission, unique features, and how we make learning accessible and personalized for everyone.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 to-white text-left">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                        Transform Learning with MentorClap
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the perfect tutor match through intelligent AI
                        technology
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6">
                        About MentorClap
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        At MentorClap, we're redefining how students connect
                        with exceptional educators. Our cutting-edge AI matching
                        system pairs learners with verified expert tutors,
                        creating personalized educational experiences that drive
                        real results across all subjects and skill levels.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                alt="Students learning"
                                className="rounded-lg shadow-md w-full h-auto"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                                Why Choose MentorClap?
                            </h3>

                            <div className="space-y-4 text-left">
                                <div className="flex items-start">
                                    <div className="shrink-0 mt-1">
                                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800">
                                            ✓
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-lg font-medium text-gray-800">
                                            Smart AI-Powered Matching
                                        </p>
                                        <p className="text-gray-600">
                                            Our advanced algorithm analyzes
                                            learning styles, academic goals, and
                                            subject requirements to connect you
                                            with the ideal tutor.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="shrink-0 mt-1">
                                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800">
                                            ✓
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-lg font-medium text-gray-800">
                                            Rigorously Verified Educators
                                        </p>
                                        <p className="text-gray-600">
                                            Every tutor undergoes comprehensive
                                            screening and verification to
                                            guarantee top-tier educational
                                            support.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="shrink-0 mt-1">
                                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800">
                                            ✓
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-lg font-medium text-gray-800">
                                            Transparent, Budget-Friendly Pricing
                                        </p>
                                        <p className="text-gray-600">
                                            Quality education shouldn't break
                                            the bank. Our pricing model makes
                                            expert tutoring accessible.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="shrink-0 mt-1">
                                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800">
                                            ✓
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-lg font-medium text-gray-800">
                                            Premium Priority Access
                                        </p>
                                        <p className="text-gray-600">
                                            Upgrade to premium for expedited
                                            tutor matching and exclusive
                                            benefits.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">
                        How Tutors Thrive on MentorClap
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Simple. Efficient. Rewarding.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-blue-800 text-2xl font-bold">
                                1
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-center text-blue-700 mb-3">
                            Create Your Professional Profile
                        </h3>
                        <p className="text-gray-600 text-center">
                            Showcase your expertise, qualifications, and
                            teaching approach
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-blue-800 text-2xl font-bold">
                                2
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-center text-blue-700 mb-3">
                            Receive Targeted Student Matches
                        </h3>
                        <p className="text-gray-600 text-center">
                            Get inquiries that align perfectly with your subject
                            specialties
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-blue-800 text-2xl font-bold">
                                3
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold text-center text-blue-700 mb-3">
                            Connect and Start Teaching
                        </h3>
                        <p className="text-gray-600 text-center">
                            Use our innovative coin-based system to unlock
                            student details
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-blue-800 rounded-xl text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-xl mb-8 max-w-4xl mx-auto">
                        Making exceptional education accessible to all
                    </p>
                    <p className="text-lg mb-8 max-w-3xl mx-auto">
                        We envision a world where every student can access
                        high-quality, personalized education. By bridging the
                        gap between passionate learners and expert educators,
                        MentorClap is building the future of smart educational
                        connections.
                    </p>
                    <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition-colors">
                        Join MentorClap Today
                    </button>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-blue-800 mb-6">
                    Ready to revolutionize your learning journey?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Join thousands of students and tutors who've already
                    discovered the MentorClap advantage.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/student-register">
                        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full transition-colors">
                            Find a Tutor
                        </button>
                    </Link>
                    <Link href="/teacher-register">
                        <button className="bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-colors">
                            Become a Tutor
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
