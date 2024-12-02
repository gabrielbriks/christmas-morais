import prisma from "@/src/lib/prisma";

export async function getSelectedDishes() {
  const { _count: totalSelecteds } = await prisma.selectedDish.aggregate({
    _count: { dishId: true },
  });

  return { totalSelecteds };
}
