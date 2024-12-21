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
				createdAvatar: true,
				avatar: true,
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
	{ params }: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await params;
		if (!userId || userId !== (await getUserId())) throw new Error();

		// const { publicLink, avatar } = await req.json();
		const data = await req.json();
		if (data.publicLink) {
			const hostPublicLink = process.env.HOST_PUBLIC_LINK as string;
			data.publicLink = hostPublicLink.concat(data.publicLink);
		}

		const user = await prisma.user.update({
			where: { id: userId },
			data: data,
		});

		return NextResponse.json({
			message: "Update user successfully",
			publicLink: user.publicLink,
		});
	} catch (err) {
		console.error("path: /users/[userId] method: patch error:", err);
		return NextResponse.json(
			{ error: "Failed to update user" },
			{ status: 500 }
		);
	}
}
