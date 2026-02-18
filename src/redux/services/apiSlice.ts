import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
	credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		// Try to refresh only if we think a refresh token might exist.
		// Since we can't check cookies, we attempt refresh—but handle its failure gracefully.
		const refreshResult = await baseQuery(
			{
				url: "/v2/jwt/refresh/",
				method: "POST",
			},
			api,
			extraOptions,
		);

		if (refreshResult.data) {
			// Refresh succeeded: retry original request
			api.dispatch(setAuth());
			result = await baseQuery(args, api, extraOptions);
		} else {
			// Refresh failed → user is truly logged out
			// Also, avoid infinite loops: ensure we don't retry after logout
			api.dispatch(logout());
			// Optionally: redirect to login? (you can do this in middleware or component)
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
