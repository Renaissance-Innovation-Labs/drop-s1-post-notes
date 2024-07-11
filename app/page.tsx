import logo from "@/assets/logo.svg";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import AuthButton from "../components/AuthButton";

export default async function Index() {
	const canInitSupabaseClient = () => {
		try {
			createClient();
			return true;
		} catch (e) {
			return false;
		}
	};

	const isSupabaseConnected = canInitSupabaseClient();

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
				<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
					<Image src={logo} alt="Post Notes" height={30} />
					{isSupabaseConnected && <AuthButton />}
				</div>
			</nav>

			<div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
				<Header />
			</div>

			<footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
				<p>
					Created by{" "}
					<a
						href="https://github.com/Renaissance-Innovation-Labs/drop-s1-post-notes"
						target="_blank"
						className="font-bold hover:underline"
						rel="noreferrer"
					>
						Renaissance Innovation Labs
					</a>
				</p>
			</footer>
		</div>
	);
}
