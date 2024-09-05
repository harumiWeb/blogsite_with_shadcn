import DashboardShell from "@/src/components/DashboardShell";
import DashboardHeader from "@/src/components/DashboardHeader";
import PostCreateButton from "@/src/components/PostCreateButton";
import { prisma } from "@/auth";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/lib/session";
import PostItem from "@/src/components/PostItem";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const userId = user.id;
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <DashboardShell>
      <DashboardHeader heading="記事投稿" text="記事の投稿を管理">
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts.length === 0 ? (
          <div className="text-center text-muted-foreground min-h-[50vh] flex items-center justify-center">
            投稿がありません。
          </div>
        ) : (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
            <PostItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}