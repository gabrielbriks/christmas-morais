"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function confirmAttendance(formData: FormData) {
  const name = formData.get("name") as string;
  const companions = formData.get("companions") as string;
  const dishes = formData.getAll("dishes") as string[];

  // Atualiza a contagem de pratos selecionados
  // Simula o salvamento dos dados
  if (!name) {
    return { success: false, message: "Nome ausente ou inválido." };
  }

  const dishesSelected: Array<{ dishId: string }> = [];
  const listCompanions: Array<{ name: string }> = [];

  dishes.map((item) => dishesSelected.push({ dishId: item }));

  //TODO:FIX: Isso aqui é um error(pois está sendo passado a lista separado por virgula )
  if (companions !== null && companions.length > 0) {
    companions.split(";").map((item) => listCompanions.push({ name: item }));
  }

  await prisma.user
    .create({
      data: {
        name,
        companions: {
          createMany: {
            data: listCompanions,
          },
        },
        SelectedDish: {
          createMany: {
            data: dishesSelected,
          },
        },
      },
    })
    .catch((error) => {
      console.error("Error creating user", error);
      return { success: false, message: "Erro concluir confirmação." };
    });

  // Limpa o cache da página de confirmação para atualizar os dados
  revalidatePath("/confirmation");
  revalidatePath("/api/get-selected-dishes");

  return {
    success: true,
    message: "Presença confirmada com sucesso!",
    revalidated: true,
  };
}
