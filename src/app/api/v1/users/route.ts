/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaProvider";
import { generateId } from "lucia";
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

		const hashedPassword = await bcrypt.hash(password, 10);
		await prisma.user.create({
			data: {
				id: generateId(16),
				username,
				password: hashedPassword,
			},
		});

		return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ" });
	} catch (err) {
		console.error(err);
		return NextResponse.json({}, { status: 500 });
	}
}
