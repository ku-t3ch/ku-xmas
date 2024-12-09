"use client";

import { useRouter } from "next/navigation";
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

export default function SignIn() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    console.log(username, password);
    router.push('/home')
  };

  return (
    <main className="flex flex-col w-full justify-center items-center min-h-screen bg-neutral-900">
      {/* <Background /> */}
      <Particles
        className="absolute inset-0"
        quantity={200}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <Card className="relative overflow-hidden border-0 min-w-[350px]">
        <CardHeader>
          <div className="inline-flex justify-center items-center">
            <Logo />
          </div>
          <CardTitle className="w-full inline-flex justify-center font-bold text-2xl">
            เข้าสู่ระบบ
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
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 transition-all"
              onClick={onSubmit}
            >
              เข้าสู่ระบบ
            </Button>
            <div className="inline-flex items-center justify-center w-full mt-8 gap-2">
              <h3>ยังไม่มีบัญชี ? </h3>
              <Link href={"/sign-up"} className="underline">
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
