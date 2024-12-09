
// import bcrypt from "bcrypt";
import { collection, getDocs } from "firebase/firestore";

// export async function POST(req: Request) {
//     try {
//         const res = await req.json();
//         const { username, password } = res;
//         const usersRef = collection(db, 'users');
//         const usersSnapshot = await getDocs(usersRef);
//         const users = usersSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));

//         console.log("Document written with ID: ", docRef.id);
//         return Response.json({ message: "success" });
//     } catch (e) {
//         console.error("Error adding document: ", e);
//         return Response.error();
//     }

//     // const res = await req.json(); 
//     // const { username, password } = res;
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     // const usersRef = collection(db, "users");

//     // try {
//     //     const res = await usersRef.add({
//     //         username,
//     //         password: hashedPassword,
//     // });

//     //     return Response.json(res.id);
//     // } catch (err) {
//     //     return Response.error();
//     // }
// }

export async function GET(req: Request) {
    try {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const users = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Response.json(users);
    } catch (error) {
        console.error('Error fetching data:', error);
        return Response.json({ error: 'Failed to fetch data' });
    }
}
