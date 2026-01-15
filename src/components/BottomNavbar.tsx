import React from "react";
import { House, ShoppingCart, TextSearch, User, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/*
 * @isSelectedLink
 * @param {string} path
 * @return {boolean}
 * */
function isSelectedLink(path: string) {
  const pagePathname: string = usePathname();
  return pagePathname === path;
}

/*
 * @FooterLinks Interface
 * @param {string} path
 * @param {React.ComponentType<{ className?: string }>} icon
 * @param {string} name
 * @return {TSX.Element}
 * */
interface FooterLinksProps {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

/*
 * @FooterLinks
 * @param {string} path
 * @return {TSX.Element}
 * */
function FooterLinks({ path, icon: Icon, name }: FooterLinksProps) {
  const isActive = isSelectedLink(path);
  return (
    <div
      className={`${isActive ? "text-primary" : "hover:text-primary"} flex flex-col items-center justify-center`}
    >
      <Link
        href={path}
        className={"flex flex-col items-center justify-center text-[0.75em]"}
      >
        {Icon && <Icon className={"text-center w-full"} />}
        <p>{name}</p>
      </Link>
    </div>
  );
}

export default function BottomNavbar() {
  return (
    <>
      <footer
        className={
          "fixed h-[60px] min-w-[100%] py-2 rounded-t-2xl bg-white border border-gray-200 z-50 bottom-0 flex justify-around"
        }
      >
        <FooterLinks path={"/home"} name={"Home"} icon={House} />
        <FooterLinks path={"/shops"} name={"Shops"} icon={TextSearch} />
        <FooterLinks path={"/cart"} name={"Cart"} icon={ShoppingCart} />
        <FooterLinks path={"/payments"} name={"Payments"} icon={Wallet} />
        <FooterLinks path={"/account"} name={"Account"} icon={User} />
      </footer>
    </>
  );
}
