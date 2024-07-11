import Image from "next/image";
import notesImage from "../assets/post-notes notes.png";
import Link from "next/link";

export default function Header() {
	return (
		<div className="flex flex-col items-center pt-10">
			<h1 className="mb-4 text-3xl lg:text-4xl font-semibold !leading-tight mx-auto max-w-xl text-center">
				Enhance Your Bonds with Thoughtful Notes
			</h1>
			<h3 className="text-center mb-10">
				Post Notes helps you deepen relationships by enabling meaningful written
				exchanges. Connect with friends, family, and loved ones to share your
				thoughts, gratitude, and even constructive feedback, all designed to
				strengthen your connections and improve communication.
			</h3>
			<Image src={notesImage} alt="View of notes" />
			<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-8" />
			{/* <div className="flex items-center justify-center">
				<Link
					href="/login"
					className="py-2 px-4 rounded-md border no-underline bg-btn-background hover:bg-btn-background-hover"
				>
					Login
				</Link>
			</div> */}
		</div>
	);
}
