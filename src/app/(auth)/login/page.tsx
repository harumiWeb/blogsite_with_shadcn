import Link from "next/link";
import UserAuthForm from "@/src/components/UserAuthForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if(session?.user){
    redirect("/dashboard");
  }
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-md mx-auto sm:max-w-sm space-y-6">
        <div className="flex flex-col justify-center items-center space-y-2 md:space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力してログインできます。
          </p>
        </div>

        <UserAuthForm />

          <p className="text-center">
            <Link href="/register" className="text-sm underline underline-offset-4 text-muted-foreground">
              アカウントをお持ちでない場合はこちら
            </Link>
          </p>
      </div>
    </div>
  )
}