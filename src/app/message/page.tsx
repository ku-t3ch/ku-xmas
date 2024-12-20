"use client";
// import SnowFallBackground from "@/components/snowFallBackground";
import { Button } from "@/components/ui/button";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { Loader2, MessageSquareOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Message {
	id: string;
	senderName: string;
	message: string;
	createdAt: Date;
}

export default function RenderMessage() {
	const [userId, setUserId] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(true);
	const [updatedAt, setUpdatedAt] = useState<string | null>(null);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		const fetchUserMessage = async () => {
			setLoading(true);
			try {
				let buffUserId = userId;
				if (!userId) {
					const resAuth = await axios.get("/api/v1/auth");
					buffUserId = resAuth.data.userId;
					setUserId(buffUserId);
				}

				const resFetchMessage = await axios.get(
					`/api/v1/users/${buffUserId}/messages`
				);
				const { messages } = resFetchMessage.data;

				setMessages(messages);
				setUpdatedAt(new Date().toLocaleTimeString("th-TH"));
			} catch (err) {
				console.error(err);
				toast.error("ไม่สามารถโหลดข้อมูลได้");
			}
			setLoading(false);
		};
		fetchUserMessage();
	}, [reload, userId]);

	return (
		<div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
			{/* <SnowFallBackground /> */}
			<Card className="absolute max-w-[600px]">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						มาดูสิว่าใครส่งคำอวยพรมาให้คุณบ้าง 🎁
					</CardTitle>
					<CardDescription>
						{updatedAt ? (
							<p>โหลดข้อมูลล่าสุดเมื่อ {updatedAt}</p>
						) : (
							<p>โหลดข้อมูลล่าสุดเมื่อ</p>
						)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{loading ? (
						<div className="flex flex-col w-full min-h-[300px] h-full justify-center items-center">
							<Button variant={"ghost"}>
								<Loader2 className="animate-spin" />
								กำลังโหลดข้อมูล
							</Button>
						</div>
					) : (
						<>
							{messages.length > 0 ? (
								<ScrollArea className="h-[400px] w-full rounded-md border">
									<div className="w-full h-full flex flex-col gap-4 p-4">
										{messages.map((message) => (
											<Card key={message.id}>
												<CardHeader>
													<CardTitle>
														{message.senderName}
													</CardTitle>
													<CardDescription>
														ส่งเมื่อ{" "}
														{new Date(
															message.createdAt
														).toLocaleString(
															"th-TH"
														)}
													</CardDescription>
												</CardHeader>
												<CardContent>
													<article>
														{message.message}
													</article>
												</CardContent>
											</Card>
										))}
									</div>
								</ScrollArea>
							) : (
								<div className="flex flex-col w-full min-h-[300px] h-full justify-center items-center space-y-4">
									<MessageSquareOff size={"36"} />
									<h3 className="font-bold">
										ยังไม่มีข้อความ...
									</h3>
								</div>
							)}
						</>
					)}
				</CardContent>
				<CardFooter>
					<div className="inline-flex w-full justify-end space-x-2">
						<Link href="/home" className="w-full">
							<Button className="w-full" variant={"outline"}>
								กลับหน้าหลัก
							</Button>
						</Link>
						{loading ? (
							<Button className="w-full">
								<Loader2 className="animate-spin" />
								กำลังรีีเฟรช
							</Button>
						) : (
							<Button
								onClick={() => setReload(!reload)}
								className="w-full bg-green-600 hover:bg-green-700"
							>
								รีเฟรช
							</Button>
						)}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
