"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, SignIn } from "@/services/api/auth";

const Login = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: LoginPayload) => await SignIn(data),
    onSuccess(data) {
      localStorage.setItem("_token", data?.token);
      navigate.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <div className="my-4">
              <img
                src={"/enchry-logo.png"}
                className="w-[180px] block mx-auto"
              />
            </div>

            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Log in to access your secure IoT monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Please wait..." : "Log in"}
              </Button>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </form>
          </CardContent>
          <CardFooter className="flex-col">
            <div className="text-center text-sm text-muted-foreground mt-2">
              Don't have an account?{" "}
              <Link
                href={ROUTES.signUp}
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
