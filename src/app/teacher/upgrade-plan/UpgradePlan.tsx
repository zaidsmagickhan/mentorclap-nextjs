"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { apiGet, apiPost } from "@/services/ApiService";
import LoaderMinimal from "@/component/loader/LoaderMinimal";
import { COMPANY_NAME, GST_PERCENTAGE } from "@/lib/contants";
import {
    Plan,
    CouponState,
    CouponStates,
    ShowCouponInput,
    CurrentPlanResponse,
    OrderResponse,
    PaymentVerificationResponse,
    RazorpayResponse,
    CouponValidationResponse,
    CouponApplyResponse,
} from "@/types/payment";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const UpgradePlan = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const [plans, setPlans] = useState<Plan[]>([]);
    const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [couponStates, setCouponStates] = useState<CouponStates>({});
    const [showCouponInput, setShowCouponInput] = useState<ShowCouponInput>({});

    const plansSectionRef = useRef<HTMLDivElement>(null);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const data: Plan[] = await apiGet("/api/payments/plans/");
            setPlans(data);
        } catch (error) {
            console.error("Error fetching plans:", error);
            enqueueSnackbar("Failed to load plans", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const setRecommendedPlan = (planId: number) => {
        setPlans((prevPlans) =>
            prevPlans.map((plan) => ({
                ...plan,
                recommended: plan.id === planId,
            }))
        );
    };

    // Handle coupon validation
    const handleValidateCoupon = async (planId: number, code: string) => {
        if (!code.trim()) {
            enqueueSnackbar("Please enter a coupon code", { variant: "info" });
            return;
        }

        try {
            const response: CouponValidationResponse = await apiPost(
                "/api/payments/coupons/validate/",
                {
                    code,
                    plan_id: planId,
                }
            );

            if (response.valid) {
                setCouponStates((prev) => ({
                    ...prev,
                    [planId]: {
                        code,
                        valid: true,
                        discountAmount: response.discount_amount,
                        discountedPrice: response.discounted_price,
                        originalPrice: response.original_price,
                        error: null,
                    },
                }));
                enqueueSnackbar("Coupon applied successfully!", {
                    variant: "success",
                });
            } else {
                setCouponStates((prev) => ({
                    ...prev,
                    [planId]: {
                        code,
                        valid: false,
                        discountAmount: 0,
                        discountedPrice: 0,
                        originalPrice: 0,
                        error: response.message || "Invalid coupon",
                    },
                }));
                enqueueSnackbar(response.message || "Invalid coupon", {
                    variant: "info",
                });
            }
        } catch (error: any) {
            console.log(error.message, "error");
            setCouponStates((prev) => ({
                ...prev,
                [planId]: {
                    ...prev[planId],
                    valid: false,
                    error: error.message || "Failed to validate coupon",
                },
            }));
            enqueueSnackbar(error.message || "Failed to validate coupon", {
                variant: "error",
            });
        }
    };

    // Payment Verification Function
    const verifyPayment = async (
        razorpayResponse: RazorpayResponse,
        redemption_id?: string
    ) => {
        try {
            const verification: PaymentVerificationResponse = await apiPost(
                "/api/payments/verify-payment/",
                {
                    razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                    razorpay_order_id: razorpayResponse.razorpay_order_id,
                    razorpay_signature: razorpayResponse.razorpay_signature,
                    plan_id: loadingPlanId,
                    redemption_id: redemption_id,
                }
            );

            if (verification.success) {
                enqueueSnackbar(
                    `Payment successful! ${verification.coins_added} coins added to your account`,
                    { variant: "success" }
                );
                // Refresh user data or redirect
                router.push("/dashboard");
            } else {
                enqueueSnackbar(
                    verification.message ||
                        "Payment verification failed. Please contact support.",
                    { variant: "error" }
                );
            }
        } catch (error: any) {
            enqueueSnackbar(
                error.message ||
                    "Payment verification failed. Please contact support.",
                {
                    variant: "error",
                }
            );
            console.error("Verification error:", error);
        }
    };

    // Buy Now Button
    const handleBuyNow = async (planId: number, couponCode?: string) => {
        setLoadingPlanId(planId);

        try {
            const orderResponse: OrderResponse = await apiPost(
                "/api/payments/create-order/",
                {
                    plan_id: planId,
                    coupon_code: couponCode,
                }
            );

            // Check if Razorpay is loaded
            if (typeof window.Razorpay === "undefined") {
                throw new Error(
                    "Payment gateway not loaded. Please refresh the page."
                );
            }

            const options = {
                key: orderResponse.key,
                amount: orderResponse.amount,
                currency: orderResponse.currency,
                name: COMPANY_NAME,
                description: `Purchase ${orderResponse.plan_details.coins} coins`,
                order_id: orderResponse.order_id,
                handler: async (response: RazorpayResponse) => {
                    try {
                        await verifyPayment(
                            response,
                            orderResponse.redemption_id
                        );
                    } catch (error) {
                        enqueueSnackbar("Payment processing failed", {
                            variant: "error",
                        });
                    }
                },
                prefill: orderResponse.user_details,
                theme: { color: "#3399cc" },
                modal: {
                    ondismiss: async () => {
                        if (orderResponse.redemption_id) {
                            try {
                                await apiPost(
                                    "/api/payments/coupons/fail-redemption/",
                                    {
                                        redemption_id:
                                            orderResponse.redemption_id,
                                    }
                                );
                            } catch (error) {
                                console.error(
                                    "Failed to mark coupon as failed:",
                                    error
                                );
                            }
                        }
                    },
                },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", async (response: any) => {
                enqueueSnackbar(
                    `Payment failed: ${response.error.description}`,
                    { variant: "error" }
                );

                if (orderResponse.redemption_id) {
                    try {
                        await apiPost(
                            "/api/payments/coupons/fail-redemption/",
                            {
                                redemption_id: orderResponse.redemption_id,
                            }
                        );
                    } catch (error) {
                        console.error(
                            "Failed to mark coupon as failed:",
                            error
                        );
                    }
                }
            });

            rzp.open();
        } catch (error: any) {
            enqueueSnackbar(error.message || "Payment initialization failed", {
                variant: "error",
            });
        } finally {
            setLoadingPlanId(null);
        }
    };

    // Handle Coupon Application
    const handleApplyCoupon = async (planId: number) => {
        const couponState = couponStates[planId];
        if (!couponState?.valid) {
            enqueueSnackbar("Please enter a valid coupon code", {
                variant: "info",
            });
            return;
        }

        try {
            const applyResponse: CouponApplyResponse = await apiPost(
                "/api/payments/coupons/apply/",
                {
                    code: couponState.code,
                    plan_id: planId,
                }
            );

            if (applyResponse.success && applyResponse.coupon_code) {
                await handleBuyNow(planId, applyResponse.coupon_code);
            } else {
                enqueueSnackbar(
                    applyResponse.message || "Coupon application failed",
                    {
                        variant: "error",
                    }
                );
                setCouponStates((prev) => ({
                    ...prev,
                    [planId]: {
                        ...prev[planId],
                        valid: false,
                        error: applyResponse.message || "Application failed",
                    },
                }));
            }
        } catch (error: any) {
            console.log(error, "error");
            enqueueSnackbar(error.message || "Failed to apply coupon", {
                variant: "error",
            });
        }
    };

    // Render coupon input section for a plan
    const renderCouponSection = (plan: Plan) => {
        const couponState = couponStates[plan.id] || {};

        return (
            <div className="mt-4">
                {showCouponInput[plan.id] ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) =>
                                    setCouponStates((prev) => ({
                                        ...prev,
                                        [plan.id]: {
                                            ...prev[plan.id],
                                            code: e.target.value,
                                            valid: false,
                                        },
                                    }))
                                }
                                value={couponState.code || ""}
                            />
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                onClick={() =>
                                    handleValidateCoupon(
                                        plan.id,
                                        couponState.code || ""
                                    )
                                }
                                disabled={!couponState.code?.trim()}
                            >
                                Apply
                            </button>
                        </div>

                        {couponState.error && (
                            <p className="text-red-500 text-sm mt-1">
                                {couponState.error}
                            </p>
                        )}

                        {couponState.valid && (
                            <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-green-700 font-medium">
                                    ✓ Coupon applied! You saved ₹
                                    {couponState.discountAmount}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    New price: ₹{couponState.discountedPrice}{" "}
                                    (without GST)
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors"
                        onClick={() => toggleCouponInput(plan.id)}
                    >
                        Have a coupon?
                    </button>
                )}
            </div>
        );
    };

    // Toggle coupon input visibility for a plan
    const toggleCouponInput = (planId: number) => {
        setShowCouponInput((prev) => ({
            ...prev,
            [planId]: !prev[planId],
        }));
    };

    const scrollToPlans = () => {
        if (plansSectionRef.current) {
            plansSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        document.title = "Upgrade plan - MentorClap";

        // Load Razorpay script
        const loadRazorpayScript = () => {
            if (typeof window !== "undefined" && !window.Razorpay) {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = () => {
                    console.log("Razorpay script loaded");
                };
                script.onerror = () => {
                    console.error("Failed to load Razorpay script");
                    enqueueSnackbar(
                        "Failed to load payment gateway. Please refresh.",
                        { variant: "error" }
                    );
                };
                document.body.appendChild(script);
            }
        };

        loadRazorpayScript();

        // Fetch Current Plan
        const fetchCurrentPlan = async () => {
            setLoading(true);
            try {
                const data: CurrentPlanResponse = await apiGet(
                    "/api/payments/current-plan/"
                );
                console.log(data);
                if (data.success && data.plan) {
                    setCurrentPlan(data.plan);
                } else {
                    // Set free tier defaults
                    setCurrentPlan({
                        id: 0,
                        name: "free",
                        display_name: "Free Tier",
                        coins: 150,
                        description: "Basic access, 24-hour response time",
                        price: "0",
                        price_with_gst: "0",
                        features: ["Basic access", "Basic support"],
                        is_active: true,
                    });
                }
            } catch (error) {
                console.error("Error fetching current plan:", error);
                enqueueSnackbar("Failed to load current plan", {
                    variant: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentPlan();
        fetchPlans();

        // Cleanup
        return () => {
            const scripts = document.querySelectorAll(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
            );
            if (scripts.length > 1) {
                scripts[scripts.length - 1].remove();
            }
        };
    }, [enqueueSnackbar]);

    if (loading && plans.length === 0) return <LoaderMinimal />;

    const getDaysRemaining = (expiryDate?: string): number => {
        if (!expiryDate) return 0;
        const expiry = new Date(expiryDate);
        const now = new Date();
        const diffTime = expiry.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Current Plan Card */}
                <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg overflow-hidden p-6 mb-10 border-l-4 border-blue-500">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {/* Left Section - Plan Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Your Current Plan
                                </h2>
                                {currentPlan?.name === "free" ? (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        Free Tier
                                    </span>
                                ) : (
                                    <span
                                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                            currentPlan?.name === "silver"
                                                ? "bg-gray-100 text-gray-800"
                                                : currentPlan?.name === "gold"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-purple-100 text-purple-800"
                                        }`}
                                    >
                                        {currentPlan?.display_name ||
                                            "Active Plan"}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2 text-left">
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Coins:
                                    </span>{" "}
                                    {currentPlan?.coins || "150"}
                                </p>
                                <div className="text-gray-700">
                                    <span className="font-semibold">
                                        Features:
                                    </span>{" "}
                                    {currentPlan?.description ? (
                                        <div
                                            className="inline"
                                            dangerouslySetInnerHTML={{
                                                __html: currentPlan.description,
                                            }}
                                        />
                                    ) : (
                                        "Basic access, 24-hour response time"
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Validity */}
                        <div className="bg-white p-4 rounded-lg shadow-sm min-w-[180px]">
                            <p className="text-sm text-gray-500 mb-1">
                                Plan Valid Until
                            </p>
                            <p className="text-lg font-semibold text-blue-600">
                                {currentPlan?.expiry_date
                                    ? new Date(
                                          currentPlan.expiry_date
                                      ).toLocaleDateString()
                                    : "No expiry"}
                            </p>
                            {currentPlan?.expiry_date && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {getDaysRemaining(currentPlan.expiry_date)}{" "}
                                    days remaining
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Upgrade Prompt for Free Tier */}
                    {currentPlan?.name === "free" && (
                        <div className="mt-4 pt-4 border-t border-blue-200">
                            <p className="text-sm text-blue-600 mb-2">
                                Upgrade to get more coins and premium features!
                            </p>
                            <button
                                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                onClick={scrollToPlans}
                            >
                                View Upgrade Options
                            </button>
                        </div>
                    )}
                </div>

                {/* Upgrade Plans Section */}
                <div id="plans-section" ref={plansSectionRef}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Upgrade Your Plan
                    </h1>
                    <p className="text-gray-600 text-center mb-10">
                        Choose the plan that fits your needs
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                                    plan.recommended
                                        ? "border-2 border-yellow-400 bg-linear-to-br from-yellow-50 to-yellow-100"
                                        : "bg-white border border-gray-200"
                                }`}
                                onClick={() => setRecommendedPlan(plan.id)}
                            >
                                {/* Recommended badge */}
                                {plan.recommended && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                                        SELECTED
                                    </div>
                                )}

                                <div
                                    className={`${
                                        plan.recommended ? "mt-5 p-6" : "p-6"
                                    }`}
                                >
                                    {/* Plan header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {plan.display_name}
                                        </h3>
                                        {plan.coins && (
                                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                                                {plan.coins} Coins
                                            </span>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-end">
                                            <span className="text-4xl font-bold text-gray-800">
                                                ₹
                                                {parseInt(
                                                    plan.price.toString()
                                                )}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-2 mb-1">
                                                (excl. {GST_PERCENTAGE}% GST)
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            With {GST_PERCENTAGE}% GST{" "}
                                            <b>₹{plan.price_with_gst}</b>
                                        </p>
                                    </div>

                                    {/* Description with HTML support */}
                                    <div
                                        className="text-gray-600 text-left mb-4 leading-loose"
                                        dangerouslySetInnerHTML={{
                                            __html: plan.description,
                                        }}
                                    />

                                    {/* Buy button */}
                                    <button
                                        onClick={() => {
                                            if (couponStates[plan.id]?.valid) {
                                                handleApplyCoupon(plan.id);
                                            } else {
                                                handleBuyNow(plan.id);
                                            }
                                        }}
                                        className={`w-full py-3 px-6 rounded-lg font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                            plan.recommended
                                                ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                        disabled={loadingPlanId === plan.id}
                                    >
                                        {loadingPlanId &&
                                        loadingPlanId === plan.id
                                            ? "Processing..."
                                            : "Buy Now"}
                                    </button>

                                    {plan.recommended &&
                                        renderCouponSection(plan)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradePlan;
