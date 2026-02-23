import { apiSlice } from "../services/apiSlice";

interface User {
	first_name: string;
	last_name: string;
	email: string;
	role: string;
}

interface PendingRegistrationData {
	first_name: string;
	last_name: string;
	role: string;
}

interface PendingRegistrationParams {
	phone_number: string;
	country_code: string;
}

interface SocialAuthArgs {
	provider: string;
	state: string;
	code: string;
}

interface CreateUserResponse {
	success: boolean;
	user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => "/v2/users/me/",
		}),
		socialAuthenticate: builder.mutation<
			CreateUserResponse,
			SocialAuthArgs
		>({
			query: ({ provider, state, code }) => ({
				url: `/v2/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: "/v2/jwt/create/",
				method: "POST",
				body: { email, password },
			}),
		}),
		register: builder.mutation({
			query: ({
				first_name,
				last_name,
				role,
				email,
				password,
				re_password,
			}) => ({
				url: "/v2/users/",
				method: "POST",
				body: {
					first_name,
					last_name,
					role,
					email,
					password,
					re_password,
				},
			}),
		}),
		verify: builder.mutation({
			query: () => ({
				url: "/v2/jwt/verify/",
				method: "POST",
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/v2/logout/",
				method: "POST",
			}),
		}),
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: "/v2/users/activation/",
				method: "POST",
				body: { uid, token },
			}),
		}),
		resetPassword: builder.mutation({
			query: (email) => ({
				url: "/v2/users/reset_password/",
				method: "POST",
				body: { email },
			}),
		}),
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: "/v2/users/reset_password_confirm/",
				method: "POST",
				body: { uid, token, new_password, re_new_password },
			}),
		}),
		requestPhoneRegistrationOtp: builder.mutation({
			query: ({
				first_name,
				last_name,
				role,
				country_code,
				phone_number,
			}) => ({
				url: "/v2/auth/request-phone-otp/",
				method: "POST",
				body: {
					first_name,
					last_name,
					role,
					country_code,
					phone_number,
				},
			}),
		}),
		verifyRegistrationOtpAndCreateUser: builder.mutation({
			query: ({ phone_number, otp }) => ({
				url: "/v2/auth/verify-phone-otp/",
				method: "POST",
				body: {
					phone_number,
					otp,
				},
			}),
		}),
		getPendingRegistrationData: builder.query<
			PendingRegistrationData,
			PendingRegistrationParams
		>({
			query: ({ phone_number, country_code }) => ({
				url: `/v2/auth/pending-registration/?phone_number=${encodeURIComponent(phone_number)}&country_code=${encodeURIComponent(country_code)}`,
				method: "GET",
			}),
		}),
		loginRequestOTP: builder.mutation({
			query: ({ phone_number, country_code }) => ({
				url: "/v2/auth/login-request-otp/",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: { phone_number, country_code },
			}),
		}),
		loginVerifyOTP: builder.mutation({
			query: ({ phone_number, country_code, otp }) => ({
				url: "/v2/auth/login-verify-otp/",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: { phone_number, country_code, otp },
			}),
		}),
		addPhoneRequest: builder.mutation({
			query: ({ phone_number, country_code }) => ({
				url: "/v2/auth/add-phone-request/",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: { phone_number, country_code },
			}),
		}),
		addPhoneVerify: builder.mutation({
			query: (otp) => ({
				url: "/v2/auth/add-phone-request/",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: otp,
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useSocialAuthenticateMutation,
	useRegisterMutation,
	useLoginMutation,
	useVerifyMutation,
	useLogoutMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
	useRequestPhoneRegistrationOtpMutation,
	useVerifyRegistrationOtpAndCreateUserMutation,
	useGetPendingRegistrationDataQuery,
	useLoginRequestOTPMutation,
	useLoginVerifyOTPMutation,
	useAddPhoneRequestMutation,
	useAddPhoneVerifyMutation,
} = authApiSlice;
