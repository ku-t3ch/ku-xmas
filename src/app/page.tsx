"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function First() {
	return (
		<>
			<div className="relative">
				<Link href={"/sign-in"}>
					<RainbowButton className="">
						มาสนุกไปด้วยกันเถอะ !
					</RainbowButton>
				</Link>
			</div>
		</>
	);
}
