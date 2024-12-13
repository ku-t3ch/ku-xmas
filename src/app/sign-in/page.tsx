"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";

import Logo from "@/components/logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInFormSchema } from "@/lib/schema";
import SnowfallBackground from "@/components/snowFallBackground";

export default function SignIn() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    const req = axios.post("/api/v1/login", values);
    toast.promise(req, {
      loading: "กำลังเข้าสู่่ระบบ",
      error: (err) =>
        err.response.data.error ?? "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
      success: () => {
        router.push("/home");
        return "เข้าสู่ระบบสำเร็จ";
      },
    });
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
      <SnowfallBackground />
      <Card className="absolute border-0 min-w-[350px]">
        <CardHeader>
          <div className="inline-flex justify-center items-center">
            <Logo />
          </div>
          <CardTitle className="w-full inline-flex justify-center font-bold text-2xl">
            เข้าสู่ระบบ
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-green-600 hover:bg-green-700 transition-all"
                type="submit"
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full">
            <div className="inline-flex items-center justify-center w-full mt-8 gap-2">
              <h3>ยังไม่มีบัญชี ? </h3>
              <Link href={"/sign-up"} className="underline">
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
