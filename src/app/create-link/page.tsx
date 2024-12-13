"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SnowfallBackground from "@/components/snowFallBackground";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Image from "next/image";
import { motion } from "motion/react";
import { FaChevronLeft, FaCheck } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CreateLink() {
  const [currentLink, setCurrentLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (currentLink === "") {
      return toast.warning("ไม่สามารถคัดลอกได้หากคุณยังไม่ได้สร้างลิงค์");
    }

    navigator.clipboard.writeText(currentLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
      <SnowfallBackground />
      <Card className="relative">
        <CardHeader>
          <div className="inline-flex justify-center items-center">
            <Logo />
          </div>
          <CardTitle className="w-full inline-flex justify-center items-center space-x-4 text-2xl font-bold">
            มาสร้างเส้นทางมอบคำอวยพรให้คุณกัน
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center justify-center space-y-4">
          <Label className="w-full text-left">ลิงก์ของคุณ</Label>
          <div className="w-full flex space-x-2">
            <Input
              className="w-full truncate"
              value={currentLink ? currentLink : "ยังไม่ได้สร้าง"}
              disabled
            />
            {/* <motion.button
              className="mt-8 flex items-center px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
            >
              {isCopied ? (
                <>
                  <HiOutlineArrowRight className="mr-2 text-xl" />
                  คัดลอกลิงก์แล้ว
                </>
              ) : (
                <>
                  <HiOutlineClipboard className="mr-2 text-xl" />
                  คัดลอกลิงก์
                </>
              )}
            </motion.button> */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant={"outline"} onClick={handleCopy}>
                {isCopied ? (
                  <div className="inline-flex items-center space-x-2">
                    <FaCheck />
                    <p>คัดลอกลิงก์แล้ว</p>
                  </div>
                ) : (
                  <div className="inline-flex items-center space-x-2">
                    <FiCopy />
                    <p>คัดลอกลิงก์</p>
                  </div>
                )}
              </Button>
            </motion.div>
          </div>
          {/* <motion.div
            className="relative w-14 h-14 bg-white rounded-lg p-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{
              scale: [1, 1.05, 1],
              y: [20, 10, 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Image
              src={"/image/christmas-card.png"}
              alt="Christmas Card"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div> */}
        </CardContent>
        <CardContent className="flex flex-col items-center justify-center w-full space-y-2"></CardContent>
        <CardFooter className="flex justify-end space-x-2 mt-6">
          <Link href={"/home"}>
            <Button variant={"outline"}>กลับหน้าหลัก</Button>
          </Link>
          <Button>
            {currentLink === "" ? "สร้างลิงก์" : "สร้างลิงก์ใหม่"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
