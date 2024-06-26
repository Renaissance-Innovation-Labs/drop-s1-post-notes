import Image from "next/image";
import notesImage from "../assets/post-notes notes.png";
import Link from "next/link";

export default function Header() {
	return (
		<div className="flex flex-col items-center pt-10">
			<h1 className="mb-4 text-3xl lg:text-4xl font-semibold !leading-tight mx-auto max-w-xl text-center">
				Strengthen Your Connections with Meaningful Notes
			</h1>
			<h3 className="text-center mb-10">
				At Post Notes, we believe in the power of written words to build and
				nurture relationships. Our platform allows you to create pairings with
				friends, spouses, family members, or anyone you care about. Once paired,
				you can exchange notes that express your thoughts, appreciation, or even
				complaints in a constructive manner.
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
