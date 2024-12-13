"use client";
import SnowFallBackground from "@/components/snowFallBackground";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function First() {
  return (
    <div className="relative overflow-hidden flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-800 to-black">
      <SnowFallBackground />
      <div className="relative">
        <Link href={"/sign-in"}>
          <RainbowButton className="">มาสนุกไปด้วยกันเถอะ !</RainbowButton>
        </Link>
      </div>
    </div>
  );
}
