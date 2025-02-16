import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import Home from "@/pages/index";
import { useRandomCocktails } from "@/services/queries/cocktailSearch";

vi.mock("@/services/queries/cocktailSearch", () => ({
  useRandomCocktails: vi.fn(),
}));

describe("Home Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state", () => {
    useRandomCocktails.mockReturnValue({
      data: [],
      isLoading: true,
      isRefetching: false,
      refetch: vi.fn(),
    });

    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders cocktail list", () => {
    useRandomCocktails.mockReturnValue({
      data: [
        { idDrink: "1", strDrink: "Mojito" },
        { idDrink: "2", strDrink: "Margarita" },
      ],
      isLoading: false,
      isRefetching: false,
      refetch: vi.fn(),
    });

    render(<Home />);

    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });

  test("clicking refresh button triggers refetch", async () => {
    const mockRefetch = vi.fn();

    useRandomCocktails.mockReturnValue({
      data: [{ idDrink: "1", strDrink: "Old Fashioned" }],
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
    });

    render(<Home />);
    const refreshButton = screen.getByRole("button"); // Assuming IconButton renders a button

    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });
});
