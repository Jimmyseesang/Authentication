import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "string" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {

                const { email, password } = credentials ?? {};

                if (!email || !password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });

                if (!user || !(await bcrypt.compare(password, user.password))) {
                    throw new Error("Invalid identifier or password.")
                }

                return {
                    id: user.id,
                    email: user.email
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/home",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            };
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as { id?: string; email?: string }).id = token.id as string;
                (session.user as { id?: string; email?: string }).email = token.email as string;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };