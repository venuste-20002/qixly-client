"use client";

import { showToast } from "@/helper/toast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { verificationAction, resendTokenAction } from "@/app/_actions/useAuth"; 


const signupFormSchema = z.object({
  email: z.string().email(),
});

function useVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id"); 

  if (!id) {
    showToast("Invalid verification link.", "error");
    return { handleVerification: () => {}, handleResend: () => {}, loading: false, isResending: false };
  }

  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: sendVerification, isPending: isSendingVerification } = useMutation({
    mutationKey: ["sendVerification"],
    mutationFn: async (data: { token: string }) => {
      return verificationAction({ token: data.token }, id);
    },
    onError: (error: any) => {
      showToast(error?.data?.detail || "Verification failed. Please try again.", "error");
    },
    onSuccess: (data: any) => {
      if (data.status === "error") {
        showToast(data.data.detail || "Verification failed.", "error");
        return;
      }
      const successMessage = data?.data?.detail || "Verification successful.";
      showToast(successMessage, "success");
      router.push("/login");
    },
  });

  
  const { mutate: resendToken, isPending: isResendingToken } = useMutation({
    mutationKey: ["resendToken"],
    mutationFn: async (email: string) => {
      return resendTokenAction(email); 
    },
    onError: (error: any) => {
      showToast(error?.data?.detail || "Failed to resend token. Please try again.", "error");
    },
    onSuccess: (data: any) => {
      if (data.status === "error") {
        showToast(data.data.detail || "Failed to resend token.", "error");
        return;
      }
      const successMessage = data?.data?.detail || "Resend successful.";
      showToast(successMessage, "success");
    },
  });


  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  function handleResend() {
    if (!id) {
      showToast("Invalid verification link.", "error");
      return;
    }

    const email = signupForm.getValues().email; 

    if (!isValidEmail(email)) {
      showToast("Invalid email address.", "error");
      return;
    }

    resendToken(email); 
  }

  return {
    handleVerification: sendVerification,
    handleResend,
    loading: isSendingVerification,
    isResending: isResendingToken,
    signupForm, 
  };
}

export default useVerification;