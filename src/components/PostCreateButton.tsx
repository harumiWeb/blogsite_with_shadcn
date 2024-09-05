"use client";

import { cn } from "@/src/lib/utils";
import { buttonVariants } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface PostCreateButtonProps extends ButtonProps {}

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onClick = async () => {
    setIsLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
        // content: "Post Content",
      }),
    });
    setIsLoading(false);
    if(!res.ok) {
      return toast({
        title: "問題が発生しました。",
        description: "投稿の作成に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
    const post = await res.json();
    router.refresh();
    router.push(`/editor/${post.id}`);
  }

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        { "cursor-not-allowed opacity-60": isLoading },
        className
      )}
      {...props}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin min-w-[5em]" />
      ) : (
        "新しい投稿"
      )}
    </button>
  );
}
