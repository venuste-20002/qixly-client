"use client";

import React from "react";
import BottomNavbar from "@/components/BottomNavbar";

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className={"px-2 py-4 flex flex-col gap-3"}>
        <div className={"mb-[60px] flex flex-col gap-3"}>
          <div className="space-y-6">{children}</div>
        </div>
      </main>
      <BottomNavbar />
    </>
  );
}
