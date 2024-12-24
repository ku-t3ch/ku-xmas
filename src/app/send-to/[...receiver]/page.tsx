/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { messageFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/button";
import { Loader2, MailCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import RenderChristmasTree from "@/components/avatar/RenderChristmasTree";

export default function SendTo() {
	const router = useRouter();

	const params = useParams<{ receiver: string[] }>();
	const [isSuccess, setIsSuccess] = useState(false);
	const [receiver, setReceiver] = useState<{
		id: string;
		username: string;
		sessionId: string;
		avatar: {
			accessory: string;
			face: string;
			shoe: string;
		};
	} | null>(null);

	const form = useForm<z.infer<typeof messageFormSchema>>({
		defaultValues: {
			senderName: "",
			message: "",
		},
		resolver: zodResolver(messageFormSchema),
	});

	const [loading, setLoading] = useState(true);
	const onSubmit = async (values: z.infer<typeof messageFormSchema>) => {
		const req = axios.post(
			`/api/v1/users/${receiver?.id}/messages`,
			values
		);

		toast.promise(req, {
			loading: "กำลังส่งคำอวยพร",
			error: (err) =>
				err.response.data.error ??
				"เกิดข้อผิดพลาดในระหว่างการส่งคำอวยพร",
			success: () => {
				setIsSuccess(true);
				return "ส่งคำอวยพรสำเร็จ!";
			},
		});
	};

	useEffect(() => {
		const fetchReceiver = async () => {
			setLoading(true);
			try {
				const receiverId = params.receiver[0];
				const receiverSessionId = params.receiver[1];

				let userId: string | null = null;
				try {
					const resAuth = await axios.get("/api/v1/auth");
					userId = resAuth.data.userId;
				} catch (_) {}

				const res = await axios.get(`/api/v1/users/${receiverId}`);
				const { user } = res.data;
				const realSessionId = user.publicLink.split("/")[5];

				if (receiverSessionId !== realSessionId) throw new Error();
				else if (userId && userId === user.id) {
					toast.error("คุณไม่สามารถส่งข้อความหาตัวเองได้");
					return router.push("/home");
				}

				setReceiver({
					id: user.id,
					username: user.username,
					sessionId: receiverSessionId,
					avatar: JSON.parse(user.avatar),
				});
			} catch (err) {
				console.error(err);
				toast.error("ไม่สามารถเข้าถึงข้อมูลของผู้ใช้งานปลายทางได้");
			}
			setLoading(false);
		};
		fetchReceiver();
	}, [params, router]);

	return (
		<>
			{isSuccess ? (
				<>
					<div className="absolute flex flex-col items-center justify-center space-y-4">
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
						<div className="inline-flex text-white text-lg font-bold space-x-2">
							<h3>ส่งข้อความสำเร็จ !</h3>
							<MailCheck />
						</div>
						<Link href={"/home"}>
							<Button className="bg-white text-black hover:bg-white/80">
								กลับสู่หน้าหลัก
							</Button>
						</Link>
					</div>
				</>
			) : (
				<>
					{loading ? (
						<>
							<Button className="absolute">
								<Loader2 className="animate-spin" />
								กำลังโหลดข้อมูล
							</Button>
						</>
					) : (
						<>
							{receiver ? (
								<div>
									<CardTitle className="text-xl truncate text-white">
										{loading
											? "กำลังโหลดข้อมูล"
											: `คำอวยพรนี้จะส่งไปหา ${receiver.username}`}
									</CardTitle>
									<CardContent className="flex flex-col w-full">
										<div className="relative w-full">
											<RenderChristmasTree
												avatarInfo={receiver.avatar}
											/>
											<CardDescription className="absolute bottom-5 w-full text-center text-white/70">
												ตัวแทนของ {receiver.username}{" "}
												ไงล่ะ!
											</CardDescription>
										</div>
									</CardContent>
									<div className="pt-6">
										<CardContent>
											<Form {...form}>
												<form
													onSubmit={form.handleSubmit(
														onSubmit
													)}
													className="space-y-4"
												>
													<FormField
														control={form.control}
														name="senderName"
														render={({ field }) => (
															<FormItem>
																<FormLabel className="text-white">
																	ชื่อผู้ส่ง
																</FormLabel>
																<FormDescription className="text-white/80">
																	ชื่อนี้จะช่วยบอก{" "}
																	{
																		receiver.username
																	}{" "}
																	ว่าคำอวยพรนี้ส่งมาจากคุณ!
																</FormDescription>
																<FormControl>
																	<Input
																		{...field}
																		placeholder="โปรดระบุ"
																		className="bg-white/10 backdrop-blur-md text-white"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="message"
														render={({ field }) => (
															<FormItem>
																<FormLabel className="text-white">
																	คำอวยพรของคุณ
																</FormLabel>
																<FormControl>
																	<Textarea
																		placeholder="ขอให้..."
																		{...field}
																		className="h-[150px] resize-none bg-white/10 backdrop-blur-md text-white"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<RainbowButton
														className="w-full inline-flex items-center space-x-2"
														theme="white"
													>
														ส่งคำอวยพร
													</RainbowButton>
												</form>
											</Form>
										</CardContent>
									</div>
									<div className="p-4">
										<CardDescription className="inline-flex w-full items-center justify-center space-x-2 mt-4">
											<p className="text-white/70">
												สร้างลิงก์คำอวยพรของคุณบ้างมั้ย
											</p>
											<Link
												href={"/home"}
												className="underline text-white"
											>
												กดเลย
											</Link>
										</CardDescription>
									</div>
								</div>
							) : (
								<div className="absolute flex flex-col items-center justify-center space-y-4">
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
									<h3 className="text-white text-lg font-bold">
										เกิดข้อผิดพลาด 😿
									</h3>
									<Link href={"/home"}>
										<Button className="bg-white text-black hover:bg-white/80">
											กลับสู่หน้าหลัก
										</Button>
									</Link>
								</div>
							)}
						</>
					)}
				</>
			)}
		</>
	);
}
