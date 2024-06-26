import { getUserPairings } from "@/utils/pairings";
import Link from "next/link";
import PairingRequestCard from "../Pairings/PairingRequestCard";
import { getUserNotes } from "@/utils/notes";
import NoteCard from "./NoteCard";

const AllNotes = async () => {
	const { notes, error } = await getUserNotes();

	// const pendingRequests = pairings?.filter(
	// 	(pairing) => pairing.status === "pending"
	// );

	return (
		<div className="gap-4 w-full border border-black/5 p-4 rounded-xl">
			<div className="flex justify-between border-b border-b-black/5 items-center mb-4 pb-4">
				<h2 className="font-semibold text-lg text-left">My Notes</h2>
				<Link
					href="/dashboard/notes/add"
					className="border border-foreground/10 hover:bg-foreground/5 text-center rounded-md px-4 py-1 text-foreground text-sm"
				>
					Send new note
				</Link>
			</div>
			{Array.isArray(notes) && (
				<>
					{notes?.length < 1 ? (
						<div className="py-6">
							<p className="text-center">You do not have any notes yet.</p>
							<p className="text-center">
								Your notes will appear here once you recieve any
							</p>
							{/* <p className="text-center">Add a new pair above</p> */}
						</div>
					) : (
						<div className="grid md:grid-cols-3 gap-4">
							{notes.map((note) => (
								<NoteCard key={note.id} note={note} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AllNotes;
