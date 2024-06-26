import { getUserPairings } from "@/utils/pairings";
import Link from "next/link";
import PairingRequestCard from "./PairingRequestCard";
import { getUser } from "@/utils/user";

const MyPairings = async () => {
	const { pairings, error } = await getUserPairings();
	const { user, error: userError } = await getUser();

	const pendingRequests = pairings?.filter(
		(pairing) =>
			pairing.status === "pending" && pairing.receiver_email === user?.email
	);

	return (
		<div className="gap-4 w-full border border-black/5 p-4 rounded-xl">
			<div className="flex justify-between border-b border-b-black/5 items-center mb-4 pb-4">
				<h2 className="font-semibold text-lg text-left">Pairings Requests</h2>
				<Link
					href="/dashboard/pairing/add"
					className="border border-foreground/10 hover:bg-foreground/5 text-center rounded-md px-4 py-1 text-foreground text-sm"
				>
					Send Pair Request
				</Link>
			</div>
			{Array.isArray(pendingRequests) && (
				<>
					{pendingRequests?.length < 1 ? (
						<div className="py-6">
							<p className="text-center">
								You do not have any Pending Requests
							</p>
							{/* <p className="text-center">Add a new pair above</p> */}
						</div>
					) : (
						<div className="grid md:grid-cols-3 gap-4">
							{pendingRequests.map((request) => (
								<PairingRequestCard key={request.id} request={request} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default MyPairings;
