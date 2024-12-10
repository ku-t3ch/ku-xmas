"use client";

import Logo from "@/components/logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Particles from "@/components/ui/particles";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios"

const user = z.object({
  username: z.string().min(1, { message: "ความยาวชื่อผู้ใช้งานขั้นต่ำ 1 ตัวอักษร"}).trim(),
  password: z.string().min(4, { message: "ความยาวรหัสผ่านขั้นต่ำ 4 ตัวอักษร"}).trim(),
  confirmPassword: z.string().min(4, { message: "ความยาวรหัสผ่านขั้นต่ำ 4 ตัวอักษร" }).trim(),
});

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUp = async () => {
    try {
      if (
        !username || 
        !password ||
        !confirmPassword ||
        password != confirmPassword
      ) {
        return toast.error("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
      }

      const result = user.safeParse({ username, password, confirmPassword });
      if (!result.success) {
        return toast.error(result.error.errors[0].message);
      }

      const res = await axios.post("/api/v1/users", {
        username,
        password,
      });
      const { data } = res;
      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <main className="flex flex-col w-full justify-center items-center min-h-screen bg-neutral-900">
      {/* <Background /> */}
      <motion.div>
        <Particles
          className="absolute inset-0"
          quantity={200}
          ease={80}
          color={"#ffffff"}
          refresh
        />
      </motion.div>
      <Card className="relative overflow-hidden border-0 min-w-[350px]">
        <CardHeader>
          <div className="inline-flex justify-center items-center">
            <Logo />
          </div>
          <CardTitle className="w-full inline-flex justify-center font-bold text-2xl">
            สมัครสมาชิก
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Label className="font-bold">ชื่อผู้ใช้งาน</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label className="font-bold">รหัสผ่าน</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label className="font-bold">ยืนยันรหัสผ่าน</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 transition-all"
              onClick={onSignUp}
            >
              สมัครสมาชิก
            </Button>
            <div className="inline-flex items-center justify-center w-full mt-8 gap-2">
              <h3>มีบัญชีอยู่แล้ว ? </h3>
              <Link href={"/sign-in"} className="underline">
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
