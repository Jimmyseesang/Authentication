import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/SignoutButton";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ProfilePage = async () => {
  const session = await getServerSession(authOption);
  console.log(session);

  if (!session || !session.user?.email) {
    console.log("Redirect to login page");
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main className="h-screen w-full flex items-center justify-center flex-col gap-8">
      <h1 className="text-4xl font-bold">Profile</h1>
      <p className="text-2xl">{user.id}</p>
      <p className="text-2xl">{user.email}</p>
      <p className="text-2xl">{user.password}</p>
      <LogoutButton />
    </main>
  );
};

export default ProfilePage;
