export type DishesAPIResult = {
  name: string;
  id: string;
  _count: {
    selected: number;
    category: number;
  };
  categoryId: string | null;
};
