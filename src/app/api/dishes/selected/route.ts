import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const selectedDishes = await prisma.selectedDish.findMany({
    include: {
      dish: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return NextResponse.json({ selectedDishes });
}
