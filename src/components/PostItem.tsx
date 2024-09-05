import { Post } from "@prisma/client";
import Link from "next/link";
import { format } from "date-fns";
import PostOperations from "./PostOperations";

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <Link
        href={`/editor/${post.id}`}
        className="flex items-center justify-between hover:underline transition-colors w-full"
      >
        <div className="grid gap-1">
          <p className="font-semibold">{post.title}</p>
          <div>
            <p className="text-sm text-muted-foreground">
              {format(post.createdAt, "yyyy/MM/dd HH:mm")}
            </p>
          </div>
        </div>
      </Link>
      <PostOperations post={post} />
    </div>
  );
}
