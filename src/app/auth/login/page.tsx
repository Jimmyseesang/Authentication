"use client";

import { loginAction } from "@/actions/auth/login";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const LoginPage = () => {
  const [formState, actionForm, isPending] = useActionState(loginAction, {});
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      router.push("/");
    }
  }, [formState]);

  return (
    <main className="h-screen w-full flex items-center justify-center flex-col gap-4">
      <form
        action={actionForm}
        className="flex flex-col gap-2 items-center w-[300px]"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="font-bold ">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email..."
            className="border outline-offset-4 outline-stone-500 border-stone-300 px-4 py-4 rounded-2xl"
          />
          {formState.error?.email && (
            <p className="text-sm text-red-600 font-bold text-end">
              {formState.error.email}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="font-bold ">
            Password
          </label>
          <div className="w-full relative h-fit">
            <input
              type={showPw ? "text" : "password"}
              id="password"
              name="password"
              placeholder="password..."
              className="w-full border outline-offset-4 outline-stone-500 border-stone-300 px-4 py-4 rounded-2xl"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-2 h-full aspect-square cursor-pointer flex items-center justify-center"
              onClick={() => setShowPw((prev) => !prev)}
            >
              {showPw ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </div>
          </div>
          {formState.error?.password && (
            <p className="text-sm text-red-600 font-bold text-end">
              {formState.error.password}
            </p>
          )}
        </div>
        <button
          className="bg-black rounded-2xl text-white px-8 py-4 mt-4 w-full cursor-pointer hover:scale-105 transition-all font-bold"
          disabled={isPending}
        >
          {isPending ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "submit"
          )}
        </button>
        {formState.error?._form && (
          <p className="text-sm text-red-600 font-bold text-end mt-8">
            {formState.error._form}
          </p>
        )}
      </form>
      <p>
        Don't have an account?{" "}
        <Link href={"/auth/register"} className="text-red-600 underline">
          register
        </Link>
      </p>
      <p className="w-[300px] text-center">OR</p>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="border border-stone-300 w-[300px] py-4 rounded-2xl relative truncate hover:scale-105 transition-all cursor-pointer"
      >
        Google
        <div className="absolute top-1/2 -translate-y-1/2 left-4 h-[30px] aspect-square">
          <Image
            src={"/icon/Google.png"}
            alt="Google icon"
            fill
            className="object-contain"
          />
        </div>
      </button>
    </main>
  );
};

export default LoginPage;
