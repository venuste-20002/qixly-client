import { Button } from "./ui/button";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { googleRedirect } from "@/app/_actions/useAuth";

export default function GoogleComponent() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  async function initGoogle() {
    setLoading(true);
    try {
      await googleRedirect();
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-200" />
        <h2 className="mx-4 flex-shrink text-xl text-gray-600">
          {pathname == "/login" ? "Sign in with" : "Sign up with"}
        </h2>
        <div className="flex-grow border-t border-gray-200" />
      </div>
      <div className="flex w-full justify-center">
        <Button
          variant="google"
          className="h-[57px] text-[13px]"
          loading={loading}
          onClick={initGoogle}
        >
          <Image src="/google.svg" alt="Vercel Logo" width={40} height={40} />
          Google
        </Button>
      </div>
    </>
  );
}
