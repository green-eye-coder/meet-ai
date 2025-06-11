"use client";

// Import dependencies and UI components
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
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
import { FaGoogle,FaGithub } from "react-icons/fa";

// Define validation schema for sign-in form using Zod
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, { message: "Password is required" }),
});

// SignInView component
export const SignInView = () => {
  // Router for navigation after successful sign-in


  // State for error messages and loading state
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    setError(null);
    setPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,

        callbackURL: "/", 
      },
      {
        onSuccess: () => {
          setPending(false);
          // Redirect to home page on success
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          console.error("Sign in error:", error);
          setError(error.message || "An error occurred during sign in");
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
          callbackURL:"/"
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
  

  return (
    <div>
      {/* Main card container for the sign-in form */}
      <div className="flex flex-col gap-6 shadow-[0_20px_50px_rgba(255,200,221,_0.7)] w-full md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto my-10">
        <Card className="overflow-hidden  p-0">
          <CardContent className="grid p-0 md:grid-cols-2 xl:grid-cols-2">
            <div>
              {/* Sign-in form */}
              <Form {...form}>
                {/* off default behaviour of the form */}
                <form
                  className="p-6 md:p-6 md:pb-4 "
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-6">
                    {/* Welcome message */}
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-l font-bold text-[#ff4d6d]">
                        Welcome back
                      </h1>
                      <p className="text-sm  text-balance text-muted-foreground">
                        Login to your account
                      </p>
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
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                {...field}
                                className=" border-red-300 "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Error alert if sign-in fails */}
                    {!!error && (
                      <Alert className="bg-destructive/10 border-none">
                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                        <AlertTitle>{error}</AlertTitle>
                      </Alert>
                    )}

                    {/* Submit button */}
                    <Button
                      disabled={pending}
                      type="submit"
                      id="sign-in"
                      // className=" bg-[#ff4d6d] "
                      className="bg-primary w-full hover:bg-[#ff4d6d] mt-3 text-white"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="flex flex-col gap-4 p-6 mt-0 md:p-6">
                {/* Divider for alternative sign-in methods */}
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-3">
                    Or continue with
                  </span>
                </div>
                {/* Social sign-in buttons (Google, GitHub) */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    disabled={pending}
                    onClick={(e) => {
                      onSocial("google");
                    }}
                    
                  >
                    {/* <img src="/icon/google.png" alt="" className="relative w-5" />{"Google"}
                     */}
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
                    <FaGithub></FaGithub>
                    {/* <img src="/icon/github.png" alt="" className="relative w-6" />{"GitHub"} */}
                  </Button>
                </div>
                {/* Link to sign-up page */}
                <div className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-[#ff4d6d] hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Logo and branding (visible on md+ screens) */}
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
