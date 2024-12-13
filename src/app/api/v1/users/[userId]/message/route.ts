import { messageFormSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prismaProvider";
import { generateId } from "lucia";

export async function POST(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	try {
		const body = await req.json();
		const messageData = messageFormSchema.safeParse(body);
		if (!messageData.success) throw new Error();

		const { senderName, message } = messageData.data;

		await prisma.message.create({
			data: {
				id: generateId(16),
				senderName,
				message,
				receiverId: params.userId,
			},
		});

        return NextResponse.json({ message: "create message success" });
	} catch (err) {
		console.error("path: /users/[userId]/message method: post error:", err);
		return NextResponse.json({}, { status: 500 });
	}
}
