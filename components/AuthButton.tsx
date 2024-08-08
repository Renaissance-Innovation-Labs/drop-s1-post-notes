"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { signOut: () => void };

const AuthButton = ({ signOut }: Props) => {
	const pathname = usePathname();
	return pathname === "/" ? (
		<Link href="/dashboard">
			<button className="py-2 px-4 rounded-md border no-underline bg-btn-background hover:bg-btn-background-hover">
				Dashboard
			</button>
		</Link>
	) : (
		<form action={signOut}>
			<button className="py-2 px-4 rounded-md border no-underline bg-btn-background hover:bg-btn-background-hover">
				Logout
			</button>
		</form>
	);
};

export default AuthButton;
