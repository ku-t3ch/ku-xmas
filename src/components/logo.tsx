"use client";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image
        src="/image/kutech.png"
        alt="KU Tech Logo"
        width={150}
        height={120}
      />
    </div>
  );
}
