import { redirect } from "next/navigation";
import MyPairings from "@/components/Pairings/MyPairings";
import { createClient } from "@/utils/supabase/server";
import AllNotes from "@/components/Notes/AllNotes";

export default async function DashboardHome() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return (
		<main className="w-full max-w-4xl">
			<div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
				<main className="flex-1 flex flex-col gap-6">
					<MyPairings />
					<AllNotes />
				</main>
			</div>
		</main>
	);
}
