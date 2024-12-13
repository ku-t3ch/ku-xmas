import { z } from "zod";

const username = z
	.string()
	.nonempty({ message: "โปรดระบุชื่อผู้ใช้งาน" })
	.min(1, { message: "ความยาวชื่อผู้ใช้งานขั้นต่ำ 1 ตัวอักษร" })
	.max(32, { message: "รองรับความยาวชื่อผู้ใช้งานสูงสุด 32 ตัวอักษร" })
	.trim();
const password = z
	.string()
	.nonempty({ message: "โปรดระบุรหัสผ่าน" })
	.min(4, { message: "ความยาวรหัสผ่านขั้นต่ำ 4 ตัวอักษร" })
	.max(32, { message: "รองรับความยาวรหัสผ่านสูงสุด 32 ตัวอักษร" })
	.trim();

export const signInFormSchema = z.object({
	username,
	password,
});

export const signUpFormSchema = z
	.object({
		username,
		password,
		confirmPassword: password,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "รหัสผ่านไม่ตรงกัน",
		path: ["confirmPassword"],
	});

export const messageFormSchema = z.object({
	senderName: z
		.string()
		.nonempty({ message: "โปรดระบุชื่อผู้ส่ง" })
		.min(1, { message: "ความยาวชื่อผู้ส่งขั้นต่ำ 1 ตัวอักษร" })
		.max(32, { message: "ความยาวชื่อผู้ส่งสูงสุด 32 ตัวอักษร" })
		.trim(),
	message: z
		.string()
		.nonempty({ message: "โปรดระบุเนื้อหาของคำอวยพร" })
		.min(1, { message: "เนื้อหาต่ำสุด 1 ตัวอักษร"})
		.max(255, { message: "เนื้อหาสูงสุด 256 ตัวอักษร"})
		.trim(),
});
