"use client";
// import { ParticleBackground } from "@/components/ParticleBackground";

export default function MainTemplate({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* <ParticleBackground /> */}
			<div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
				{children}
			</div>
		</>
	);
}
