"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth, logout, finishInitialLoad } from "@/redux/features/authSlice";
import { useVerifyMutation } from "@/redux/features/authApiSlice";

export default function useVerify() {
	const [verify] = useVerifyMutation();
	const dispatch = useAppDispatch();
	// useEffect(() => {
	// 	verify(undefined)
	// 		.unwrap()
	// 		.then(() => {
	// 			dispatch(setAuth());
	// 		})
	// 		.finally(() => {
	// 			dispatch(finishInitialLoad());
	// 		});
	// }, []);

	useEffect(() => {
		// Only run once on initial load
		verify(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.catch((error) => {
				// Verification failed → user is not authenticated
				dispatch(logout());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, [dispatch, verify]); // safe deps
}
