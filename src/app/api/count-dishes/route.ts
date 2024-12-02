import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.selectedDish.groupBy({
    by: ["dishId"],
    _count: { dishId: true },
  });

  return NextResponse.json({ result });
}
