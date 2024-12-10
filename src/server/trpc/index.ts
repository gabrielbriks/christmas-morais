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

  getGuests: procedure.query(async ({ ctx }) => {
    const guestsData = await prisma.user.findMany({
      include: {
        companions: true,
      },
    });

    const guests = guestsData.map((guest) => {
      const companions = guest.companions.flatMap((c) => c.name.split(","));

      return {
        id: guest.id,
        name: guest.name,
        companions: companions,
      };
    });

    return { guests };
  }),

  getUserAndDishesSelected: procedure.query(async ({ ctx }) => {
    const guests = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const dishes = await prisma.selectedDish.findMany({
      include: {
        dish: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    console.log(dishes);

    const guestsDishes = guests.map((g) => {
      const dishesFiltered = dishes.filter((d) => d.userId === g.id);
      return {
        guestId: g.id,
        guestName: g.name,
        dishes: dishesFiltered.map((d) => {
          return { id: d.dish.id, name: d.dish.name };
        }),
      };
    });

    return { dishes: guestsDishes };
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

  getInfoDashboard: procedure.query(async ({ ctx }) => {
    const countGuests = await prisma.user.count().catch((err) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Erro ao recuperar total de convidados confirmados.`,
        cause: err,
      });
    });
    const countDishesSelected = await prisma.selectedDish
      .count()
      .catch((err) => {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Erro ao recuperar total de pratos selecionados.`,
          cause: err,
        });
      });

    const companionsList = await prisma.companion
      .findMany({
        select: {
          name: true,
        },
      })
      .catch((err) => {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Erro ao recuperar total de acompanhantes.`,
          cause: err,
        });
      });

    const companionsNames = companionsList.flatMap((c) => c.name.split(","));
    const totalCompanions = companionsNames.length;

    ///TODO: Implementar configuração para informar total de convidados
    const TOTAL_GUEST_CONFIG = 40;

    const totalGuest = countGuests + totalCompanions;
    const totalGuestPendents =
      TOTAL_GUEST_CONFIG - (countGuests + totalCompanions);

    console.log("countDishesSelected", countDishesSelected);

    return {
      totalGuest: totalGuest,
      totalDishesSelected: countDishesSelected,
      totalGuestPendents: totalGuestPendents,
      totalGuestConfigured: TOTAL_GUEST_CONFIG,
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
