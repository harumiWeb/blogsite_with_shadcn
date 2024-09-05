import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

// Prisma Client
const globalForPrisma = globalThis as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [GithubProvider, GoogleProvider],
  basePath: "/api/auth",
  callbacks: {
    async jwt({ token, account, user }) {
      // 初回のログイン時のみ account と user が存在します
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.sub as string;
        session.user.token = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", //databaseではなくjwtでセッションを管理する
    maxAge: 60 * 60 * 24 * 7, //JWTの有効期限を7日に設定
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, //JWTの有効期限を7日に設定
  },
});
