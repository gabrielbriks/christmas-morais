"use client";
import { trpc } from "@/src/app/utils/trpc";
import { CardDishesInfo } from "@/src/components/dashboard/card-dishes-confirmed";
import { HeaderPagesAdmin } from "@/src/components/header-pages-admin";
import { LoadingDefault } from "@/src/components/loading-default";

export default function ConfirmedDishes() {
  const {
    data: dishesData,
    isLoading: isLoadingDishes,
    error: errorDishes,
    isError: isErrorDishes,
  } = trpc.getUserAndDishesSelected.useQuery();

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-4">
      <HeaderPagesAdmin title="Pratos Confirmados" />
      <div className="flex flex-col w-full h-full mb-10 mt-20 gap-4 items-center px-4">
        {isLoadingDishes ? (
          <LoadingDefault />
        ) : isErrorDishes ? (
          <p className="text-center text-primary text-lg">
            Opps!
            {errorDishes.message}
          </p>
        ) : (
          dishesData?.dishes.map((d) => (
            <CardDishesInfo
              key={d.guestId}
              nameGuest={d.guestName}
              listDishes={d.dishes}
            />
          ))
        )}
      </div>
    </div>
  );
}
