import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteCard from "@/components/cards/favoriteCard";
import { describe, it, expect, vi } from "vitest";

const mockCocktail = {
  idDrink: "12345",
  strDrink: "Margarita",
  strDrinkThumb: "/margarita.jpg",
  strCategory: "Cocktail",
};

describe("FavoriteCard Component", () => {
  it("renders correctly", () => {
    render(
      <FavoriteCard
        cocktail={mockCocktail}
        removeFromFavorites={vi.fn()}
      />
    );

    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Cocktail")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /margarita/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("calls removeFromFavorites when button is clicked", () => {
    const removeFromFavorites = vi.fn();

    render(
      <FavoriteCard
        cocktail={mockCocktail}
        removeFromFavorites={removeFromFavorites}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(removeFromFavorites).toHaveBeenCalledWith(mockCocktail.idDrink);
  });
});
