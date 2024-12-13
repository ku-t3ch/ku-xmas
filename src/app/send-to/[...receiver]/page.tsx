"use client";
import SnowFallBackground from "@/components/snowFallBackground";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function SendTo() {
	const router = useRouter();

	const params = useParams<{ receiver: string[] }>();
	const [receiver, setReceiver] = useState<{
		id: string;
		username: string;
		sessionId: string;
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
		const req = axios.post(`/api/v1/users/${receiver?.id}/message`, values);
		toast.promise(req, {
			loading: "กำลังส่งคำอวยพร",
			error: (err) =>
				err.response.data.error ??
				"เกิดข้อผิดพลาดในระหว่างการส่งคำอวยพร",
			success: () => "ส่งคำอวยพรสำเร็จ!",
		});
	};

	useEffect(() => {
		const fetchReceiver = async () => {
			setLoading(true);
			try {
				const receiverId = params.receiver[0];
				const receiverSessionId = params.receiver[1];

				const resAuth = await axios.get("/api/v1/auth");
				const { userId } = resAuth.data;

				const res = await axios.get(`/api/v1/users/${receiverId}`);
				const { user } = res.data;
				const realSessionId = user.publicLink.split("/")[5];
				// console.log(realSessionId);

				if (receiverSessionId !== realSessionId) throw new Error();
				else if (userId === user.id) {
					toast.error("คุณไม่สามารถส่งข้อความหาตัวเองได้");
					return router.push("/home");
				}

				setReceiver({
					id: user.id,
					username: user.username,
					sessionId: receiverSessionId,
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
		<div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
			<SnowFallBackground />
			{receiver && (
				<Card className="absolute">
					<CardHeader>
						<CardTitle className="text-xl truncate">
							{loading
								? "กำลังโหลดข้อมูล"
								: `คำอวยพรนี้จะส่งไปหา ${receiver.username}`}
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col w-full">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="senderName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ชื่อผู้ส่ง</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="โปรดระบุ"
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
										<FormItem className="">
											<FormLabel>คำอวยพรของคุณ</FormLabel>
											<FormControl>
												<Textarea
													placeholder="ขอให้..."
													{...field}
													className="h-[150px] resize-none"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<RainbowButton className="w-full">
									ส่งคำอวยพร
								</RainbowButton>
							</form>
						</Form>
					</CardContent>
					<CardFooter>
						<CardDescription className="inline-flex items-center justify-center space-x-2 mt-4">
							<p>สร้างลิงก์คำอวยพรของคุณบ้างมั้ย</p>
							<Link
								href={"/home"}
								className="underline text-black"
							>
								กดเลย
							</Link>
						</CardDescription>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
