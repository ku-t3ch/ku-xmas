"use client";
import Link from "next/link";
// import { ParticleBackground } from "@/components/ParticleBackground";
import Snowfall from "react-snowfall";

export default function MainTemplate({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Snowfall
				color="white"
				snowflakeCount={100}
				style={{
					position: "fixed",
					zIndex: "0",
					width: "100%",
					height: "100%",
				}}
			/>
			{/* <ParticleBackground /> */}
			<div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black p-6">
				{children}
			</div>
			<footer className="bg-black text-white text-center py-4">
				<p className="text-sm">
					🎄 Made by{" "}
					<Link
						href={"https://www.instagram.com/hotwasabisushi/"}
						className="underline"
						target="_blank"
					>
						Human
					</Link>{" "}
					on Earth 🎅
				</p>
			</footer>
		</>
	);
}
