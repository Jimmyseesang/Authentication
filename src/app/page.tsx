import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOption } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOption);

  return (
    <main className="h-screen w-full text-white flex text-lg items-center justify-center gap-8 flex-col">
      <Link
        href={"/profile"}
        className="bg-black w-[150px] py-4 rounded-xl font-bold cursor-pointer hover:scale-105 transition-all text-center"
      >
        Profile
      </Link>
      {!session && (
        <>
          <Link
            href={"/auth/login"}
            className="bg-black w-[150px] py-4 rounded-xl font-bold cursor-pointer hover:scale-105 transition-all text-center"
          >
            Login
          </Link>
          <Link
            href={"/auth/register"}
            className="bg-black w-[150px] py-4 rounded-xl font-bold cursor-pointer hover:scale-105 transition-all  text-center"
          >
            Register
          </Link>
        </>
      )}
    </main>
  );
}
