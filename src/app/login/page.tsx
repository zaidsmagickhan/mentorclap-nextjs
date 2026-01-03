"use client";

import Link from "next/link";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

type LoginMethod = "email" | "phone";
type LoginStep = "initial" | "email-password" | "email-otp" | "phone-otp";

export default function Login() {
    const router = useRouter();
    const { loginUser } = useAuth(); // Assuming you have these functions verifyOTP sendOTP
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
    const [loginStep, setLoginStep] = useState<LoginStep>("initial");
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
        otp: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [countryCode, setCountryCode] = useState("+91"); // Default India

    useEffect(() => {
        document.title = "Login - MentorClap";
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (otpTimer > 0) {
            timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [otpTimer]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCountryCode(e.target.value);
    };

    const isEmail = (input: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };

    const isPhone = (input: string): boolean => {
        const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone numbers
        return phoneRegex.test(input);
    };

    const handleInitialSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const identifier = formData.email || formData.phone;

        if (!identifier) {
            enqueueSnackbar("Please enter email or phone number", {
                variant: "info",
            });
            return;
        }

        if (isEmail(identifier)) {
            setLoginMethod("email");
            setFormData({ ...formData, email: identifier });
            setLoginStep("email-password");
        } else if (isPhone(identifier)) {
            setLoginMethod("phone");
            setFormData({ ...formData, phone: identifier });
            setLoginStep("phone-otp");
        } else {
            enqueueSnackbar(
                "Please enter a valid email or 10-digit phone number",
                { variant: "info" }
            );
        }
    };

    // const handleSendOTP = async () => {
    //     try {
    //         setLoading(true);
    //         let identifier = "";

    //         if (loginMethod === "email") {
    //             identifier = formData.email;
    //             setLoginStep("email-otp");
    //         } else {
    //             identifier = `${countryCode}${formData.phone}`;
    //         }

    //         // Call your sendOTP function from AuthContext
    //         const result = await sendOTP(identifier);

    //         if (result.success) {
    //             setOtpSent(true);
    //             setOtpTimer(60); // 60 seconds timer
    //             enqueueSnackbar("OTP sent successfully", {
    //                 variant: "success",
    //             });
    //         } else {
    //             enqueueSnackbar(result.error || "Failed to send OTP", {
    //                 variant: "error",
    //             });
    //         }
    //     } catch (error) {
    //         enqueueSnackbar("Failed to send OTP. Please try again.", {
    //             variant: "error",
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleEmailPasswordLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // let emailToUsername = formData.email.split("@")[0];
            const result = await loginUser(formData.email, formData.password);
            console.log(result, 'result')

            if (!result.success) {
                enqueueSnackbar(result.error || "Login failed", {
                    variant: "error",
                });
            }
            router.push("/dashboard");
        } catch (error) {
            enqueueSnackbar("Login failed. Please try again.", {
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    // const handleOTPLogin = async (e: FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         let identifier = "";
    //         let otpMethod = "";

    //         if (loginMethod === "email") {
    //             identifier = formData.email;
    //             otpMethod = "email";
    //         } else {
    //             identifier = `${countryCode}${formData.phone}`;
    //             otpMethod = "sms";
    //         }

    //         // Call your verifyOTP function from AuthContext
    //         const result = await verifyOTP(identifier, formData.otp, otpMethod);

    //         if (!result.success) {
    //             enqueueSnackbar(result.error || "Invalid OTP", {
    //                 variant: "error",
    //             });
    //         }
    //     } catch (error) {
    //         enqueueSnackbar("Verification failed. Please try again.", {
    //             variant: "error",
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleBack = () => {
        setLoginStep("initial");
        setOtpSent(false);
        setOtpTimer(0);
        setFormData({
            email: "",
            phone: "",
            password: "",
            otp: "",
        });
    };

    const handleUsePasswordInstead = () => {
        setLoginStep("email-password");
        setOtpSent(false);
    };

    const handleUseOTPInstead = () => {
        setLoginStep("email-otp");
    };

    const renderInitialStep = () => (
        <form className="space-y-6" onSubmit={handleInitialSubmit}>
            <div>
                <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email address or Mobile number
                </label>
                <input
                    id="identifier"
                    name="email"
                    type="text"
                    placeholder="Enter email or mobile number"
                    value={formData.email || formData.phone}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </form>
    );

    const renderEmailPasswordStep = () => (
        <>
            <div className="mb-6">
                <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm text-blue-600 hover:text-blue-500"
                >
                    ← Back
                </button>
                <p className="text-sm text-gray-600 mt-2">
                    Login with password for: {formData.email}
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleEmailPasswordLogin}>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="show-password"
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="show-password"
                                className="ml-2 block text-sm text-gray-700"
                            >
                                Show password
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={handleUseOTPInstead}
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            Use OTP instead?
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <Link
                            href="/forgot-password"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
        </>
    );

    const renderEmailOTPStep = () => (
        <>
            <div className="mb-6">
                <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm text-blue-600 hover:text-blue-500"
                >
                    ← Back
                </button>
                <p className="text-sm text-gray-600 mt-2">
                    Login with OTP for: {formData.email}
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleOTPLogin}>
                {!otpSent ? (
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={loading}
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {loading ? "Sending OTP..." : "Send OTP to Email"}
                        </button>
                        <button
                            type="button"
                            onClick={handleUsePasswordInstead}
                            className="mt-3 text-sm text-blue-600 hover:text-blue-500"
                        >
                            Use password instead?
                        </button>
                    </div>
                ) : (
                    <>
                        <div>
                            <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Enter OTP
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={formData.otp}
                                onChange={handleInputChange}
                                maxLength={6}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                            />
                            <div className="mt-2 text-sm text-gray-600">
                                {otpTimer > 0 ? (
                                    <p>Resend OTP in {otpTimer} seconds</p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        className="text-blue-600 hover:text-blue-500"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || formData.otp.length !== 6}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </>
    );

    const renderPhoneOTPStep = () => (
        <>
            <div className="mb-6">
                <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm text-blue-600 hover:text-blue-500"
                >
                    ← Back
                </button>
                <p className="text-sm text-gray-600 mt-2">
                    Login with OTP for mobile
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleOTPLogin}>
                <div className="flex space-x-2">
                    <div className="w-1/3">
                        <label
                            htmlFor="country-code"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Country
                        </label>
                        <select
                            id="country-code"
                            value={countryCode}
                            onChange={handleCountryCodeChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="+91">India (+91)</option>
                            <option value="+1">USA (+1)</option>
                            <option value="+44">UK (+44)</option>
                            <option value="+61">Australia (+61)</option>
                            <option value="+65">Singapore (+65)</option>
                        </select>
                    </div>
                    <div className="w-2/3">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mobile Number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter mobile number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {!otpSent ? (
                    <div>
                        <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={loading || !formData.phone}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {loading ? "Sending OTP..." : "Send OTP via SMS"}
                        </button>
                    </div>
                ) : (
                    <>
                        <div>
                            <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Enter OTP
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={formData.otp}
                                onChange={handleInputChange}
                                maxLength={6}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                            />
                            <div className="mt-2 text-sm text-gray-600">
                                {otpTimer > 0 ? (
                                    <p>Resend OTP in {otpTimer} seconds</p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        className="text-blue-600 hover:text-blue-500"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || formData.otp.length !== 6}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-left">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {loginStep === "initial" && renderInitialStep()}
                    {loginStep === "email-password" &&
                        renderEmailPasswordStep()}
                    {loginStep === "email-otp" && renderEmailOTPStep()}
                    {loginStep === "phone-otp" && renderPhoneOTPStep()}

                    {/* Only show register links on initial step */}
                    {loginStep === "initial" && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="flex mt-6 gap-2">
                                <Link
                                    href="/teacher-register"
                                    className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Create teacher account
                                </Link>
                                <Link
                                    href="/student-register"
                                    className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Create student account
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
function handleOTPLogin(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
}

function handleSendOTP () {
    console.log("Need to create");
}

