"use server";

import { createClient } from "./supabase/server";

export const getUserNotes = async () => {
	const supabase = createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError) {
		return { notes: [], error: userError };
	}

	let { data: notes, error: notesError } = await supabase
		.from("notes")
		.select("*")
		.or(`receiver_id.eq.${user?.id}, sender_id.eq.${user?.id}`)
		.order("created_at", { ascending: false });

	return { notes, error: notesError };
};

export const sendNote = async (formData: FormData) => {
	const supabase = createClient();

	const content = formData.get("note") as string;
	const recipientId = formData.get("recipient") as string;

	const { data: noteSent, error: error } = await supabase.functions.invoke(
		"send-note",
		{
			body: {
				message: content,
				recipientId,
			},
		}
	);

	if (error) {
		return { type: "error", message: error.message };
	} else {
		return {
			type: "success",
			message: noteSent?.message,
			redirectUrl: "/dashboard",
		};
	}
};
