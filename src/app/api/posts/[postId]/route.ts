import { postSchema } from "@/src/lib/post/validations";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/auth";
import { z } from "zod";
import { ZodError } from "zod";
import { auth } from "@/auth";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const {params} = routeContextSchema.parse(context);

    if(!await verifyCurrentUserHasAccessToPost(params.postId)) {
      return new Response("Unauthorized", { status: 403 });
    }
    
    const json = await req.json();
    const body = postSchema.parse(json);
    console.log(body);
  
    await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(null, {status: 200});
  } catch (error) {
    if(error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 422});
    }
    return NextResponse.json(null, {status: 500});
  }
}

export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const {params} = routeContextSchema.parse(context);

    if(!await verifyCurrentUserHasAccessToPost(params.postId)) {
      return new Response("Unauthorized", { status: 403 });
    }

    await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });
    return new Response(null, {status: 204});
  } catch (error) {
    if(error instanceof ZodError) {
      return NextResponse.json({error: error.issues}, {status: 422});
    }
    return NextResponse.json(null, {status: 500});
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const count = await prisma.post.count({
    where: {
      id: postId,
      authorId: session.user.id,
    },
  });
  return count > 0;
}