import { getUserId } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prismaProvider";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await params;
		// if (!userId || userId !== (await getUserId())) throw new Error();

		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			},
			select: {
				id: true,
				username: true,
				publicLink: true,
				messagesReceived: true,
			},
		});

		return NextResponse.json({ message: "get user success", user });
	} catch (err) {
		console.error("path: /users/[userId] method: get error:", err);
		return NextResponse.json({}, { status: 500 });
	}
}

// Update public link
export async function PATCH(
	req: NextRequest,
	res: NextResponse,
	{ params }: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await params;
		if (!userId || userId !== (await getUserId())) throw new Error();

		const { publicLink } = await req.json();
		if (!publicLink) throw new Error();

		const hostPublicLink = process.env.HOST_PUBLIC_LINK as string;
		const user = await prisma.user.update({
			where: { id: userId },
			data: { publicLink: hostPublicLink.concat(publicLink) },
		});

		return NextResponse.json({
			message: "Create a public link successfully",
			publicLink: user.publicLink,
		});
	} catch (err) {
		console.error("path: /users/[userId] method: patch error:", err);
		return NextResponse.json(
			{ error: "Failed to create public link" },
			{ status: 500 }
		);
	}
}
