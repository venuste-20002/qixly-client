"use client";

import React from "react";
import BottomNavbar from "@/components/BottomNavbar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="relative font-sans w-full">
      <div className="absolute top-0 left-0 z-1 w-full">
        <img src="/account_bg.svg" alt="Vercel Logo" className="w-full" />
      </div>
      <div className="z-50 absolute w-[100%] p-4">
        <div className="m-auto max-w-[500px]">
          <div className="flex justify-center flex-col py-[10px]">
            {children}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </main>
  );
};

export default layout;
