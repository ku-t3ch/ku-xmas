"use client";
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
		</>
	);
}
