import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [GithubProvider,GoogleProvider],
  basePath: "/api/auth",
  // callbacks: {
  //   authorized: async (request,auth) => {
  //     try {
  //       const {pathname} = request.nextUrl;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }
});