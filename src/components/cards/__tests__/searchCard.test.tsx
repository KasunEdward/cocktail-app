import { render, screen, fireEvent } from "@testing-library/react";
import SearchCard from "@/components/cards/searchCard";
import { describe, it, expect, vi } from "vitest";

const mockCocktail = {
  idDrink: "12345",
  strDrink: "Mojito",
  strDrinkThumb: "/mojito.jpg",
};

describe("SearchCard Component", () => {
  it("renders correctly", () => {
    render(
      <SearchCard
        cocktail={mockCocktail}
        addToFavorites={vi.fn()}
        checkDisabled={vi.fn().mockReturnValue(false)}
      />
    );

    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /mojito/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to favorites/i })).toBeInTheDocument();
  });

  it("calls addToFavorites when button is clicked", () => {
    const addToFavorites = vi.fn();

    render(
      <SearchCard
        cocktail={mockCocktail}
        addToFavorites={addToFavorites}
        checkDisabled={vi.fn().mockReturnValue(false)}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /add to favorites/i }));
    expect(addToFavorites).toHaveBeenCalledWith(mockCocktail);
  });

  it("disables button when checkDisabled returns true", () => {
    render(
      <SearchCard
        cocktail={mockCocktail}
        addToFavorites={vi.fn()}
        checkDisabled={vi.fn().mockReturnValue(true)}
      />
    );

    expect(screen.getByRole("button", { name: /add to favorites/i })).toBeDisabled();
  });
});
