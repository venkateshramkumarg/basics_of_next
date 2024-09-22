import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";

interface User {
  user_name: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const { user_name, password }: User = await req.json();
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
      if (user.password === password) {
        return NextResponse.json({ message: "Login Successful", status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid Password", status: 400 });
      }
    } else {
      return NextResponse.json({ message: "User does not exist", status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
