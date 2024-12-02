import { LIST_FOOD_CATEGORIES } from "@/src/constants/food-categories";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const LIST_FOOD_CATEGORIES = [
//   {
//     category: "Pratos Principais",
//     items: [
//       "Peru assado",
//       "Frango Recheado",
//       "Frango Assado",
//       "Tender com Molho de Laranja, abacaxi ou outro",
//       "Pernil Suíno Assado (no abacaxi ou outros)",
//       "Costela Bovina ou Suína",
//       "Escondidinho de Carne",
//       "Chester Recheado",
//       "Bacalhau",
//       "Torta de frango",
//       "Fricassê de Frango",
//       "Risoto",
//       "Arroz à grega",
//       "Arroz com lentilhas",
//       "Arroz de forno",
//       "Minha Receita Especial",
//     ],
//   },
//   {
//     category: "Massas",
//     items: [
//       "Lasanha (bolonhesa, quatro queijos ou frango)",
//       "Nhoque ao Sugo ou à Bolonhesa, ou outros",
//       "Rondelli (frango com catupiry ou presunto e queijo)",
//       "Panqueca Recheada",
//       "Outros Tipos de Massas",
//       "Minha Receita Especial",
//     ],
//   },
//   {
//     category: "Saladas",
//     items: [
//       "Salada de maionese com batata, cenoura, ou outros",
//       "Salpicão",
//       "Salada tropical (com frutas como manga, abacaxi, uvas e outros)",
//       "Salada Caesar",
//       "Salada Caprese",
//       "Salada de grão-de-bico com bacalhau",
//       "Outros Tipos de Saladas",
//       "Minha Receita Especial",
//     ],
//   },
//   {
//     category: "Acompanhamentos",
//     items: [
//       "Farofa (com bacon, calabresa ou frutas secas ou outros)",
//       "Batatas Assadas com Ervas",
//       "Bolinho de Arroz",
//       "Outros Tipos de Acompanhamentos",
//       "Minha Receita Especial",
//     ],
//   },
//   {
//     category: "Sobremesas",
//     items: [
//       "Mousse (chocolate, maracujá, limão ou outros)",
//       "Pudim",
//       "Pavê (chocolate, abacaxi ou outros)",
//       "Rabanada (tradicional ou recheada com doce de leite)",
//       "Torta de Limão, Frutas Vermelhas ou Outros",
//       "Cheesecake",
//       "Manjar Branco com Calda de Ameixa ou outros",
//       "Sorvete Caseiro",
//       "Panetone Caseiro",
//       "Outros Tipos de Sobremesa",
//       "Minha Receita Especial",
//     ],
//   },
// ];

async function main() {
  const categoriesAndFoodsItems = LIST_FOOD_CATEGORIES;

  for (const category of categoriesAndFoodsItems) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.category,
        dishes: {
          create: category.items.map((item) => ({
            name: item,
          })),
        },
      },
    });

    console.log(`Category created: ${createdCategory.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
