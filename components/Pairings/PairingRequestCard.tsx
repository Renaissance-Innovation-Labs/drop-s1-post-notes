"use client";
import { acceptPairingRequest } from "@/utils/pairings";
import { toastError, toastSuccess } from "@/components/toast";
import { useState } from "react";

export default function PairingRequestCard({ request }: { request: any }) {
	const [acceptingRequest, setAcceptingRequest] = useState(false);

	const acceptRequest = async () => {
		setAcceptingRequest(true);
		const result = await acceptPairingRequest({
			pairing_id: request.id,
			status: "accepted",
		});

		if (result.type === "success") {
			toastSuccess(result.message);
			setAcceptingRequest(false);
		} else if (result.type === "error") {
			console.log(result);
			toastError(result.message);
			setAcceptingRequest(false);
		}
	};

	return (
		<div className="rounded-md border border-black/5 bg-white/5 p-4 backdrop-blur-2xl">
			<div className="flex items-center justify-between mb-4">
				<h3 className="font-medium text-base">
					{request.sender.firstName} {request.sender.lastName}
				</h3>
				<p className="py-0.5 px-2 bg-yellow-50 w-fit rounded-md font-medium text-yellow-700 text-xs">
					Pending
				</p>
			</div>
			<p className="text-sm mb-4">Would you be willing to post notes together?</p>
			<button
				className="border border-foreground/10 hover:bg-foreground/5 text-center rounded-md px-4 py-1 text-foreground text-sm disabled:cursor-not-allowed"
				type="button"
				aria-disabled={acceptingRequest}
				onClick={acceptRequest}
			>
				{acceptingRequest ? "Accepting" : "Accept Request"}
			</button>
		</div>
	);
}
