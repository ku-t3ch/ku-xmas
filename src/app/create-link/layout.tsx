import getUser from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
