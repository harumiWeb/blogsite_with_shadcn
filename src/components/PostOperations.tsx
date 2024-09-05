"use client";

import { Post } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Icons } from "@/src/components/icons/Icons";
import Link from "next/link";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

const deletePost = async (postId: string) => {
  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if(!res.ok) {
      throw new Error("Failed to delete post");
    }
    if(res.ok) {
      return toast({
        description: "投稿を削除しました。",
      });
    }

  } catch (error) {
    return toast({
      title: "エラーが発生しました",
      description: "投稿の削除に失敗しました。もう一度お試しください。",
      variant: "destructive",
    });
  }
}

export default function PostOperations({ post }: PostOperationsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-gray-300 rounded-full p-1 transition-colors">
          <Icons.ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <Link href={`/editor/${post.id}`} className="w-full">編集</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => setShowDeleteDialog(true)}>
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。これにより、投稿が完全に削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={async (event) => {
              event.preventDefault();
              setIsDeleteLoading(true);
              await deletePost(post.id);
              router.refresh();
              setShowDeleteDialog(false);
              setIsDeleteLoading(false);
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleteLoading ? <Icons.spinner className="w-4 h-4 animate-spin min-w-[2em]" /> : "削除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
