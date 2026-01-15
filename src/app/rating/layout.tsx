"use client";

import React from "react";
import BottomNavbar from "@/components/BottomNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className={"px-2 py-4 flex flex-col gap-3"}>
        <div className={"mb-[60px] flex flex-col gap-3"}>{children}</div>
      </main>
      <BottomNavbar />
    </>
  );
}
