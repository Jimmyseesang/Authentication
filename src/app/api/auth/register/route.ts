import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import brcypt from "bcrypt";

const prisma = new PrismaClient();

interface RegisterRequest {
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = (await req.json()) as RegisterRequest;

    if (await prisma.user.findUnique({ where: { email } })) {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        { status: 403 }
      );
    }

    const hashPassword = await brcypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Register successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
