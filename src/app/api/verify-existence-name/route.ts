import prisma from "@/src/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const gest = await prisma.user
    .findUnique({
      where: { name },
      select: { id: true, name: true },
    })
    .catch((err) => {
      console.error("Error:", err);
      throw new Error(err);
    });

  console.log("gest", gest);

  return NextResponse.json({ success: true, guest: gest });
}
