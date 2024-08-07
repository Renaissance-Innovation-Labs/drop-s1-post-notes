"use server";

import { createClient } from "./supabase/server";

export const getUser = async () => {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	return { user, error };
};

export const getUserQuery = async () => {
	const supabase = createClient();

	return supabase.auth.getUser();
};
