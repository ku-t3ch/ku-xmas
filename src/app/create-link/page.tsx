"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import SnowfallBackground from "@/components/snowFallBackground";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { motion } from "motion/react";
import { FaCheck } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
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

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function CreateLink() {
	const router = useRouter();

	const [userId, setUserId] = useState<string | null>(null);
	const [currentLink, setCurrentLink] = useState("");
	const [isCopied, setIsCopied] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleCopy = () => {
		if (currentLink === "") {
			return toast.warning("ไม่สามารถคัดลอกได้หากคุณยังไม่ได้สร้างลิงค์");
		}

		navigator.clipboard.writeText(currentLink);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
	};

	const createNewLink = () => {
		const process = async () => {
			try {
				if (!userId) throw new Error();

				const resUpdateUser = await axios.patch(
					`/api/v1/users/${userId}`,
					{
						publicLink: `${userId}/${crypto.randomUUID()}`,
					}
				);
				const { publicLink } = resUpdateUser.data;

				if (!publicLink) throw new Error();

				setCurrentLink(publicLink);
			} catch (err) {
				console.error(err);
				if (err instanceof AxiosError) {
					return err.response?.data.error;
				}
				return err;
			}
		};
		toast.promise(process, {
			loading: "กำลังสร้างลิงก์",
			error: (err) =>
				err.response.data.error ?? "เกิดข้อผิดพลาดในการสร้างลิงก์",
			success: () => "สร้างลิงก์สำเร็จ",
		});
	};

	useEffect(() => {
		const initUserInfo = async () => {
			setLoading(true);
			try {
				const resAuth = await axios.get("/api/v1/auth");
				const { userId } = resAuth.data;
				setUserId(userId);

				const resUserData = await axios.get(`/api/v1/users/${userId}`);
				const { user } = resUserData.data; // user info

				setCurrentLink(user.publicLink ?? "");
			} catch (err) {
				console.error(err);
			}
			setLoading(false);
		};
		initUserInfo();
	}, [router]);

	return (
		<div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
			<SnowfallBackground />
			<Card className="relative">
				<CardHeader>
					<div className="inline-flex justify-center items-center">
						<Logo />
					</div>
					<CardTitle className="w-full inline-flex justify-center items-center space-x-4 text-2xl font-bold">
						มาสร้างเส้นทางมอบคำอวยพรให้คุณกัน ⭐
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex flex-col items-center justify-center space-y-4">
					<Label className="w-full text-left">ลิงก์ของคุณ</Label>
					<div className="w-full flex space-x-2">
						<Input
							className="w-full truncate"
							value={
								currentLink
									? currentLink
									: loading
									? "กำลังโหลดข้อมูล"
									: "ยังไม่ได้สร้าง"
							}
							readOnly
						/>
						<motion.div whileTap={{ scale: 0.9 }}>
							<Button
								variant={"outline"}
								onClick={handleCopy}
								disabled={loading}
							>
								{isCopied ? (
									<div className="inline-flex items-center space-x-2">
										<FaCheck />
										<p>คัดลอกลิงก์แล้ว</p>
									</div>
								) : (
									<div className="inline-flex items-center space-x-2">
										<FiCopy />
										<p>คัดลอกลิงก์</p>
									</div>
								)}
							</Button>
						</motion.div>
					</div>
				</CardContent>
				<CardContent className="flex flex-col items-center justify-center w-full space-y-2"></CardContent>
				<CardFooter className="flex justify-end space-x-2 mt-6">
					<Link href={"/home"} className="w-full">
						<Button variant={"outline"} className="w-full">กลับหน้าหลัก</Button>
					</Link>
					{currentLink === "" ? (
						<Button className="bg-green-600 hover:bg-green-700 w-full"
							disabled={loading || !userId}
							onClick={createNewLink}
						>
							สร้างลิงก์ใหม่
						</Button>
					) : (
						<AlertDialog>
							<AlertDialogTrigger className="w-full">
								<Button disabled={loading || !userId} className="bg-green-600 hover:bg-green-700 w-full">
									สร้างลิงก์ใหม่
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										โปรดระวัง !
									</AlertDialogTitle>
									<AlertDialogDescription>
										หากคุณยืนยันการสร้างลิงก์ใหม่จะส่งผลให้ลิงก์ปัจจุบันที่ใช้งานอยู่นั้นไม่สามารถเข้าถึงได้อีกต่อไป
										โปรดตรวจสอบให้เรียบร้อยก่อนการยืนยัน
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										ยกเลิก
									</AlertDialogCancel>
									<AlertDialogAction onClick={createNewLink} className="bg-green-600 hover:bg-green-700">
										ยืนยัน
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
