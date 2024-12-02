import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.dishes.findMany({
    select: {
      id: true,
      name: true,
      categoryId: true,
      // category: {
      //   select: {
      //     name: true,
      //   },
      // },
      _count: true,
    },
  });

  console.log("GET TOTAL", result);

  return NextResponse.json({ result });
}
