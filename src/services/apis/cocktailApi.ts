import apiClient from "./apiClient";

export const fetchUniqueRandomCocktails = async () => {
  const cocktailsSet = new Set();
  const cocktails = [];

  while (cocktails.length < 5) {
    try {
      const response = await apiClient.get("/random.php");
      const drink = response.data.drinks?.[0];

      if (drink && !cocktailsSet.has(drink.idDrink)) {
        cocktailsSet.add(drink.idDrink);
        cocktails.push(drink);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  return cocktails;
};

export const fetchCocktails = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: string[];
  pageParam?: number;
}) => {
  const searchTerm = queryKey[1];
  if (!searchTerm) return { drinks: [] };

  const response = await apiClient.get(`/search.php?s=${searchTerm}`);
  return response.data;
};
