"use client";
import Link from "next/link";
import { SubmitButton } from "@/app/login/submit-button";
import { sendPairingRequest } from "@/utils/pairings";
import { toastError, toastSuccess } from "@/components/toast";
import { useState } from "react";

export default function AddPairing() {
	const [sendingInvite, setSendingInvite] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		setSendingInvite(true);
		const result = await sendPairingRequest(formData);

		if (result.type === "success") {
			toastSuccess(result.message);
			setSendingInvite(false);
			// Optional: redirect to another page
			window.location.href = result.redirectUrl || "/dashboard";
		} else if (result.type === "error") {
			toastError(result.message);
			setSendingInvite(false);
		}
	};

	return (
		<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
			<Link
				href="/dashboard"
				className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
				<label className="text-md" htmlFor="email">
					Recipient's Email
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-4"
					name="email"
					placeholder="you@example.com"
					required
				/>

				<SubmitButton
					aria-disabled={sendingInvite}
					type="submit"
					className="border hover:bg-slate-600 rounded-md px-4 py-2 text-foreground mb-2"
					pendingText="Sending Invite..."
				>
					{sendingInvite ? "Sending invite" : "Send Invite"}
				</SubmitButton>
			</form>
		</div>
	);
}
