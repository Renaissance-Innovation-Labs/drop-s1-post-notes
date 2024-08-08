import logo from "@/assets/logo.svg";
import Profile from "@/components/Profile";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
	icons: {
		icon: "/icon.png",
		shortcut: "/icon.png",
		app: "/icon.png",
	},
};

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
			<header className="w-full sticky top-0 bg-white z-10">
				<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
					<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
						<Image src={logo} alt="Post Notes" height={30} />
						<Profile />
					</div>
				</nav>
			</header>

			{children}
		</div>
	);
}
