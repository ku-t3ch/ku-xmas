/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import { pb } from "../pocketbase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = body;

        try {
            const _ = await pb.collection('people').getFirstListItem(`username="${username}"`);
            return NextResponse.json({ status: 400, message: "มีชื่อผู้ใช้นี้อยู่ในระบบแล้ว" })
        } catch (_) { }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            username,
            password: hashedPassword
        };
        await pb.collection('people').create(data);

        return NextResponse.json({ status: 200, message: "สมัครสมาชิกสำเร็จ" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 500, message: "เกิดข้อผิดพลาดในขณะกำลังสร้างผู้ใช้งานใหม่"});
    }
}