const TermsOfUsePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-blue-800 p-6 md:p-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Terms of Use
                    </h1>
                    <p className="text-sm md:text-base">
                        <span className="font-semibold">Last Updated:</span> Aug
                        10, 2025
                    </p>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Introduction
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Welcome to the MentorClap Education Pvt Ltd website
                            and associated services (collectively, the
                            “Platform”). MentorClap Education Pvt Ltd
                            (“MentorClap”, “we”, “us” or “our”) operates a
                            platform that connects students with verified tutors
                            through an AI-powered matching system. By accessing
                            or using the Platform—whether via our website,
                            mobile applications, or any other related
                            service—you agree to be bound by these Terms of Use
                            (“Terms”). If you do not agree to these Terms,
                            please do not use the Platform.
                        </p>
                    </section>

                    {/* Definitions */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Definitions
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                [
                                    "User",
                                    "Any person who accesses or uses the Platform, including both Students and Tutors.",
                                ],
                                [
                                    "Student",
                                    "A User who registers on the Platform to seek tutoring services.",
                                ],
                                [
                                    "Tutor",
                                    "A User who registers on the Platform to provide tutoring services and is verified by MentorClap.",
                                ],
                                [
                                    "Premium Student",
                                    "A Student who, by opting for our premium service, receives priority matching with Tutors.",
                                ],
                                [
                                    "Coins",
                                    "The Platform-specific virtual currency that Tutors use to unlock Student contact details and respond to inquiries.",
                                ],
                                [
                                    "Content",
                                    "All text, images, videos, and other materials made available on the Platform.",
                                ],
                                [
                                    "Services",
                                    "The tutoring matching, communication, and related services provided by MentorClap through the Platform.",
                                ],
                            ].map(([title, desc]) => (
                                <div
                                    key={title}
                                    className="bg-blue-50 p-4 rounded-lg"
                                >
                                    <h3 className="font-semibold text-blue-700">
                                        {title}:
                                    </h3>
                                    <p className="text-gray-700">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Eligibility */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Eligibility and Account Registration
                        </h2>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>
                                Users must be at least 18 years old. If under
                                18, use is only permitted under the supervision
                                of a parent or legal guardian, who must also
                                agree to these Terms.
                            </li>
                            <li>
                                Users agree to provide accurate, complete
                                information and to update it when necessary.
                            </li>
                            <li>
                                Users are responsible for protecting their login
                                credentials.
                            </li>
                            <li>
                                MentorClap reserves the right to suspend or
                                terminate accounts in violation of these Terms
                                or due to suspicious activity.
                            </li>
                        </ul>
                    </section>

                    {/* Platform Role */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Platform Role and Limitations
                        </h2>
                        <p className="text-gray-700 mb-4">
                            MentorClap serves only as an intermediary connecting
                            Students and Tutors. We do not employ Tutors or
                            guarantee outcomes. We are not responsible for the
                            accuracy of content, qualifications, or conduct of
                            any User.
                        </p>
                    </section>

                    {/* Use of the Platform */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Use of the Platform
                        </h2>
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                For Students:
                            </h3>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                <li>
                                    Post tutoring requirements specifying
                                    subjects, grade levels, and preferences.
                                </li>
                                <li>
                                    Premium Students, upon subscribing, will
                                    receive expedited matching with Tutors.
                                </li>
                                <li>
                                    Verify the credentials and suitability of
                                    Tutors before engaging in any tutoring
                                    sessions.
                                </li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                For Tutors:
                            </h3>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                <li>
                                    Complete a verification process to ensure
                                    quality and reliability.
                                </li>
                                <li>
                                    Browse Student inquiries that match
                                    expertise and respond via the coin-based
                                    system.
                                </li>
                                <li>
                                    Use the Platform solely to connect with
                                    potential students and do not share
                                    students' contact details outside the
                                    Platform.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Coin System */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            The Coin-Based System
                        </h2>
                        <p className="text-gray-700">
                            Tutors purchase or earn Coins to unlock Student
                            contact details. All payments must be made through
                            MentorClap’s official channels. Off-platform
                            payments are not recognized. MentorClap may retain
                            service/processing fees. Tutors are responsible for
                            applicable taxes.
                        </p>
                    </section>

                    {/* Confidentiality */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Confidentiality and Privacy
                        </h2>
                        <p className="text-gray-700">
                            Tutors must keep Student information strictly
                            confidential. Sharing, storing, or using Student
                            data outside the Platform is prohibited. Data is
                            handled per our Privacy Policy.
                        </p>
                    </section>

                    {/* Session Policy */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Session Conduct and No-Show Policy
                        </h2>
                        <p className="text-gray-700">
                            At least 24 hours’ notice is required to cancel a
                            scheduled session. Repeated last-minute
                            cancellations or no-shows may result in suspension
                            or loss of session credit.
                        </p>
                    </section>

                    {/* Prohibited Conduct */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Prohibited Conduct
                        </h2>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>
                                Use the Platform for illegal or unauthorized
                                purposes.
                            </li>
                            <li>Misrepresent identity or affiliation.</li>
                            <li>
                                Post defamatory, offensive, or infringing
                                content.
                            </li>
                            <li>
                                Attempt to disrupt or compromise Platform
                                security.
                            </li>
                        </ul>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Intellectual Property
                        </h2>
                        <p className="text-gray-700">
                            All content is the property of MentorClap or
                            licensors and is protected by law.
                        </p>
                    </section>

                    {/* Monitoring */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Monitoring and Suspension
                        </h2>
                        <p className="text-gray-700">
                            MentorClap may monitor usage and content for safety
                            and may suspend or delete accounts violating these
                            Terms without notice.
                        </p>
                    </section>

                    {/* Feedback */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Feedback and Suggestions
                        </h2>
                        <p className="text-gray-700">
                            By submitting feedback or suggestions, you grant
                            MentorClap a royalty-free license to use it without
                            obligation.
                        </p>
                    </section>

                    {/* Disclaimers */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Disclaimers and Limitation of Liability
                        </h2>
                        <p className="text-gray-700">
                            The Platform is provided “as is” without warranties.
                            We are not liable for indirect or consequential
                            damages. Our total liability is limited to the
                            amount paid in the 12 months prior to a claim.
                        </p>
                    </section>

                    {/* Indemnification */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Indemnification
                        </h2>
                        <p className="text-gray-700">
                            You agree to indemnify MentorClap and its affiliates
                            from claims, damages, or liabilities arising from
                            your use of the Platform or violation of these
                            Terms.
                        </p>
                    </section>

                    {/* Force Majeure */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Force Majeure
                        </h2>
                        <p className="text-gray-700">
                            We are not liable for delays or service failures
                            caused by events beyond our control, such as natural
                            disasters, cyberattacks, or government actions.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Governing Law and Dispute Resolution
                        </h2>
                        <p className="text-gray-700">
                            Governed by the laws of India. Disputes go to
                            mediation at the Indian Mediation and Conciliation
                            Centre, Delhi. If unresolved in 60 days, disputes
                            proceed to arbitration under the Arbitration and
                            Conciliation Act, 1996.
                        </p>
                    </section>

                    {/* Termination */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Termination
                        </h2>
                        <p className="text-gray-700">
                            MentorClap may suspend or terminate accounts at its
                            discretion. Users may delete accounts anytime. Upon
                            termination, licenses end and no refunds are
                            provided unless in our Refund Policy.
                        </p>
                    </section>

                    {/* Modifications */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Modifications to Terms
                        </h2>
                        <p className="text-gray-700">
                            MentorClap may update these Terms periodically.
                            Continued use after changes means acceptance.
                        </p>
                    </section>

                    {/* Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Privacy
                        </h2>
                        <p className="text-gray-700">
                            Please review our Privacy Policy to understand how
                            we collect, use, and share your information.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Contact Us
                        </h2>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                <span className="font-medium">Email:</span>{" "}
                                support@mentorclap.com
                            </p>
                            <p className="text-gray-700">
                                <span className="font-medium">Address:</span>{" "}
                                Bangalore, Karnataka
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUsePage;
