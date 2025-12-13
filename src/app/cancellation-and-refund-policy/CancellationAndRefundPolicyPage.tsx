const CancellationRefundPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-blue-800 p-6 md:p-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Cancellation and Refund Policy
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
                            Welcome to MentorClap
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Welcome to MentorClap.com ("MentorClap", "we",
                            "our", or "us"). This Cancellation and Refund Policy
                            governs the purchase and use of Coins by Tutors
                            ("you", "your") on MentorClap.com.
                        </p>
                        <p className="text-gray-700">
                            By purchasing Coins or using the MentorClap
                            platform, you agree to this Cancellation and Refund
                            Policy.
                        </p>
                    </section>

                    {/* Overview */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Overview
                        </h2>
                        <p className="text-gray-700 mb-4">
                            This Cancellation and Refund Policy ("Policy")
                            outlines the procedures for handling cancellations,
                            refunds, and coin validity on the MentorClap
                            platform. By purchasing Coins or accessing our
                            services, Tutors agree to the terms outlined in this
                            Policy.
                        </p>
                        <p className="text-gray-700">
                            Coins are virtual credits purchased by Tutors to
                            unlock and connect with student inquiries on
                            MentorClap.com. All Coin purchases are governed by
                            the terms stated herein.
                        </p>
                    </section>

                    {/* Coin Purchase Policy */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Coin Purchase Policy and Subscription Validity
                        </h2>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                            <p className="font-semibold text-red-800">
                                All Coin purchases made through MentorClap.com
                                are final and non-refundable, except under
                                specific conditions outlined in this Policy.
                            </p>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Coins are non-refundable and non-transferable,
                            except under the circumstances described in this
                            Policy.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Coins are non-transferable and can only be used
                            within the MentorClap platform.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Coins that expire based on the Tutor's subscription
                            plan are associated with a validity period based on
                            the selected plan:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-700">
                                    3-Month Plan:
                                </h3>
                                <p className="text-gray-700">
                                    Coins expire after 90 days.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-700">
                                    6-Month Plan:
                                </h3>
                                <p className="text-gray-700">
                                    Coins expire after 180 days.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-700">
                                    1-Year Plan:
                                </h3>
                                <p className="text-gray-700">
                                    Coins expire after 365 days.
                                </p>
                            </div>
                        </div>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <p className="text-gray-700">
                                Expired Coins cannot be reinstated, refunded, or
                                extended.
                            </p>
                        </div>
                    </section>

                    {/* Refund Eligibility */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Refund Eligibility
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Refunds may be considered only in the following
                            exceptional situations:
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="shrink-0 mt-1">
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-bold">
                                        1
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-800">
                                        Technical Error
                                    </p>
                                    <p className="text-gray-700">
                                        If a transaction is duplicated or Coins
                                        are deducted incorrectly due to a
                                        verified technical issue on MentorClap's
                                        platform.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="shrink-0 mt-1">
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-bold">
                                        2
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-800">
                                        Service Unavailability
                                    </p>
                                    <p className="text-gray-700">
                                        If a Tutor unlocks a student inquiry but
                                        cannot access the student's information
                                        due to a platform error, and the issue
                                        is verified, the Tutor will be notified.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="shrink-0 mt-1">
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-bold">
                                        3
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-800">
                                        Unauthorized Activity
                                    </p>
                                    <p className="text-gray-700">
                                        If Coins are deducted due to
                                        unauthorized access to the Tutor's
                                        account, subject to internal
                                        investigation and verification.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                            <p className="text-gray-700">
                                Meeting these conditions does not guarantee a
                                refund. All claims are subject to internal
                                review and evaluation.
                            </p>
                        </div>
                    </section>

                    {/* Non-Refundable Situations */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Non-Refundable Situations
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Refunds will not be provided in the following cases:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>
                                The Student does not respond after unlocking.
                            </li>
                            <li>
                                The Tutor decides not to pursue the inquiry
                                after unlocking.
                            </li>
                            <li>
                                Tutor dissatisfaction with the number or quality
                                of inquiries.
                            </li>
                            <li>Coin expiry due to inactivity.</li>
                            <li>
                                Tutor voluntarily deletes or deactivates their
                                account.
                            </li>
                            <li>
                                If a Tutor unlocks an inquiry, but the Student
                                does not respond.
                            </li>
                            <li>
                                If a Tutor voluntarily decides not to pursue the
                                Student after unlocking.
                            </li>
                            <li>
                                If a Tutor is dissatisfied with the number,
                                type, or quality of inquiries.
                            </li>
                            <li>
                                If Coins expire due to the Tutor not using them
                                within the plan's validity period.
                            </li>
                            <li>
                                Upon voluntary cancellation or termination of a
                                Tutor account by the user.
                            </li>
                        </ul>
                    </section>

                    {/* Refund Process */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Refund Request Procedure
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-700 mb-2">
                                    Refund requests must be submitted within 7
                                    days of the original transaction.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    To request a refund, send an email to
                                    support@mentorclap.com with:
                                </p>
                                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                    <li>Transaction details</li>
                                    <li>
                                        Specific reason for the refund request
                                    </li>
                                    <li>
                                        Any supporting evidence (such as
                                        screenshots or error messages)
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                    MentorClap will:
                                </h3>
                                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                    <li>
                                        Acknowledge your request within 2
                                        business days
                                    </li>
                                    <li>
                                        Conclude the review within 10 business
                                        days
                                    </li>
                                    <li>
                                        Process approved refunds within 7
                                        business days via:
                                        <ul className="list-disc ml-6 mt-1">
                                            <li>Original payment method, or</li>
                                            <li>
                                                Credit as Coins (at our
                                                discretion)
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-gray-700">
                                    MentorClap will review the request and
                                    provide a decision within 10 business days.
                                    Approved refunds will either:
                                </p>
                                <ul className="list-disc ml-6 mt-1 text-gray-700">
                                    <li>
                                        Be processed back to the original
                                        payment method, or
                                    </li>
                                    <li>
                                        Be credited as MentorClap Coins, at
                                        MentorClap's sole discretion.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Abuse and Fraud */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Abuse and Fraud Prevention
                        </h2>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4">
                            <p className="text-gray-700">
                                If any misuse, abuse, or fraudulent behaviour
                                related to Coin usage or refund requests is
                                detected, MentorClap reserves the right to:
                            </p>
                            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
                                <li>Reject the refund request.</li>
                                <li>Forfeit any remaining Coins.</li>
                                <li>
                                    Suspend or terminate the Tutor's account
                                    without prior notice.
                                </li>
                                <li>Block access to future services</li>
                            </ul>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Limitation of Liability
                        </h2>
                        <p className="text-gray-700">
                            MentorClap's total liability, under any
                            circumstance, will not exceed the actual amount paid
                            for the Coins involved in the disputed transaction.
                        </p>
                    </section>

                    {/* Data Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Data Privacy
                        </h2>
                        <p className="text-gray-700">
                            Any personal information submitted during the refund
                            process will be handled following our Privacy
                            Policy. No information will be shared with third
                            parties without your consent, unless legally
                            required.
                        </p>
                    </section>

                    {/* Policy Updates */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Policy Updates
                        </h2>
                        <p className="text-gray-700 mb-2">
                            MentorClap reserves the right to amend this Policy
                            at any time without prior notice. Changes will be
                            effective once published on the website. Your
                            continued use of the Platform constitutes acceptance
                            of the updated Policy.
                        </p>
                        <p className="text-gray-700">
                            MentorClap reserves the right to modify or update
                            this Cancellation and Refund Policy at any time
                            without prior notice. Changes will be effective
                            immediately upon posting on MentorClap.com.
                            Continued use of the platform after changes
                            indicates acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                            Contact Information
                        </h2>
                        <p className="text-gray-700">
                            For any questions about this Cancellation and Refund
                            Policy, please contact us at:
                        </p>
                        <p className="text-gray-700 mt-2">
                            Email:{" "}
                            <a
                                href="mailto:support@mentorclap.com"
                                className="text-blue-600 hover:underline"
                            >
                                📧 support@mentorclap.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CancellationRefundPolicyPage;
