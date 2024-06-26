"use client";
import Link from "next/link";
import { SubmitButton } from "@/app/login/submit-button";
import { getUserPairings, sendPairingRequest } from "@/utils/pairings";
import { toastError, toastSuccess } from "@/components/toast";
import { SetStateAction, useEffect, useState } from "react";
import { getUser } from "@/utils/user";
import { sendNote } from "@/utils/notes";

export default function AddNote() {
	const [sendingNote, setSendingNote] = useState(false);
	const [recipients, setRecipients] = useState<any[]>([]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		setSendingNote(true);
		const result = await sendNote(formData);

		if (result.type === "success") {
			toastSuccess(result.message);
			setSendingNote(false);
			// Optional: redirect to another page
			window.location.href = result.redirectUrl || "/dashboard";
		} else if (result.type === "error") {
			toastError(result.message);
			setSendingNote(false);
		}
	};

	const getActivePairings = async () => {
		const { user, error: userError } = await getUser();
		const { pairings, error } = await getUserPairings();
		const recipients: SetStateAction<any[]> = [];

		if (userError) {
			toastError(userError.message);
		}

		pairings
			?.filter((pairing) => pairing.status === "accepted")
			.forEach((pairing) => {
				if (pairing.sender_id === user?.id) {
					recipients.push(pairing.recipient);
				} else {
					recipients.push(pairing.sender);
				}
			});

		setRecipients(recipients);
	};

	useEffect(() => {
		getActivePairings();
	}, []);

	return (
		<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
			<Link
				href="/dashboard"
				className="py-1 px-2 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group w-fit text-sm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>{" "}
				Back
			</Link>

			<form
				onSubmit={handleSubmit}
				className="animate-in flex-1 flex flex-col w-full pt-10 gap-2 text-foreground"
			>
				<label className="text-sm" htmlFor="recipient">
					Recipient
				</label>
				<select
					name="recipient"
					required
					defaultValue=""
					className="rounded-md px-4 py-2 bg-inherit border text-sm mb-4"
				>
					<option value="" disabled>
						-- Select Recipient --
					</option>
					{recipients?.map((recipient) => (
						<option value={recipient?.sub} key={recipient?.sub}>
							{recipient?.firstName} {recipient?.lastName}
						</option>
					))}
				</select>
				<label className="text-sm" htmlFor="note">
					Note
				</label>
				<textarea
					className="rounded-md px-4 py-2 bg-inherit text-sm border mb-4"
					name="note"
					placeholder="you@example.com"
					required
					rows={5}
				/>

				<SubmitButton
					aria-disabled={sendingNote}
					type="submit"
					className="border border-foreground/10 hover:bg-foreground/5 text-center rounded-md px-4 py-2 text-foreground text-sm mb-2"
					pendingText="Sending Note..."
				>
					{sendingNote ? "Sending Note" : "Send Note"}
				</SubmitButton>
			</form>
		</div>
	);
}
