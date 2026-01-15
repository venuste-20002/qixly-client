"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin, loginFormSchema } from "@/hooks/useLogin";
import GoogleComponent from "@/components/Google";

export function Login() {
  const { handleLogin, loading } = useLogin();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    await handleLogin(data);
  };

  return (
    <>
      <h1 className="font-semibold text-[40px] mb-3">Login</h1>
      <Form {...loginForm}>
        <form action={loginForm.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Full Name"
                    className="auth-input-field"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    className="auth-input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-primary text-center">
            <Link href="#">Forgot Password?</Link>
          </p>
          <div className="flex justify-center">
            <Button
              variant="auth"
              className="h-[60px]"
              type="submit"
              loading={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <strong className="text-primary">
          <Link href="/signup">Signup</Link>
        </strong>
      </p>
      <GoogleComponent />
    </>
  );
}

export default Login;
