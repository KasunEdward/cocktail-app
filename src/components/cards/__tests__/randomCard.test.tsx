import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RandomCard from "@/components/cards/randomCard";
import { Cocktail } from "@/store/cocktailStore";

describe("RandomCard Component", () => {
  const mockCocktail: Cocktail = {
    idDrink: "1",
    strDrink: "Mojito",
    strDrinkThumb: "/mojito.jpg",
    strCategory: "Cocktail",
  };

  it("renders the cocktail name, image, and category", () => {
    render(<RandomCard cocktail={mockCocktail} />);

    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("Cocktail")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Mojito");
  });
});
