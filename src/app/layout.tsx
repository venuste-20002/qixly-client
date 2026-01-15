import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/app/reduxProvider";
import ReactQueryProvider from "./reactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export const metadata: Metadata = {
  title: "QIXLY  Card",
  description: "Ticket Card",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-0 bg-[#F8FAFC]">
        <ClientProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <ToastContainer
            limit={3}
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            pauseOnFocusLoss={false}
          />
        </ClientProvider>
      </body>
    </html>
  );
}
