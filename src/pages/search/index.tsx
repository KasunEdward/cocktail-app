import { useState, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Cocktail, useCocktailStore } from "@/store/cocktailStore";
import Image from "next/image";
import debounce from "lodash/debounce";
import apiClient from "@/services/apis/apiClient";
import SearchCard from "@/components/cards/searchCard";
import { useCocktailSearch } from "@/services/queries/cocktailSearch";

const fetchCocktails = async ({
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

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToFavorites, favorites } = useCocktailStore();

  const checkDisabled = (cocktail: Cocktail): boolean => {
    return favorites.some((fav: Cocktail) => fav.idDrink === cocktail.idDrink);
  };
  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useCocktailSearch(searchTerm);

  interface FetchCocktailsParams {
    queryKey: [string, string];
    pageParam?: number;
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
          className="p-2 border rounded-md w-2/5"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.pages?.flatMap((page: FetchCocktailsResponse) =>
          page.drinks?.map((cocktail: Cocktail) => (
            <SearchCard
              cocktail={cocktail}
              addToFavorites={addToFavorites}
              checkDisabled={checkDisabled}
            />
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
