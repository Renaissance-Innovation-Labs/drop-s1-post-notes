"use client";

import { toastError } from "@/components/toast";
import Link from "next/link";
import { useState } from "react";
import { login } from "../api/auth";
import { SubmitButton } from "./submit-button";
import { useRouter } from "next/navigation";

export default function Login({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	const router = useRouter();
	const [loggingIn, setLoggingIn] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		setLoggingIn(true);
		const result = await login(formData);

		if (result.type === "success") {
			router.push("/dashboard");
		} else if (result.type === "error") {
			toastError(result.message);
			setLoggingIn(false);
		}
	};

	return (
		<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
			<Link
				href="/"
				className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>{" "}
				Back
			</Link>

			<form
				onSubmit={handleSubmit}
				className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
			>
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<label className="text-md" htmlFor="password">
					Password
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					type="password"
					name="password"
					placeholder="••••••••"
					required
				/>
				<SubmitButton
					aria-disabled={loggingIn}
					type="submit"
					disabled={loggingIn}
					className="bg-green-700 rounded-md px-4 py-2 text-white mb-2"
					pendingText="Logging In..."
				>
					{loggingIn ? "Signing in" : "Sign in"}
				</SubmitButton>
				<Link
					href="/register"
					className="border border-foreground/20 text-center rounded-md px-4 py-2 text-foreground mb-2"
				>
					Sign Up
				</Link>
				{searchParams?.message && (
					<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
						{searchParams.message}
					</p>
				)}
			</form>
		</div>
	);
}
