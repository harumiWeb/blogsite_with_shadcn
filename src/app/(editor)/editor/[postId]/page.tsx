import { prisma } from "@/auth";
import Editor from "@/src/components/Editor";
import { getCurrentUser } from "@/src/lib/session";
import { Post, User } from "@prisma/client";
import { redirect } from "next/navigation";

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    }
  })
  return post;
}

export default async function EditorPage({params}: {params: {postId: string}}) {
  const {postId} = params;
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const post = await getPostForUser(postId,user?.id as string);
  if (!post) {
    redirect("/404");
  }
  return <Editor post={post} />;
}