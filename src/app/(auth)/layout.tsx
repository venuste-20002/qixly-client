"use client";

import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative font-sans">
      <div className="absolute top-0 left-0 z-1">
        <img
          src="/left_header.svg"
          alt="Vercel Logo"
          width={180}
          height={180}
        />
      </div>
      <div className="absolute top-0 right-0 z-1">
        <img src="/right_header.svg" alt="Vercel Logo" width={70} height={70} />
      </div>

      <div className="z-50 absolute w-[100%] p-4">
        <div className="m-auto max-w-[500px]">
          <div className="flex justify-center flex-col py-[50px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
