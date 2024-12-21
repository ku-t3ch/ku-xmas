"use client";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image
        src="/image/kutech.png"
        alt="KU Tech Logo"
        width={200}
        height={200}
      />
    </div>
  );
}
