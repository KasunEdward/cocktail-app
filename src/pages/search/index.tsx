import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCocktailStore } from "@/store/cocktailStore";
import Image from "next/image";
import debounce from "lodash/debounce";
import apiClient from "@/services/apiClient";

const fetchCocktails = async ({ queryKey, pageParam = 1 }: { queryKey: string[]; pageParam?: number }) => {
  const searchTerm = queryKey[1];
  if (!searchTerm) return { drinks: [] };

  const response = await apiClient.get(`/search.php?s=${searchTerm}`);
  return response.data;
};

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToFavorites, favorites } = useCocktailStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["searchCocktails", searchTerm],
    queryFn: fetchCocktails,
    getNextPageParam: (_, pages) => (pages.length < 1 ? pages.length + 1 : undefined),
    enabled: !!searchTerm,
    initialPageParam: 1,
  });

interface FetchCocktailsParams {
    queryKey: [string, string];
    pageParam?: number;
}

interface Cocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string;
}

interface FetchCocktailsResponse {
    drinks: Cocktail[];
}

const debouncedSearch = useCallback(
    debounce((value: string) => {
        setSearchTerm(value);
        refetch();
    }, 500),
    []
);

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Search Cocktails</h1>
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for a cocktail..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.pages?.flatMap((page: FetchCocktailsResponse) =>
          page.drinks?.map((cocktail: Cocktail) => (
            <div key={cocktail.idDrink} className="border p-4 rounded-lg shadow-lg">
              <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            width={200}
            height={200}
            className="rounded"
              />
              <h2 className="text-xl font-semibold mt-4">{cocktail.strDrink}</h2>
              <button
            onClick={() => addToFavorites(cocktail)}
            disabled={favorites.some((fav: Cocktail) => fav.idDrink === cocktail.idDrink)}
            className="mt-4 px-3 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
              >
            Add to Favorites
              </button>
            </div>
          ))
        )}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
