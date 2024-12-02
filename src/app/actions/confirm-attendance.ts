"use server";

import { revalidatePath } from "next/cache";

// Simula um banco de dados de pratos selecionados
const selectedDishes: { [key: string]: number } = {};

export async function confirmAttendance(formData: FormData) {
  const name = formData.get("name") as string;
  const companions = formData.get("companions") as string;
  const dishes = formData.getAll("dishes") as string[];

  // Atualiza a contagem de pratos selecionados
  dishes.forEach((dish) => {
    selectedDishes[dish] = (selectedDishes[dish] || 0) + 1;
  });

  // Simula o salvamento dos dados
  console.log("Confirmação recebida:", { name, companions, dishes });

  revalidatePath("/");
  return { success: true, message: "Presença confirmada com sucesso!" };
}
