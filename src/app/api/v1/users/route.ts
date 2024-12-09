import bcrypt from "bcrypt";
import { pb } from "../pocketbase";

export async function POST(req: Request) {
    try {
        const res = await req.json();
        const { username, password } = res;

        try {
            const _ = await pb.collection('people').getFirstListItem(`username="${username}"`);
            return Response.json({ status: 400, message: "มีชื่อผู้ใช้นี้อยู่ในระบบแล้ว" })
        } catch (_) { }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            username,
            password: hashedPassword
        };
        await pb.collection('people').create(data);

        return Response.json({ status: 200, message: "สมัครสมาชิกสำเร็จ" });
    } catch (err) {
        console.error(err);
        return Response.json({ status: 500, message: "เกิดข้อผิดพลาดในขณะกำลังสร้างผู้ใช้งานใหม่"});
    }

    // const res = await req.json(); 
    // const { username, password } = res;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const usersRef = collection(db, "users");

    // try {
    //     const res = await usersRef.add({
    //         username,
    //         password: hashedPassword,
    // });

    //     return Response.json(res.id);
    // } catch (err) {
    //     return Response.error();
    // }
}