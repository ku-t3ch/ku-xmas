"use client"
import Meteors from "@/components/ui/meteors";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function First() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-black">
			<Meteors />
			<div className="relative">
				<Link href={"/sign-in"}>
					<RainbowButton className="">ไปอวยพรกันเถอะ !</RainbowButton>
				</Link>
			</div>
		</div>
	);
}
