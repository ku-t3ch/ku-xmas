import { pb } from "../pocketbase";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        try {
            const userRecord = await pb.collection("people").getFirstListItem(`username="${username}"`);
            const result = await bcrypt.compare(password, userRecord.password);
            
            if (!result) {
                throw new Error();
            }
        } catch (err) {
            return Response.json({ status: 400 });
        }   

        return Response.json({ status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ status: 500 });
    }
}