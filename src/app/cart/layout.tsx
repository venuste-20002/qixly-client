"use client";

import React from "react";
import Headers from "@/components/Header";
import BottomNavbar from "@/components/BottomNavbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Headers />
     <main className={"py-4 flex flex-col gap-3"}>
        <div className={"mb-[60px] flex flex-col gap-3"}>{children}</div>
      </main>
      <BottomNavbar />
    </>
  );
}