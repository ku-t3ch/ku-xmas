"use client";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center space-y-4">
			<motion.div
				className=""
				initial={{ y: 0 }} // Initial position
				animate={{
					y: [0, -20, 0], // Move up and down
				}}
				transition={{
					duration: 3, // Total animation time
					repeat: Infinity, // Loop animation forever
					ease: "easeInOut", // Smooth movement
				}}
			>
				<Image
					src={"/image/christmas-mascot.png"}
					alt="Christmas mascot"
					width={200}
					height={200}
				/>
			</motion.div>
			<h3 className="text-white text-4xl font-bold">404</h3>
			<h3 className="text-white text-lg font-bold">
				ไม่พบหน้าที่ต้องการเข้าใช้งาน 😿
			</h3>
			<Link href={"/home"}>
				<Button className="bg-white text-black hover:bg-white/80">
					กลับสู่หน้าหลัก
				</Button>
			</Link>
		</div>
	);
}
