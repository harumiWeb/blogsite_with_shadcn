"use client";

import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "@/src/components/ui/button";
import GoogleIcon from "@/src/components/icons/GoogleIcon";
import GitHubIcon from "@/src/components/icons/GitHubIcon";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Spinner } from "./icons/Spinner";

export default function UserAuthForm() {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  return (
    <div className="container mx-auto px-4">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              type="email"
              id="email"
              required
              placeholder="example@gmail.com"
            />
          </div>
          <button
            className={cn(buttonVariants({ variant: "default" }))}
            disabled
          >
            メールアドレスでログイン
          </button>
        </div>
      </form>

      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full h-[1px] bg-gray-300 mt-2" />
          </div>
          <div className="relative px-2 text-sm md:text-base lg:text-lg text-muted-foreground flex justify-center mt-4">
            <span className="bg-card text-muted-foreground px-2 mt-2">
              または
            </span>
          </div>
        </div>
        <div className="relative flex flex-col gap-2 mt-4">
          <button
            className={cn(buttonVariants({ variant: "outline" }), "flex gap-2")}
            onClick={() => {
              setIsGoogleLoading(true);
              signIn("google",{callbackUrl:"/dashboard"})
            }}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? <Spinner /> : <GoogleIcon />}
            Googleでログイン
          </button>
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-gray-800 text-white flex gap-2 hover:bg-gray-900 hover:text-white"
            )}
            onClick={() => {
              setIsGithubLoading(true);
              signIn("github",{callbackUrl:"/dashboard"})
            }}
            disabled={isGithubLoading}
          >
            {isGithubLoading ? <Spinner /> : <GitHubIcon />}
            GitHubでログイン
          </button>
        </div>
      </div>
    </div>
  );
}
