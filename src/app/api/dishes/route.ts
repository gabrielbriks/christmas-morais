import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.dishes.findMany({
    select: {
      id: true,
      name: true,
      categoryId: true,
      _count: true,
    },
  });

  return NextResponse.json({ result });
}
