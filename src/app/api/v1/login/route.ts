import { pb } from "../pocketbase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = body;

        try {
            const userRecord = await pb.collection("people").getFirstListItem(`username="${username}"`);
            const result = await Bun.password.verify(password, userRecord.password);
            // const result = await bcrypt.compare(password, userRecord.password);
            
            if (!result) {
                throw new Error();
            }
        } catch (err) {
            console.log(err);
            throw new Error();
        }   

        return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" }, { status: 500 });
    }
}