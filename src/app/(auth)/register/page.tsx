import Link from "next/link";
import UserAuthForm from "@/src/components/UserAuthForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="w-full grid flex-col lg:grid-cols-2 mx-auto min-h-screen items-center justify-center">
      <div className="bg-gray-100 h-full lg:h-screen w-full flex items-center justify-center">
        <Link href="/login">ログイン</Link>
      </div>
      <div className="w-[100vw] lg:w-full mx-auto flex justify-center items-center h-screen">
        <div className="w-full max-w-md mx-auto sm:max-w-sm space-y-6">
          <div className="flex flex-col justify-center items-center space-y-2 md:space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              アカウントの作成
            </h1>
            <p className="text-sm text-muted-foreground">
              メールアドレスを入力してください。
            </p>
          </div>

          <UserAuthForm />

          <p className="text-center text-muted-foreground max-w-[80%] mx-auto">
            続けてクリックすれば
            <br />
            私たちの
            <Link
              href="/terms"
              className="text-sm underline underline-offset-4 text-muted-foreground"
            >
              利用規約
            </Link>
            と
            <Link
              href="/privacy"
              className="text-sm underline underline-offset-4 text-muted-foreground"
            >
              プライバシーポリシー
            </Link>
            に同意したことになります。
          </p>
        </div>
      </div>
    </div>
  );
}
