import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signInFormSchema } from "@/lib/schema";
import prisma from "../../../../../prisma/prismaProvider";
import { lucia } from "@/lib/lucia";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const userData = signInFormSchema.safeParse(body);
		if (!userData.success) throw new Error();

		const { username, password } = userData.data;

		const user = await prisma.user.findFirst({
			where: {
				username,
			},
		});
		if (!user) throw new Error();

		const result = await bcrypt.compare(password, user.password);
		if (!result) {
			throw new Error();
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		return NextResponse.json(
			{ message: "เข้าสู่ระบบสำเร็จ" },
			{
				status: 200,
				headers: {
					"Set-Cookie": sessionCookie.serialize(),
				},
			}
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
			{ status: 500 }
		);
	}
}
