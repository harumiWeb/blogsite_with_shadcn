import { allPosts } from "@/.contentlayer/generated";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default function BlogPage() {
  const posts = allPosts;
  return (
    <div className="container mx-auto mt-24 max-w-4xl py-6 lg:py-10 px-6">
      <div>
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Blog
          </h1>
          <p className="text-muted-foreground text-xl">
            ContentLayerとMDXで書いてます。
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-16">
        {posts.map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={804}
                height={452}
                className="rounded-md border bg-muted"
              />
            )}
            <h2 className="text-2xl font-bold mt-6">{post.title}</h2>
            {post.description && (
              <p className="text-muted-foreground text-xl mt-2">
                {post.description}
              </p>
            )}
            {post.date && (
              <p className="text-muted-foreground text-sm mt-2">
                {format(parseISO(post.date), "yyyy年MM月dd日")}
              </p>
            )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
