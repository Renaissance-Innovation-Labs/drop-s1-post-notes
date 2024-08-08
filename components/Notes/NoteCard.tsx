import { useUser } from "@/app/api/queries";
import { Caveat } from "next/font/google";

const caveat = Caveat({
	subsets: ["latin"],
});

const style = {
	boxShadow: "-1px 5px 5px 0px #0000004D",
};

const shadowStyle = {
	boxShadow:
		"-1px 10px 20px 0px rgba(0, 0, 0, 0.3), 52px 0px 6px rgba(0, 0, 0, 0.1)",
};

const NoteCard = ({ note }: { note: any }) => {
	const { data: user, error } = useUser();

	const isRecipient = user?.user?.id === note.receiver_id;
	const sentiment = note?.sentiment;

	return (
		<div
			className={`relative h-fit ${
				isRecipient ? "bg-[#FFD966]" : "bg-[#E6E6E6]"
			}`}
			style={style}
		>
			{/* Shadows */}
			<div
				className="absolute -left-0 top-[15%] w-5 z-[-1] h-[85%]"
				style={shadowStyle}
			></div>

			{/* Glue */}
			<div
				className={`bg-opacity-5 h-10 border-b border-b-black/0 px-2 flex items-center justify-between`}
			>
				{/* Sender Name */}
				<p className="text-foreground text-sm">
					{isRecipient ? note?.sender?.firstName : "Me"}
				</p>
				<p className="text-foreground text-xs">
					{new Date(note?.created_at).toLocaleDateString()}
				</p>
			</div>

			{/* Paper */}
			<section className="p-4 px-2">
				<p
					className={`whitespace-pre-line text-lg leading-snug ${caveat.className}`}
				>
					{note?.content}
				</p>

				{isRecipient && (
					<>
						<hr className="my-2 border-black/10" />
						<p className="text-xs">{sentiment?.sentiment}</p>
					</>
				)}

				<hr className="my-2 border-black/10" />

				<p className="text-xs">
					{isRecipient ? sentiment?.recipient_action : sentiment?.sender_action}
				</p>
			</section>
		</div>
	);
};

export default NoteCard;
