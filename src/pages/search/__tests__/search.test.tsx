import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCocktailSearch } from "@/services/queries/cocktailSearch";
import { useCocktailStore } from "@/store/cocktailStore";
import { ReactNode } from "react";
import SearchPage from "..";

vi.mock("@/services/queries/cocktailSearch", () => ({
  useCocktailSearch: vi.fn(),
}));

vi.mock("@/store/cocktailStore", () => ({
  useCocktailStore: vi.fn(),
}));

describe("SearchPage Component", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    useCocktailSearch.mockReturnValue({
      data: { pages: [{ drinks: [{ idDrink: "12345",
				strDrink: "Margarita",
				strDrinkThumb: "/margarita.jpg",
				strCategory: "Cocktail", }] }] },
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    });

    useCocktailStore.mockReturnValue({
      addToFavorites: vi.fn(),
      favorites: [],
    });
  });

  it("renders search input and title", () => {
    render(<SearchPage />);
    expect(screen.getByText("Search Cocktails")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for a cocktail...")
    ).toBeInTheDocument();
  });

  //   it("renders cocktails from search results", async () => {
  //     render(<SearchPage />, { wrapper });
  //     expect(await screen.findByText("Mojito")).toBeInTheDocument();
  //   });
});
