"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Logo from "@/components/logo";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SnowfallBackground from "@/components/snowFallBackground";
import { LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Homepage() {
	const router = useRouter();

	const onSubmit = () => {
		const res = axios.post("/api/v1/logout");
		toast.promise(res, {
			loading: "กำลังออกจากระบบ",
			error: (err) =>
				err.response.data.error ??
				"เกิดข้อผิดพลาดในระหว่างการออกจากระบบ",
			success: () => {
				router.push("/");
				return "ออกจากระบบสำเร็จ";
			},
		});
	};

	return (
		<div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
			<SnowfallBackground />
			<Card className="relative">
				<CardHeader>
					<div className="inline-flex justify-center items-center">
						<Logo />
					</div>
					<CardTitle className="w-full flex flex-col fjustify-center font-bold text-2xl">
						สุขสันต์วันคริสต์มาสอีฟ มามอบคำอวยพรให้เพื่อน ๆ กันเถอะ!
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center w-full space-y-2">
					<Link href={"/message"}>
						<Button
							variant={"ghost"}
							className="w-fit h-full bg-gradient-to-r from-white to-white"
						>
							<motion.div
								className="w-32 h-32 mx-auto"
								animate={{
									rotate: [0, 15, -15, 10, -10, 0], // Shaking effect
								}}
								transition={{
									duration: 0.6, // Total time for the shake
									repeat: Infinity, // Infinite repeat
									repeatType: "loop",
									repeatDelay: 4,
								}}
							>
								<Image
									src="/image/christmas-box.webp"
									alt="box"
									width={200}
									height={200}
								/>
							</motion.div>
						</Button>
					</Link>
					<CardDescription>
						เปิดกล่องของขวัญเพื่อดูคำอวยพร
					</CardDescription>
				</CardContent>
				<CardFooter className="flex justify-end space-x-2 mt-6">
					<AlertDialog>
						<AlertDialogTrigger>
							<Button
								variant={"outline"}
								className="text-red-600 hover:text-red-600"
							>
								<LogOut />
								ออกจากระบบ
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									คุณแน่ใจหรือไม่ที่ต้องการออกจากระบบ
								</AlertDialogTitle>
								<AlertDialogDescription>
									จะไปแล้วหรอ... 😥
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>
									ไม่เอาดีกว่า
								</AlertDialogCancel>
								<AlertDialogAction
									className="text-white bg-red-500 hover:bg-red-600"
									onClick={onSubmit}
								>
									แน่ใจมาก
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<Link href={"/create-link"}>
						<Button className="bg-green-600 hover:bg-green-700">
							สร้างลิ้งค์ส่งคำอวยพร
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
