"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Power } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/app/_actions/useAuth";
import { showToast } from "@/helper/toast";

/*
 * @Links Interface
 * @param {React.ComponentType<{ className?: string }>} icon
 * @param {string} name
 * @return {TSX.Element}
 * */
interface LinksProps {
  icon: string;
  name: string;
  link: string;
}

/*
 * @SideBar Interface
 * @param {boolean} open
 * @param {(open: boolean) => void} onChange
 * @return {TSX.Element}
 * */
interface SideBarProps {
  open: boolean;
  onChange: (open: boolean) => void;
}

/*
 * @SideBar
 * @param {SideBarProps} { open, onChange }
 * @return {TSX.Element}
 * */
export default function SideNavbar({ open, onChange }: SideBarProps) {
  const router = useRouter();

  let user = {
    email: undefined,
    name: undefined,
  };
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user")!);
  }

  /*
   * @Links
   * @param {LinksProps} { icon, name }
   * @return {TSX.Element}
   * */
  function Links({ icon: Icon, name, link }: LinksProps) {
    const pathname: string = usePathname();
    return (
      <div className={"flex items-center gap-5 mb-5 cursor-pointer"}>
        <Link href={link} className={"flex items-center gap-5"}>
          <Image src={Icon!} alt={"icon"} width={25} height={25} />
          <p className={`${pathname === link ? "text-primary" : ""}`}>{name}</p>
        </Link>
      </div>
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await logoutUser(),
    onSuccess() {
      localStorage.clear();
      showToast("Logged out successfully", "success");
      router.push("/login");
    },
  });

  return (
    <Sheet onOpenChange={onChange} open={open}>
      <SheetContent className={"background_gradient"} side={"left"}>
        <div className={"h-full flex flex-col"}>
          {/*SideBar header*/}
          <SheetHeader className={"mb-10"}>
            <Image
              src={"/unknown_user.jpg"}
              alt={"logo"}
              width={100}
              height={100}
              className={"rounded-full border shadow-[0px_8px_40px_#FFC52940]"}
            />
            <SheetTitle className={"text-left"}>{user?.name}</SheetTitle>
            <SheetDescription className={"text-left"}>
              {user?.email}
            </SheetDescription>
          </SheetHeader>
          {/*sidebar links */}
          <Links name={"My Cards"} icon={"/cards.svg"} link={"/orders"} />
          <Links name={"shops"} icon={"/location.svg"} link={"/shops"} />
          <Links name={"Cart"} icon={"/contact.svg"} link={"/cart"} />
          <Links name={"Payments"} icon={"/billing.svg"} link={"/payments"} />
          <Links name={"My Account"} icon={"/profile.svg"} link={"/account"} />
          {/*Sidebar footer*/}
          <div className={"mt-auto"}>
            <SheetFooter>
              <Button
                className={
                  "max-w-[50%] px-4 h-[43px] rounded-full text-xl mr-auto"
                }
                loading={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  mutate();
                }}
              >
                <div className={"p-2 bg-white rounded-full"}>
                  <Power className={"font-bold text-primary"} />
                </div>
                Log out
              </Button>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
