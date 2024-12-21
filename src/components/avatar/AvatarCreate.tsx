"use client";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import RenderChristmasTree from "./RenderChristmasTree";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

export type categoriesType = "accessory" | "face" | "shoe";

interface categoryAttr {
	label: string;
	key: categoriesType;
	totalAssets: number;
	relativePath: string;
	prefixFileName: string;
	fileExt: string;
}

const accessoriesAttr: categoryAttr = {
	label: "ของตกแต่ง",
	key: "accessory",
	totalAssets: 6,
	relativePath: "/image/asset/accessories/",
	prefixFileName: "acc_",
	fileExt: ".png",
};

const facesAttr: categoryAttr = {
	label: "ใบหน้า",
	key: "face",
	totalAssets: 5,
	relativePath: "/image/asset/faces/",
	prefixFileName: "face_",
	fileExt: ".png",
};
const shoesAttr: categoryAttr = {
	label: "รองเท้า",
	key: "shoe",
	totalAssets: 3,
	relativePath: "/image/asset/shoes/",
	prefixFileName: "shoe_",
	fileExt: ".png",
};

const categories: categoryAttr[] = [accessoriesAttr, facesAttr, shoesAttr];

export default function AvatarCreate() {
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
	const [tempSelected, setTempSelected] = useState("1");
	const [trigger, setTrigger] = useState(false);

	const handleSaveInfo = async () => {
		if (!userId) {
			toast.error("ไม่สามารถยืนยันผู้ใช้งานได้");
			return router.push("/sign-in");
		}

		const res = axios.patch(`/api/v1/users/${userId}`, {
			createdAvatar: true,
			avatar: JSON.stringify(avatarInfo),
		});
		toast.promise(res, {
			loading: "กำลังบันทึกข้อมูล",
			error: (err) =>
				err.response.data.error ?? "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
			success: () => {
				router.push("/home");
				return "บันทึกข้อมูลสำเร็จ";
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
				const { avatar } = resUser.data.user;

				if (avatar !== "") {
					setAvatarInfo(JSON.parse(avatar));
				}

			} catch (err) {
				console.error(err);
				toast.error("ไม่สามารถยืนยันผู้ใช้งานได้");
				router.push("/sign-in");
			}
		};
		fetchUser();
	}, [router]);

	useEffect(() => {
		setTrigger((prev) => !prev);
	}, [avatarInfo]);

	return (
		<div className="flex flex-col w-full justify-center items-center">
			<Card>
				<CardHeader>
					<div className="flex w-full space-x-2 items-center">
						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => router.push("/home")}
						>
							<ChevronLeft />
						</Button>
						<CardTitle>ปรับแต่งต้นคริสต์มาสของคุณ</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<RenderChristmasTree
						avatarInfo={avatarInfo}
						trigger={trigger}
					/>
					<div className="flex w-full space-x-4">
						{categories.map((object, key) => (
							<Drawer key={key}>
								<DrawerTrigger>
									<Button variant={"outline"}>
										{object.label}
									</Button>
								</DrawerTrigger>
								<DrawerContent className="min-h-[70vh]">
									<DrawerHeader>
										<DrawerTitle>
											{object.label}
										</DrawerTitle>
										<DrawerDescription>
											เลือกได้เพียง 1 ชิ้น
										</DrawerDescription>
									</DrawerHeader>
									<ScrollArea className="h-[300px] w-full rounded-md">
										<ToggleGroup
											type="single"
											className="grid grid-cols-3 w-full gap-5"
											onValueChange={(e) =>
												setTempSelected(e)
											}
										>
											<ToggleGroupItem
												value={""}
												key={key}
												className="w-full h-full"
											>
												<h3>ไม่ใส่</h3>
											</ToggleGroupItem>
											{[
												...Array(
													object.totalAssets
												).keys(),
											]
												.map(
													(i) =>
														object.relativePath +
														object.prefixFileName +
														(i + 1) +
														object.fileExt
												)
												.map((imagePath, key) => {
													return (
														<ToggleGroupItem
															value={
																object.relativePath +
																object.prefixFileName +
																(
																	key + 1
																).toString() +
																object.fileExt
															}
															key={key}
															className="w-full h-full"
														>
															<Image
																src={imagePath}
																width={100}
																height={100}
																alt="custom"
															/>
														</ToggleGroupItem>
													);
												})}
										</ToggleGroup>
									</ScrollArea>
									<DrawerFooter className="w-full">
										<div className="w-full flex p-4 space-x-4">
											<DrawerClose className="w-full">
												<Button
													variant="outline"
													className="w-full"
												>
													ยกเลิก
												</Button>
											</DrawerClose>
											<DrawerClose className="w-full">
												<Button
													className="w-full bg-green-600 hover:bg-green-700"
													onClick={() => {
														setAvatarInfo(
															(prev) => {
																const newCustom =
																	prev;
																newCustom[
																	object.key
																] =
																	tempSelected;
																console.log(
																	newCustom
																);
																return newCustom;
															}
														);
														setTrigger(
															(prev) => !prev
														);
													}}
												>
													ยืนยัน
												</Button>
											</DrawerClose>
										</div>
									</DrawerFooter>
								</DrawerContent>
							</Drawer>
						))}
					</div>
					<Button
						className="bg-green-600 hover:bg-green-700 w-full"
						onClick={handleSaveInfo}
					>
						บันทึก
					</Button>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
	);
}
