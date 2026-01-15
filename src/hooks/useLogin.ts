import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/helper/toast";
import { setCookies } from "@/lib/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { loginAction } from "@/app/_actions/useAuth";
import request from "@/utils/axios";

export const loginFormSchema = z.object({
  username: z.string().trim().nonempty({ message: "Email is required" }),
  password: z.string().trim().nonempty({ message: "Password is required" }),
});

interface loginInterface {
  status: string;
  data: any;
}

export function useLogin(): {
  handleLogin: (data: FormData) => Promise<void>;
  loading: boolean;
} {
  const router = useRouter();
  const params = useSearchParams();

  const { mutate, isPending } = useMutation({
    mutationFn: async (user_data: FormData): Promise<loginInterface> => {
      return await loginAction(user_data);
    },
    onSuccess: async (data: loginInterface): Promise<void> => {
      if (data?.status == "error") {
        showToast(`${data?.data?.detail}`, "error");
        return;
      }
      await setCookies(data?.data?.data?.access_token, "token");
      await saveUser();

      if (params.get("from")) {
        return router.push(params.get("from") as string);
      }
      return router.push("/");
    },
    onError: (error): void => {
      console.log(error);
    },
  });

  async function saveUser(): Promise<void> {
    const res: { data: { User: any } } = await request.get("/users/profile");
    localStorage.setItem("user", JSON.stringify(res?.data?.User));
    return;
  }
  async function handleLogin(data: FormData): Promise<void> {
    return mutate(data);
  }

  return { handleLogin, loading: isPending };
}
