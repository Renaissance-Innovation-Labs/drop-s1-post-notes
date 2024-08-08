import { getPairingsByUserId } from "@/utils/pairings";
import { getUser, getUserQuery } from "@/utils/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
	PostgrestResponseFailure,
	PostgrestResponseSuccess,
} from "@supabase/postgrest-js";
import { AuthError } from "@supabase/supabase-js";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { getNotesQuery } from "@/utils/notes";

type PairingsResponse =
	| PostgrestResponseFailure
	| PostgrestResponseSuccess<any[]>
	| { error: AuthError };

type NotesResponse =
	| PostgrestResponseFailure
	| PostgrestResponseSuccess<any[]>
	| { error: AuthError };

export const useUserPairings = () => {
	const supabase = createClient();
	const queryClient = useQueryClient();

	const queryKey = ["pairings"];

	const queryFn = async () => {
		const result: PairingsResponse = await getPairingsByUserId();

		if ("data" in result) {
			return result.data;
		}

		if ("error" in result) {
			throw new Error(result.error.message);
		}

		throw new Error("Unexpected response format");
	};

	useEffect(() => {
		const subscription = supabase
			.channel("custom-all-channel")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "pairings" },
				(payload) => {
					console.log("Change received!", payload);
				}
			)
			.subscribe();
		return () => {
			supabase.removeChannel(subscription);
		};
	}, [queryClient, queryKey]);

	return useQuery({ queryKey, queryFn });
};

export const useUserNotes = () => {
	const supabase = createClient();
	const queryClient = useQueryClient();

	const queryKey = ["notes"];

	const queryFn = async () => {
		const result: NotesResponse = await getNotesQuery();

		if ("data" in result) {
			return result.data;
		}

		if ("error" in result) {
			throw new Error(result.error.message);
		}

		throw new Error("Unexpected response format");
	};

	useEffect(() => {
		const subscription = supabase
			.channel("custom-all-channel")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "notes" },
				(payload) => {
					console.log("Change received!", payload);
				}
			)
			.subscribe();
		return () => {
			supabase.removeChannel(subscription);
		};
	}, [queryClient, queryKey]);

	return useQuery({ queryKey, queryFn });
};

export const useUser = () => {
	const queryKey = ["userProfile"];

	const queryFn = async () => {
		return getUserQuery().then((result) => result.data);
	};

	return useQuery({ queryKey, queryFn });
};
