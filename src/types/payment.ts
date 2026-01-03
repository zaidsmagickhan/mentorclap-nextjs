export interface Plan {
    id: number;
    name: string;
    display_name: string;
    description: string;
    price: string | number;
    price_with_gst: string | number;
    coins: number;
    recommended?: boolean;
    expiry_date?: string;
    features?: string[];
    is_active?: boolean;
    [key: string]: any;
}

export interface CouponState {
    code: string;
    valid: boolean;
    discountAmount: number;
    discountedPrice: number;
    originalPrice: number;
    error: string | null;
}

export interface CouponValidationResponse {
    valid: boolean;
    discount_amount: number;
    discounted_price: number;
    original_price: number;
    message?: string;
}

export interface CouponApplyResponse {
    success: boolean;
    message?: string;
    coupon_code?: string;
    discounted_price?: number;
}

export interface OrderResponse {
    key: string;
    amount: number;
    currency: string;
    order_id: string;
    plan_details: {
        coins: number;
    };
    redemption_id?: string;
    user_details: {
        name: string;
        email: string;
        contact: string;
    };
}

export interface PaymentVerificationResponse {
    success: boolean;
    coins_added: number;
    message?: string;
}

export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface CurrentPlanResponse {
    success: boolean;
    plan?: Plan;
    message?: string;
}

export interface CouponStates {
    [planId: number]: CouponState;
}

export interface ShowCouponInput {
    [planId: number]: boolean;
}
