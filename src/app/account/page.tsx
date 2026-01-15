"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageShow from "@/components/ImageShow";
import { Card } from "@/components/ui/card";

/*
 * @UserInfo Interface
 * @param {string} label
 * @param {string} value
 * @return {TSX.Element}
 * */
interface UserInfoProps {
  label: string;
  value: string;
}

/*
 * @UserInfo
 * @param {UserInfoProps} { label, value }
 * @return {TSX.Element}
 * */
function UserInfo({ label, value }: UserInfoProps) {
  return (
    <div className={"space-y-1"}>
      <p className="capitalize">{label || "Full name"}</p>
      <Card
        className={"px-5 py-3 w-full rounded-xl hover:border-primary font-bold"}
      >
        {value || "User Name"}
      </Card>
    </div>
  );
}

/*
 * @User Interface
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @return {TSX.Element}
 * */
interface User {
  name: string;
  email: string;
  phone: string;
}

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  return (
    <div>
      {/*Back button*/}
      <div>
        <Button variant="header" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
      </div>
      {/*user Info*/}
      <div className="mt-5">
        {/*the user Image*/}
        <div className="w-full flex flex-col gap-5 items-center justify-center relative">
          <div className="w-[150px] h-[150px] p-5 rounded-full flex justify-center items-center bg-red-200/70 relative">
            <div className="w-full h-full relative border overflow-hidden rounded-full flex justify-center items-center p-5 bg-white min-w-[100px] min-h-[100px]">
              <ImageShow
                src="/unknown_user.jpg"
                alt="Profile picture"
                className="object-cover"
                fill
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute rounded-full p-2 bottom-4 right-4 bg-white hover:bg-gray-100"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className={"text-center mt-2"}>
          <p className={"text-3xl font-bold capitalize"}>{user?.name}</p>
          <Button variant={"link"}>Edit Profile</Button>
        </div>
        {/*user Info*/}
        <div className="space-y-3">
          <UserInfo label={"Full name"} value={user?.name!} />
          <UserInfo label={"email"} value={user?.email!} />
          <UserInfo label={"phone"} value={user?.phone!} />
        </div>{" "}
      </div>
    </div>
  );
}
