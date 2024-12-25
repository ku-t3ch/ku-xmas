import { NextRequest, NextResponse } from "next/server";
import { signInFormSchema } from "@/lib/schema";
import prisma from "../../../../../prisma/prismaProvider";
import { lucia } from "@/lib/lucia";
import { Scrypt } from "lucia";

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

		const script = new Scrypt();
		const result = await script.verify(user.password, password);
		if (!result) {
			throw new Error();
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		return NextResponse.json(
			{ message: "Login successfully" },
			{
				headers: {
					"Set-Cookie": sessionCookie.serialize(),
				},
			}
		);
	} catch (err) {
		console.error("path: /login method: post error:", err);
		return NextResponse.json(
			{ error: "Username or password is wrong" },
			{ status: 500 }
		);
	}
}
