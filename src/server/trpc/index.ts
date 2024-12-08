import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { procedure, router } from "./trpc";

export const appRouter = router({
  verifyExistenceName: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const guest = await prisma.user
        .findUnique({
          where: { name },
          select: { id: true, name: true },
        })
        .catch((err) => {
          console.error("Error:", err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Ocorreu um erro ao validar nome.`,
            cause: err,
          });
        });

      console.log("Guest", guest);
      return { success: true, guest: guest };
    }),
  getCountDishes: procedure.query(async ({ ctx }) => {
    const result = await prisma.selectedDish.groupBy({
      by: ["dishId"],
      _count: { dishId: true },
    });

    return { result };
  }),
  getDishesSelected: procedure.query(async ({ ctx }) => {
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

    return { selectedDishes };
  }),
  getDishes: procedure.query(async ({ ctx }) => {
    const result = await prisma.dishes.findMany({
      select: {
        id: true,
        name: true,
        categoryId: true,
        _count: true,
      },
    });

    return { result };
  }),
  getCategoriesDishes: procedure.query(async ({ ctx }) => {
    const result = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return { result };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
