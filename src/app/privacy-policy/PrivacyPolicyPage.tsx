const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-blue-800 p-6 md:p-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Privacy Policy
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-between text-sm md:text-base">
                        <p>
                            <span className="font-semibold">Last Updated:</span>{" "}
                            Aug 10, 2025
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            1. Introduction
                        </h2>
                        <p className="text-gray-700 mb-4">
                            At MentorClap Education Pvt Ltd ("MentorClap," "we,"
                            "us," or "our"), your privacy matters. This Privacy
                            Policy outlines how we collect, use, share, store,
                            and protect your personal information when you
                            access or use our website, mobile applications, and
                            services (collectively, the "Platform").
                        </p>
                        <p className="text-gray-700 mb-4">
                            This Policy is issued in accordance with the
                            Information Technology Act, 2000, and its applicable
                            rules.
                        </p>
                        <p className="text-gray-700">
                            By accessing or using our Platform, you agree to the
                            terms of this Privacy Policy. If you do not agree,
                            please refrain from using the Platform.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            2. What Information We Collect
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We collect two types of information:
                        </p>

                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                A. Personal Information
                            </h3>
                            <p className="text-gray-700 mb-2">
                                This includes data that can identify you as an
                                individual:
                            </p>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                <li>
                                    <span className="font-medium">
                                        Students:
                                    </span>{" "}
                                    Name, email, mobile number, city/location,
                                    learning preferences, and messages or
                                    communication history.
                                </li>
                                <li>
                                    <span className="font-medium">Tutors:</span>{" "}
                                    Name, email, mobile number, academic
                                    qualifications, certifications, profile
                                    picture, ID verification documents.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Payment Data:
                                    </span>{" "}
                                    Transaction history collected via secure
                                    third-party payment gateways.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Communication Data:
                                    </span>{" "}
                                    Messages, emails, support tickets, and
                                    feedback shared with us.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                B. Non-Personal Information
                            </h3>
                            <p className="text-gray-700 mb-2">
                                This is information that doesn't directly
                                identify you but helps us improve your
                                experience:
                            </p>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                <li>
                                    <span className="font-medium">
                                        Technical Data:
                                    </span>{" "}
                                    Device type, browser version, IP address,
                                    operating system, and mobile network
                                    details.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Usage Data:
                                    </span>{" "}
                                    Pages visited, time spent on features,
                                    actions performed, click paths, etc.
                                </li>
                                <li>
                                    <span className="font-medium">
                                        Cookies and Similar Technologies:
                                    </span>{" "}
                                    Used to personalize content, remember
                                    preferences, and track analytics. You can
                                    manage cookie preferences via browser
                                    settings.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            3. How We Use Your Information
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We collect and use your information for purposes
                            such as:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>
                                Delivering our AI-powered tutor-student matching
                                services
                            </li>
                            <li>
                                Setting up and managing your account securely
                            </li>
                            <li>
                                Verifying Tutor identities and Student requests
                            </li>
                            <li>
                                Sending updates, service-related messages, and
                                occasional marketing communications
                            </li>
                            <li>Facilitating payments and transactions</li>
                            <li>
                                Analyzing user behavior to improve performance,
                                interface, and content
                            </li>
                            <li>
                                Enforcing our Terms of Use and fulfilling legal
                                obligations
                            </li>
                        </ul>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                            <p className="font-semibold text-blue-800">
                                We do not sell your personal data.
                            </p>
                        </div>
                    </section>

                    {/* Who We Share Your Information With */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            4. Who We Share Your Information With
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We share your information only with trusted third
                            parties and only when necessary:
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                    a. Service Providers
                                </h3>
                                <p className="text-gray-700 mb-2">
                                    We work with third-party vendors to support
                                    operations such as:
                                </p>
                                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                    <li>Payment processing</li>
                                    <li>Analytics (e.g., Google Analytics)</li>
                                    <li>Hosting and security</li>
                                </ul>
                                <p className="text-gray-700 mt-2">
                                    These providers are contractually bound to:
                                </p>
                                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                    <li>
                                        Use your data only to perform services
                                        on our behalf
                                    </li>
                                    <li>
                                        Follow strict data protection standards
                                    </li>
                                    <li>Never sell or misuse your data</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                    b. Legal Requirements
                                </h3>
                                <p className="text-gray-700">
                                    We may disclose information if required to:
                                </p>
                                <ul className="list-disc ml-6 text-gray-700 space-y-1 mt-2">
                                    <li>Comply with legal obligations</li>
                                    <li>
                                        Respond to legal processes or enforce
                                        rights
                                    </li>
                                    <li>Prevent fraud, abuse, or harm</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                    c. Business Transfers
                                </h3>
                                <p className="text-gray-700">
                                    If we are involved in a merger, acquisition,
                                    or asset sale, your data may be transferred
                                    to the successor entity with appropriate
                                    safeguards.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                    d. Aggregated or Anonymized Data
                                </h3>
                                <p className="text-gray-700">
                                    We may share de-identified statistics or
                                    usage trends (e.g., "40% of students prefer
                                    science tutors") for marketing or research
                                    purposes. These do not identify you
                                    personally.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            5. Data Security
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We use a range of industry-standard technical and
                            organizational security measures to protect your
                            data. These include:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>SSL encryption for all data transmission</li>
                            <li>Secure server infrastructure</li>
                            <li>Access control and role-based data access</li>
                            <li>Regular security audits and system updates</li>
                            <li>Data minimization practices</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Despite our efforts, no digital platform is entirely
                            immune to threats. If we detect a data breach, we
                            will notify affected Users within 72 hours via email
                            and/or platform notification, including steps you
                            can take to protect yourself.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            6. Data Retention
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We retain your personal information:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>For as long as you have an active account</li>
                            <li>
                                Up to 24 months after account deactivation or
                                last interaction, for audit, compliance, and
                                service continuity
                            </li>
                            <li>
                                Longer where legally required (e.g., for tax,
                                legal, or security reasons)
                            </li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            After this period, your data is securely deleted or
                            anonymized.
                        </p>
                    </section>

                    {/* Your Rights and Choices */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            7. Your Rights and Choices
                        </h2>
                        <p className="text-gray-700 mb-4">
                            You have control over your data:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-700 mb-2">
                                    Access & Correction
                                </h3>
                                <p className="text-gray-700">
                                    You can view and update your account info at
                                    any time.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-700 mb-2">
                                    Delete Your Data
                                </h3>
                                <p className="text-gray-700">
                                    You may request deletion of your account and
                                    data by emailing us at
                                    support@mentorclap.com. We'll honor requests
                                    unless legal obligations require retention.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-700 mb-2">
                                    Opt-Out of Emails
                                </h3>
                                <p className="text-gray-700">
                                    You can unsubscribe from non-essential
                                    communications via the link in our emails.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-700 mb-2">
                                    Cookies
                                </h3>
                                <p className="text-gray-700">
                                    Control or delete cookies from your browser
                                    settings.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            8. Children's Privacy
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Our services are not directed at children under 18.
                            If you are under 18, you must use the Platform only
                            under the supervision of a parent or legal guardian.
                        </p>
                        <p className="text-gray-700">
                            We do not knowingly collect data from minors. If we
                            learn that a child has provided us personal data
                            without supervision, we will take steps to delete
                            it.
                        </p>
                    </section>

                    {/* International Users */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            9. International Users
                        </h2>
                        <p className="text-gray-700">
                            Although we primarily operate in India, by using our
                            Platform, you understand that your data may be
                            transferred, processed, or stored outside your
                            country under lawful protections.
                        </p>
                    </section>

                    {/* Changes to This Privacy Policy */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            10. Changes to This Privacy Policy
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We may update this Privacy Policy from time to time.
                            Updates will be posted with the "Last Updated" date
                            at the top of this page.
                        </p>
                        <p className="text-gray-700">
                            If changes are significant, we'll notify you via
                            email or in-app alerts. Continued use of the
                            Platform after changes means you accept the updated
                            Policy.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            11. Contact Us
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Have questions, requests, or concerns about your
                            privacy?
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                <span className="font-medium">📧 Email:</span>{" "}
                                <a
                                    href="mailto:support@mentorclap.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    support@mentorclap.com
                                </a>
                            </p>
                            <p className="text-gray-700 mt-2">
                                <span className="font-medium">🏢 Address:</span>{" "}
                                Bangalore, Karnataka
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
