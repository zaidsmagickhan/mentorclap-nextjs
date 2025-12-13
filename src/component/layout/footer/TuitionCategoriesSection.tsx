import Link from "next/link";

interface TuitionCategoriesSectionProps {
    isAuthenticated: boolean;
}

const TuitionCategoriesSection = ({
    isAuthenticated,
}: TuitionCategoriesSectionProps) => {
    if (isAuthenticated) {
        return null; // Don't show this section to authenticated users
    }

    return (
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Explore More Tuition Categories
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* School Tuitions */}
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-700 mb-3">
                            School Tuitions
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 12 Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 11 Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 10 Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 9 Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 8 Tuition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Junior School */}
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-700 mb-3">
                            Junior School
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 7 Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 6 Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Class 1-5 Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Nursery-KG Tuition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* College Tuitions */}
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-700 mb-3">
                            College Tuitions
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    BTech Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    BCom Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Engineering Diploma
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    BBA Tuition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    BSc Tuition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Subjects */}
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-700 mb-3">
                            Subjects
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Mathematics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    English
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Science
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Physics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Hindi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* More Options */}
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg text-gray-700 mb-3">
                            More Options
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    All Tuitions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    Online Tuitions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    NCERT Solutions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-register"
                                    className="text-blue-600 hover:underline"
                                >
                                    CBSE Syllabus
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/student-register"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        Register Now to Find Tutors
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TuitionCategoriesSection;
