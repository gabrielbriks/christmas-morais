import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  console.log("CATEGORIES", result);

  return NextResponse.json({ result });
}
