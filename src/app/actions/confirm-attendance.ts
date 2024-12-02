"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

// Simula um banco de dados de pratos selecionados
const selectedDishes: { [key: string]: number } = {};

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
  companions.split(";").map((item) => listCompanions.push({ name: item }));

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

  revalidatePath("/");

  return { success: true, message: "Presença confirmada com sucesso!" };
}
