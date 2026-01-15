import { signupAction } from "@/app/_actions/useAuth";
import { showToast } from "@/helper/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .trim()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(15, { message: "Password must be at most 15 characters long" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$&]{6,15}$/, {
      message: "Password must contain at least one letter, at least one number",
    }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: "Phone is required" })
    .max(15, { message: "Phone number must be at most 15 characters long" })
    .refine(isValidPhoneNumber, { message: "Enter a valid phone number" })
    .or(z.literal("")),
});

function useSignup() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (user_data: FormData) => {
      return signupAction(user_data);
    },

    onSuccess: (data: any) => {
      if (data?.status == "error") {
        showToast(`${data?.data.detail}`, "error");
        return;
      }
      const userId: string = data?.data?.data.id;

      if (!userId) {
        showToast("Signup failed: User ID not found", "error");
      }

      showToast("Signed up Successfully", "success");
      return router.push(`/verification?id=${userId}`);
    },
  });

  function handleSignup(user_data: FormData) {
    return mutate(user_data);
  }

  return { handleSignup, loading: isPending };
}
export default useSignup;
