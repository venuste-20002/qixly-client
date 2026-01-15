import { setCookies } from "@/lib/cookies";
import { NextResponse } from "next/server";
import requestAxios from "@/utils/axios";
interface  googleInterface {
  data: {
    access_token: string;
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    const queryParams = new URLSearchParams({
      state: params.state,
      code: params.code,
      scope: params.scope,
      authuser: params.authuser,
      prompt: params.prompt,
    }).toString();

    const response:googleInterface = await requestAxios.get(
      `/auth/google/callback?${queryParams}`,
    );

    await setCookies(response?.data?.access_token, "token");

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
