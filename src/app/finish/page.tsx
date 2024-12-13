import React from "react";
import Particles from "@/components/ui/particles";
import Christmas from "@/components/ui/chirstmas";
import Logo from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const finish = () => {
  return (
    <main className="flex flex-col w-full justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <Particles
        className="absolute inset-0"
        quantity={200}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <Logo />
      <Card className="relative overflow-hidden border-0 min-w-[350px]">
        <CardHeader>
          <CardTitle className=" w-72 inline-flex font-bold text-xl text-center">
            ต้นไม้ของคุณ,ฟหกฟหกฟหกฟกหฟsdasdsadsadasasd
          </CardTitle>
          <div className="inline-flex justify-center items-center">
            <Christmas />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition-all"
          >
            ดูรายการคำอวยพร
          </Button>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition-all"
          >
            กดเพื่อแชร์ลิงก์ตนเอง
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default finish;
