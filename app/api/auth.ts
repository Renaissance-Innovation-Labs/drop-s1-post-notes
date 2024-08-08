"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export const signUp = async (formData: FormData) => {
	const origin = headers().get("origin");
	const email = formData.get("email") as string;
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const password = formData.get("password") as string;
	const supabase = createClient();

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { firstName, lastName },
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		return { type: "error", message: error.message };
	} else {
		return {
			type: "success",
			message:
				"Account created successfully! Check your email for verification link",
			redirectUrl: "/login",
		};
	}
};

export const login = async (formData: FormData) => {
	const email = formData.get("email") as string;

	const password = formData.get("password") as string;
	const supabase = createClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { type: "error", message: error.message };
	} else {
		return {
			type: "success",
			redirectUrl: "/dashboard",
			message: "",
		};
	}
};
