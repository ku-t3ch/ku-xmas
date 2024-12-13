/* eslint-disable @typescript-eslint/no-unused-vars */
import { lucia } from "@/lib/lucia";
import { getUserId } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = await getUserId();
        if (!userId) throw new Error();

        return NextResponse.json({
            userId,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }
}
