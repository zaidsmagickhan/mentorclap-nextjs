import { apiSlice } from "../services/apiSlice";

export interface CompletionStatus {
	percentage: number;
	next_step_url: string;
	is_complete: boolean;
	details?: Record<string, boolean>;
}

export const profileApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCompletionStatus: builder.query<CompletionStatus, void>({
			query: () => "/v2/profile/status/",
			// Optional: Keep this data fresh
			keepUnusedDataFor: 60,
		}),
	}),
});

export const { useGetCompletionStatusQuery } = profileApiSlice;
