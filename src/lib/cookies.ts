"use server";

import { cookies } from "next/headers";

export async function setCookies(data: any, name: string) {
  const cookie = await cookies();
  cookie.set(`${name}`, `${data}`, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });
}

export async function getCookies(name: string) {
  const cookie = await cookies();
  if (!cookie.has(`${name}`)) return null;
  return cookie.get(`${name}`);
}
