import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Favourites from "@/pages/favourites";
import { useCocktailStore } from "@/store/cocktailStore";

// Mock useCocktailStore
vi.mock("@/store/cocktailStore", () => ({
  useCocktailStore: vi.fn(),
}));

describe("Favourites Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state when no favorites", () => {
    useCocktailStore.mockReturnValue({
      favorites: [],
      removeFromFavorites: vi.fn(),
    });

    render(<Favourites />);

    expect(screen.getByText("Favourite Cocktails")).toBeInTheDocument();
    expect(screen.getByText("No favourite cocktails yet.")).toBeInTheDocument();
  });

  it("renders favorite cocktails", () => {
    (useCocktailStore as jest.Mock).mockReturnValue({
      favorites: [
        { idDrink: "1", strDrink: "Mojito" },
        { idDrink: "2", strDrink: "Margarita" },
      ],
      removeFromFavorites: vi.fn(),
    });

    render(<Favourites />);

    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });

  it("calls removeFromFavorites when clicking remove", () => {
    const mockRemove = vi.fn();

    useCocktailStore.mockReturnValue({
      favorites: [{ idDrink: "1", strDrink: "Old Fashioned" }],
      removeFromFavorites: mockRemove,
    });

    render(<Favourites />);
    
    const removeButton = screen.getByRole("button", { name: /remove/i }); // Assuming button has "Remove"
    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
  });
});
