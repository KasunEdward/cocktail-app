import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchCocktails,
  fetchUniqueRandomCocktails,
} from "../apis/cocktailApi";

export const useRandomCocktails = () => {
  return useQuery({
    queryKey: ["randomCocktails"],
    queryFn: fetchUniqueRandomCocktails,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export const useCocktailSearch = (searchTerm: string) => {
  return useInfiniteQuery({
    queryKey: ["searchCocktails", searchTerm],
    queryFn: fetchCocktails,
    getNextPageParam: (_, pages) =>
      pages.length < 1 ? pages.length + 1 : undefined,
    enabled: !!searchTerm,
    initialPageParam: 1,
  });
};
