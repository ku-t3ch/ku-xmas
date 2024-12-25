/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaProvider";
import { generateId, Scrypt } from "lucia";
import { signUpFormSchema } from "@/lib/schema";

export async function POST(req: NextRequest) {
	try {
		//const body = await req.json();
		//const { username, password } = body;
		const body = await req.json();
		const userData = signUpFormSchema.safeParse(body);
		if (!userData.success) {
			throw new Error();
		}
		const { username, password } = userData.data;

		try {
			const user = await prisma.user.findFirst({
				where: {
					username,
				},
			});
			if (!user) throw new Error();

			return NextResponse.json(
				{ error: "มีชื่อผู้ใช้นี้อยู่ในระบบแล้ว" },
				{ status: 400 }
			);
		} catch (_) {}

		const script = new Scrypt();
		const hashedPassword = await script.hash(password);
		await prisma.user.create({
			data: {
				id: generateId(16),
				username,
				password: hashedPassword,
			},
		});

		return NextResponse.json({ message: "Sign up successfully" });
	} catch (err) {
		console.error("path: /users method: post error:", err);
		return NextResponse.json(
			{ error: "Sign up failed something went wrong" },
			{ status: 500 }
		);
	}
}
