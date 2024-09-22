import prisma from "../../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

interface User {
  user_name: string;
  password: string;
}

interface Params {
  user_name: string;
}

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { user_name } = params;
  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        user_name,
      },
      select: {
        user_name: true,
        password: true,
      },
    });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
