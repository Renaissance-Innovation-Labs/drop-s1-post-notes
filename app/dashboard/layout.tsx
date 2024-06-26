import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<header className="w-full">
				<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
					<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
						<h2 className="">Post Notes</h2>
						<AuthButton />
					</div>
				</nav>
			</header>

			{children}
		</div>
	);
}
