import { z } from "zod";

const username = z
	.string()
	.nonempty({ message: "โปรดระบุชื่อผู้ใช้งาน" })
	.min(1, { message: "ความยาวชื่อผู้ใช้งานขั้นต่ำ 1 ตัวอักษร" })
	.trim();
const password = z
	.string()
	.nonempty({ message: "โปรดระบุรหัสผ่าน" })
	.min(4, { message: "ความยาวรหัสผ่านขั้นต่ำ 4 ตัวอักษร" })
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
