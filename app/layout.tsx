import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import ToastProvider from "@/components/ToastProvider";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Post Notes",
	description: "Post notes to people, express your thoughts, appreciation, or even complaints in a constructive manner.",
};

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			<body className="bg-background text-foreground">
				<StyledComponentsRegistry>
					<main className="min-h-screen flex flex-col items-center">
						{children}
					</main>
					<ToastProvider />
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
