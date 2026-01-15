"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
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
import { PhoneInput } from "@/components/ui/phone-input";
import useSignup, { signupFormSchema } from "@/hooks/useSignup";
import GoogleComponent from "@/components/Google";
const Signup = () => {
  const { handleSignup, loading } = useSignup();
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  function onSubmit(values: FormData) {
    return handleSignup(values);
  }

  return (
    <>
      <h1 className="font-semibold text-[40px] mb-3">Signup</h1>

      <Form {...signupForm}>
        <form action={signupForm.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
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
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    className="auth-input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Your Password"
                    className="auth-input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              variant="auth"
              className="h-[60px]"
              type="submit"
              loading={loading}
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <strong className="text-primary">
          <Link href="/login">Login</Link>
        </strong>
      </p>

      <GoogleComponent />
    </>
  );
};

export default Signup;
