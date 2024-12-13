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

export default function CreateLink() {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black px-6">
      <SnowfallBackground />
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
