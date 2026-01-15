"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { RootState, useAppSelector } from "@/redux/store";
import { useInitStore } from "./zustandStore";
// import request from "@/utils/axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNavbar from "@/components/BottomNavbar";
import SideNavbar from "@/components/SideNavbar";

// async function getUserProfile() {
//   // const getCards = await request.get("/users/profile");
//   // console.log(getCards);
// }

export default function Home() {
  const router = useRouter();
  const { count, add, remove } = useInitStore((state: any) => state);
  // const { message } = useAppSelector((state: RootState) => state.init);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // getUserProfile();
  }, []);

  return (
    <div className={"min-h-screen"}>
      <h1>{count}</h1>
      <Button onClick={add}>Click me</Button>
      <Button onClick={remove}>Click me</Button>
      <Button onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => setOpen(!open)}>SideBar</Button>
      <SideNavbar open={open} onChange={setOpen} />
      <BottomNavbar />
    </div>
  );
}
