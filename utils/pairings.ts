"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const getUserPairings = async () => {
	const supabase = createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError) {
		// toastError("An error occured! Please try again");
		return { pairings: [], error: userError };
	}

	let { data: pairings, error: pairingsError } = await supabase
		.from("pairings")
		.select("*")
		// .eq("receiver_email", user?.email)
		.or(`receiver_email.eq.${user?.email}, sender_id.eq.${user?.id}`);
	// .eq("status", "pending");

	return { pairings, error: pairingsError };
};

export const sendPairingRequest = async (formData: FormData) => {
	const supabase = createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError) {
		return { type: "error", message: "An error occurred, please try again" };
	}

	const email = formData.get("email") as string;

	const { data: inviteSent, error: inviteError } =
		await supabase.functions.invoke("send-invite", {
			body: { email, sender_name: user?.user_metadata?.firstName },
		});

	if (inviteError) {
		return { type: "error", message: inviteError.message };
	}

	return {
		type: "success",
		message: inviteSent?.message,
		redirectUrl: "/dashboard",
	};
};

export const acceptPairingRequest = async ({
	pairing_id,
	status,
}: {
	pairing_id: number;
	status: string;
}) => {
	const supabase = createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError) {
		return { type: "error", message: "An error occurred, please try again" };
	}

	const { data, error } = await supabase.rpc("update_pairing_status", {
		pairing_id,
		new_status: status,
		receiver_uuid_value: user?.id,
	});

	if (error) {
		return { type: "error", message: error.message };
	}

	return {
		type: "success",
		message: "Request accepted",
	};
};
