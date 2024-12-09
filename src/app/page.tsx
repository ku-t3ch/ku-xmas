"use client";
import { useRouter } from "next/router";
import Background from "@/components/background";
import Logo from "@/components/logo";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function Home() {
  return (
    <main className="flex flex-col w-full justify-center items-center ">
      {/* Background */}
      <Background />
      {/* Content */}
      <div className="flex p-20 items-center">
      <Logo/>
        <h3 className="font-bold text-2xl text-center text-white">& Christmas</h3>
      </div>

      <RainbowButton>เข้าสู่ระบบ</RainbowButton>
    </main>
  );
}
