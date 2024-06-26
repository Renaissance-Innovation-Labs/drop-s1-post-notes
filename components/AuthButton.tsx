import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		"use server";

		const supabase = createClient();
		await supabase.auth.signOut();
		return redirect("/login");
	};

	return user ? (
		<div className="flex items-center gap-4">
			<p className="">
				Hey, {user.user_metadata.firstName} {user.user_metadata.lastName}
			</p>
			<form action={signOut}>
				<button className="py-2 px-4 rounded-md border no-underline bg-btn-background hover:bg-btn-background-hover">
					Logout
				</button>
			</form>
		</div>
	) : (
		<Link
			href="/login"
			className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
		>
			Login
		</Link>
	);
}
