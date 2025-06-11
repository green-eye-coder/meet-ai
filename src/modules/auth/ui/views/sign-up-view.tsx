"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { OctagonAlertIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {FaGithub, FaGoogle} from 'react-icons/fa';

// Define the validation schema for the sign-up form using Zod
const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// SignUpView component handles the sign-up form UI and logic
export const SignUpView = () => {
  const router = useRouter(); // Get the Next.js router for navigation
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [pending, setPending] = useState<boolean>(false); // State to indicate if sign-up is in progress

  // Initialize react-hook-form with Zod validation and default values
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSumit = (data: z.infer<typeof signUpSchema>) => {
    setError(null); // Reset error state
    setPending(true); // Set pending state to true
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,

        callbackURL: "/", // Redirect URL after sign-up
      },
      {
        onSuccess: () => {
          setPending(false); // Reset pending state
          router.push("/"); // Redirect to home page after successful sign-up
        },
        onError: ({ error }) => {
          setPending(false); // Reset pending state
          console.error("Sign up error:", error);
          setError(error.message || "An error occurred during sign up"); // Set error message
        },
      }
    );
  };

  // handle social sign-up (Google, GitHub)
  const onSocial = (provider: "google" | "github") => {
    setError(null); // Reset error state
    setPending(true); // Set pending state to true
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/", // Redirect URL after social sign-up
      },
      {
        onSuccess: () => {
          setPending(false); // Reset pending state
        },
        onError: ({ error }) => {
          setPending(false); // Reset pending state
          console.error("Social sign up error:", error);
          setError(error.message || "An error occurred during social sign up"); // Set error message
        },
      }
    );
  };

  // Render the sign-up form UI
  return (
    <div>
      {/* Main card container for the sign-up form */}
      <div className="flex flex-col gap-6 shadow-[0_20px_50px_rgba(255,200,221,_0.7)] w-full md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto my-10">
        <Card className="overflow-hidden  p-0">
          <CardContent className="grid p-0 md:grid-cols-2 xl:grid-cols-2">
            {/* Form component with react-hook-form integration */}
            <div className="">
              <Form {...form}>
                <form
                  className="pb-3 md:p-8 md:pb-3 "
                  onSubmit={form.handleSubmit(onSumit)}
                >
                  <div className="flex flex-col gap-6">
                    {/* Header section */}
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-l font-bold text-primary">
                        Let's get you started
                      </h1>
                      <p className="text-sm  text-balance text-muted-foreground">
                        Register to your account
                      </p>
                    </div>
                    {/* Name input field */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Ex: John Doe"
                                {...field}
                                className=" border-red-300 "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Email input field */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Ex: John@abc.com"
                                {...field}
                                className=" border-red-300 "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Password input field */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="*********"
                                {...field}
                                className=" border-red-300 "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Confirm password input field */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="*********"
                                {...field}
                                className=" border-red-300 "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Error alert if sign-up fails */}
                    {!!error && (
                      <Alert className="bg-destructive/10 border-none">
                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                        <AlertTitle>{error}</AlertTitle>
                      </Alert>
                    )}
                    {/* Sign Up button */}
                    <Button
                      disabled={pending}
                      type="submit"
                      // className="w-full bg-[#ff4d6d] hover:bg-[#ff4d6d]/90 text-white"
                      className="bg-primary w-full hover:bg-[#ff4d6d] mt-3 text-white"
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="flex flex-col gap-4 pt-3 pb-6 px-6 md:px-8">
                {/* Divider for alternative sign-up methods */}
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-3">
                    Or continue with
                  </span>
                </div>
                {/* Social sign-up buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    disabled={pending}
                    onClick={(e) => {
                      onSocial("google");
                    }}
                    
                  >
                    {/* <img src="/icon/google.png" alt="" className="relative w-5" />{"Google"} */}
                    <FaGoogle></FaGoogle>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    disabled={pending}
                    onClick={(e) => {
                      onSocial("github");
                    }}
                  >
                    {/* <img src="/icon/github.png" alt="" className="relative w-6" />{"GitHub"} */}
                    <FaGithub></FaGithub>
                  </Button>
                </div>
                {/* Link to sign-in page */}
                <div className="text-sm text-center text-muted-foreground">
                  Already have an account ?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Logo and branding (hidden on small screens) */}
            <div className="relative hidden bg-gradient-to-r from-[#febdc9] via-[#fe899f] to-[#fe6f89]   md:flex flex-col gap-y-4 items-center justify-center">
              <img src="logo/logo.svg" alt="Logo" className="h-[200px] w-[200px]" />
              {/* <p className="text-2xl font-semibold  text-[#7b2cbf]">Meet AI</p> */}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Terms of Service and Privacy Policy notice */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-3">
        By signing in, you agree to our{" "}
        <Link href="/#" className="text-[#ff4d6d] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/#" className="text-[#ff4d6d] hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
};
