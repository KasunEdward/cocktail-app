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
