"use client";

import Logo from "@/components/logo";
import {
	// Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/lib/schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export default function SignUp() {
	const router = useRouter();

	const form = useForm<z.infer<typeof signUpFormSchema>>({
		defaultValues: {
			username: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(signUpFormSchema),
	});

	const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
		const req = axios.post("/api/v1/users", values);
		toast.promise(req, {
			loading: "กำลังสมัครสมาชิก",
			error: (err) =>
				err.response.data.error ??
				"เกิดข้อผิดพลาดระหว่างการสมัครสมาชิก",
			success: () => {
				router.push("/sign-in");
				return "สร้างผู้ใช้งานใหม่สำเร็จ";
			},
		});
	};

	return (
		<div className="min-w-[350px] text-white">
			<CardHeader>
				<div className="inline-flex justify-center items-center pb-6">
					<Logo />
				</div>
				<CardTitle className="w-full inline-flex justify-center font-bold text-2xl">
					สมัครสมาชิก
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ชื่อผู้ใช้งาน</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-white/10 backdrop-blur-md"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>รหัสผ่าน</FormLabel>
									<FormControl>
										<Input
											type="password"
											{...field}
											className="bg-white/10 backdrop-blur-md"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ยืนยันรหัสผ่าน</FormLabel>
									<FormControl>
										<Input
											type="password"
											{...field}
											className="bg-white/10 backdrop-blur-md"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700 transition-all"
						>
							สมัครสมาชิก
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<div className="flex flex-col w-full">
					<div className="inline-flex items-center justify-center w-full mt-8 gap-2">
						<h3 className="text-white/80">มีบัญชีอยู่แล้ว ? </h3>
						<Link href={"/sign-in"} className="underline">
							เข้าสู่ระบบ
						</Link>
					</div>
				</div>
			</CardFooter>
		</div>
	);
}
