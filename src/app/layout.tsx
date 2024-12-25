import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Noto_Sans_Thai } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import Head from "next/head";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});
const notoSansThai = Noto_Sans_Thai({
	subsets: ["thai"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "KU TECH Christmas Festival",
	description: "Celebrating the Joy of Christmas with Innovation and Magic",
	icons: "/favicon.png"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
			</Head>
			<body
				className={`${notoSansThai.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Toaster richColors position="top-center" />
				{children}
				<Script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></Script>
			</body>
		</html>
	);
}
