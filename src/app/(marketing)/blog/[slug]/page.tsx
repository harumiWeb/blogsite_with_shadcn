import { allPosts } from "@/.contentlayer/generated";
import { Post } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import MDX from "@/src/components/MDX";
import { Metadata } from "next";

async function getPostFromSlug(slug: string) {
  const slugAsFindBlog = `/blog/${slug}`;
  const post: Post | undefined = allPosts.find(
    (post) => post.slug === slugAsFindBlog
  );
  return post;
}


export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const post: Post | undefined = await getPostFromSlug(params.slug);
  if(!post) {
    return {
      title: "404",
      description: "Not Found",
    }
  }
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostFromSlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto mt-24 max-w-4xl py-6 lg:py-10 px-6">
      <div>
        <p>
          投稿日：{post.date && format(parseISO(post.date), "yyyy年MM月dd日")}
        </p>
        <h1 className="text-4xl lg:text-6xl font-extrabold mt-4">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <div className="mt-12">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="border rounded-lg bg-muted"
          />
        </div>
      )}
      <hr className="my-12" />
      <div className="mt-12">
        <MDX code={post.body.code} />
      </div>
      <hr className="my-12" />
      <div className="flex justify-center">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          一覧に戻る
        </Link>
      </div>
    </article>
  );
}
