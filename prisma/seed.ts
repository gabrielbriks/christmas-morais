import { LIST_FOOD_CATEGORIES } from "@/src/constants/food-categories";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categoriesAndFoodsItems = LIST_FOOD_CATEGORIES;

  await prisma.category.deleteMany();
  await prisma.dishes.deleteMany();
  await prisma.selectedDish.deleteMany();

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
