"use client";

import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useState, useCallback, useRef } from "react";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostSchemaType } from "@/src/lib/post/validations";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface EditorProps {
  post?: Pick<Post, "id" | "title" | "content" | "published" | "createdAt">;
}

export default function Editor({ post }: EditorProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ref = useRef<EditorJS | null>(null);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const body = postSchema.parse(post);
    const editor = new EditorJS({
      holder: "editor",
      placeholder: "ここに記事を書く",
      inlineToolbar: true,
      data: body.content,
      onReady: () => {
        ref.current = editor;
      },
      tools: {
        header: Header,
        linkTool: LinkTool,
        list: List,
        code: Code,
      },
    });
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }
    return () => {
      ref.current?.destroy();
      ref.current = null;
    };
  }, [isMounted, initializeEditor]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostSchemaType) => {
    setIsSaving(true);
    try {
      const blocks = await ref.current?.save();
      const response = await fetch(`/api/posts/${post?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data.title, content: blocks }),
      });
      if(!response.ok) {
        return toast({
          title: "エラーが発生しました",
          description: "保存に失敗しました。もう一度お試しください。",
          variant: "destructive",
        });
      }
      router.refresh();
      toast({
        description: "記事が保存されました。",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10 px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              戻る
            </Link>
            <p className="text-sm text-muted-foreground">公開</p>
          </div>
          <button className={cn(buttonVariants())} type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin min-w-[2em]" /> : "保存"}
          </button>
        </div>
        <div className="max-w-[750px] mx-auto w-full">
          <TextareaAutosize
            id="title"
            autoFocus
            placeholder="Post Title"
            className="w-full resize-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            defaultValue={post?.title}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div id="editor" className="min-h-[500px]" />
        <p>
          Use{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>
    </form>
  );
}
