import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const sessionId = (await cookies()).get("auth_session")?.value;

		if (!sessionId) {
			return NextResponse.json(
				{ error: "Session ID not found. User not signed in." },
				{ status: 401 }
			);
		}

		await lucia.invalidateSession(sessionId);
		const sessionCookie = lucia.createBlankSessionCookie();

		return NextResponse.json(
			{ message: "ออกจากระบบสำเร็จ" },
			{
				headers: {
					"Set-Cookie": sessionCookie.serialize(),
				},
			}
		);
	} catch (error) {
		console.error("path: /logout method: post error:", error);
		return NextResponse.json(
			{ error: "error when logout" },
			{ status: 500 }
		);
	}
}
