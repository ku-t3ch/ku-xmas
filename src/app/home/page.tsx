"use client";

import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RenderChristmasTree from "@/components/avatar/RenderChristmasTree";

export default function Homepage() {
	const router = useRouter();

	const [userId, setUserId] = useState<string | null>(null);
	const [avatarInfo, setAvatarInfo] = useState<{
		accessory: string;
		face: string;
		shoe: string;
	}>({
		accessory: "",
		face: "",
		shoe: "",
	});
	const [trigger, setTrigger] = useState(false);

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

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const resAuth = await axios.get("/api/v1/auth");
				const { userId } = resAuth.data;

				setUserId(userId);

				const resUser = await axios.get(`/api/v1/users/${userId}`);
				const { createdAvatar, avatar } = resUser.data.user;

				if (!createdAvatar) {
					toast.warning(
						"ดูเหมือนคุณจะยังไม่ได้สร้างต้นคริสต์มาสของตัวเองนะ"
					);
					return router.push("/avatar");
				}

				setAvatarInfo(JSON.parse(avatar));
			} catch (err) {
				console.error(err);
				toast.error("ไม่สามารถโหลดข้อมูลผู้ให้งานได้");
				router.push("/sign-in");
			}
		};
		fetchUser();
	}, [router]);

	useEffect(() => {
		console.log(userId);
		setTrigger((prev) => !prev);
	}, [avatarInfo]);

	return (
		<div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6 py-6">
			{/* <SnowfallBackground /> */}
			<Card className="relative">
				<CardHeader>
					<div className="absolute right-3 top-3">
					<AlertDialog>
						<AlertDialogTrigger>
							<Button
								variant={"outline"}
								className="text-red-600 hover:text-red-600"
							>
								<LogOut />
								{/* ออกจากระบบ */}
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
					</div>
					<div className="inline-flex justify-center items-center">
						<Logo />
					</div>
					<CardTitle className="w-full flex flex-col fjustify-center font-bold text-2xl mt-4">
						สุขสันต์วันคริสต์มาสอีฟ มามอบคำอวยพรให้เพื่อน ๆ กันเถอะ!
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center w-full space-y-2">
					<div className="relative w-full">
						<Link href={"/message"} className="cursor-pointer">
							<RenderChristmasTree
								avatarInfo={avatarInfo}
								trigger={trigger}
							/>
						</Link>
						<CardDescription className="absolute bottom-5 w-full text-center">
							กดที่ต้นคริสต์มาสของคุณเพื่อดูคำอวยพรที่ส่งมา
						</CardDescription>
					</div>
					{/* <Link href={"/message"}>
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
					</CardDescription> */}
				</CardContent>
				<CardFooter className="flex justify-end space-x-2">
					
					<Link href={"/avatar"}>
						<Button variant={"outline"}>
							ปรับแต่งต้นคริสต์มาส
						</Button>
					</Link>
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
