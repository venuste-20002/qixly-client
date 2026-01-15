"use client";

import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import { Card } from "@/components/ui/card";
import ImageShow from "@/components/ImageShow";
import { userCart } from "@/helper/getUserCart";

function Headers() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { cartData } = userCart();

  let user = {};
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user")!);
  }

  return (
    <>
      {/*Header*/}
      <div className={"flex justify-between items-center"}>
        <Button variant="header" onClick={() => setOpen(!open)}>
          {" "}
          <AlignLeft />
        </Button>
        <div className={"text-center"}>
          <p>Location</p>
          <p className={"text-primary font-medium"}>Kigali, Rwanda</p>
        </div>
        {user ? (
          <>
            <Card
              className={
                "relative w-[50px] h-[50px] shadow-[0px_10px_20px] shadow-primary/30 cursor-pointer flex justify-center items-center"
              }
              onClick={() => router.push("/cart")}
            >
              <ImageShow
                src={"/cart.png"}
                alt={"User"}
                className="object-cover"
                width={35}
                height={50}
              />
              {cartData?.cart_items && cartData?.cart_items?.length > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-primary p-1">
                  {cartData?.cart_items.length}
                </span>
              )}
            </Card>
          </>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
      <SideNavbar open={open} onChange={setOpen} />
    </>
  );
}

export default Headers;
