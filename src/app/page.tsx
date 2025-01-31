"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function First() {
	return (
		<>
			<div className="relative">
				<Link href={"/sign-in"}>
					<RainbowButton theme="white" className="">
						มาร่วมอวยพรไปด้วยกันเถอะ !
					</RainbowButton>
				</Link>
			</div>
		</>
	);
}
