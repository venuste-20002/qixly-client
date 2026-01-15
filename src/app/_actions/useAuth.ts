"use server";

import request from "@/utils/axios";
import { redirect } from "next/navigation";
import { setCookies } from "@/lib/cookies";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  try {
    const res: any = await request.post("/auth/signin", formData);
    return { status: "success", data: res };
  } catch (error: any) {
    return { status: "error", data: error?.data };
  }
}

export async function getUserProfile() {
  try {
    const res: any = await request.get("/users/profile");
    return { status: "success", data: res.data };
  } catch (error: any) {
    return { status: "error", data: error?.data };
  }
}

export async function signupAction(formData: FormData) {
  try {
    const res: any = await request.post("/auth/signup", formData);
    return { status: "success", data: res };
  } catch (error: any) {
    return { status: "error", data: error?.data };
  }
}

export async function verificationAction(
  payload: { token: string },
  id: string,
) {
  try {
    const res: any = await request.post(`/auth/verify-token/${id}`, payload); // Send JSON
    return { status: "success", data: res?.data };
  } catch (error: any) {
    return { status: "error", data: error?.response?.data };
  }
}

export async function resendTokenAction(email: string) {
  try {
    const res: any = await request.post(`/auth/resend-token`, { email }); // Send email for token resend
    return { status: "success", data: res?.data };
  } catch (error: any) {
    return { status: "error", data: error?.response?.data };
  }
}
export async function googleRedirect() {
  return redirect(`${process.env.BASE_BACKEND_URL}/auth/google`);
}

/*
 * Trusted Services Return
 * @param { status: string, message: string }
 * @param { status: string, data: any }
 * */
interface trustedServiceReturn<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
}

/*
 * Trusted Services
 * This function is used to authenticate a user from a trusted service
 * @param key: string
 * @returns { status: string, message: string }
 * @returns { status: string, data: any }
 * */
export async function trustedServices<T>(
  key: string,
): Promise<trustedServiceReturn<T>> {
  try {
    const res: any = await request.get(`auth/trusted/signin?key=${key}`);
    await setCookies(res.data.access_token, "token");
    return { status: "success", message: "Login successful" };
  } catch (error: any) {
    return { status: "error", data: error?.data };
  }
}

/*
 * logout user
 * this function logs out the user, deletes the user and localstorage
 * @return {status:string}
 * */
export async function logoutUser() {
  const cookie = await cookies();
  cookie.delete("token");
  return { status: "success" };
}
