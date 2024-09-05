import { auth, prisma } from "@/auth";
import { z } from "zod";
import { NextResponse } from "next/server";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { user } = session;

    const json = await req.json();
    const { title, content } = postCreateSchema.parse(json);

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
      select: {
        id: true,
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.issues.map((issue) => issue.message).join("\n"), { status: 422 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}