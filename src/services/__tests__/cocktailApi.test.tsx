import { describe, it, expect, vi, beforeEach } from "vitest";
import apiClient from "@/services/apis/apiClient";
import { fetchCocktails, fetchUniqueRandomCocktails } from "@/services/apis/cocktailApi";

vi.mock("@/services/apis/apiClient");

const mockedApiClient = vi.mocked(apiClient);

describe("fetchUniqueRandomCocktails", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });
  it("should fetch 5 unique random cocktails", async () => {
    const mockDrinks = [
      { idDrink: "1", strDrink: "Mojito", strDrinkThumb: "mojito.jpg", strCategory: "Cocktail" },
      { idDrink: "2", strDrink: "Martini", strDrinkThumb: "martini.jpg", strCategory: "Cocktail" },
      { idDrink: "3", strDrink: "Margarita", strDrinkThumb: "margarita.jpg", strCategory: "Cocktail" },
      { idDrink: "4", strDrink: "Old Fashioned", strDrinkThumb: "oldfashioned.jpg", strCategory: "Whiskey" },
      { idDrink: "5", strDrink: "Daiquiri", strDrinkThumb: "daiquiri.jpg", strCategory: "Rum" },
    ];

    // Properly mock API responses in sequence
    mockedApiClient.get
      .mockResolvedValueOnce({ data: { drinks: [mockDrinks[0]] } })
      .mockResolvedValueOnce({ data: { drinks: [mockDrinks[1]] } })
      .mockResolvedValueOnce({ data: { drinks: [mockDrinks[2]] } })
      .mockResolvedValueOnce({ data: { drinks: [mockDrinks[3]] } })
      .mockResolvedValueOnce({ data: { drinks: [mockDrinks[4]] } });

    const result = await fetchUniqueRandomCocktails();

    expect(result).toHaveLength(5);
    expect(new Set(result.map((d) => d.idDrink)).size).toBe(5);
    expect(mockedApiClient.get).toHaveBeenCalledTimes(5);
  });

  it("should throw an error if API call fails", async () => {
    mockedApiClient.get.mockRejectedValue(new Error("Failed to fetch cocktails"));

    await expect(fetchUniqueRandomCocktails()).rejects.toThrowError("Failed to fetch cocktails");
  });
});

describe("fetchCocktails", () => {
  it("fetches data with the correct search term", async () => {
    const mockData = { drinks: [{ idDrink: "123", strDrink: "Margarita" }] };
    apiClient.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchCocktails({ queryKey: ["cocktails", "Margarita"] });

    expect(apiClient.get).toHaveBeenCalledWith("/search.php?s=Margarita");
    expect(result).toEqual(mockData);
  });

  it("returns an empty drinks array if no search term is provided", async () => {
    const result = await fetchCocktails({ queryKey: ["cocktails", ""] });

    expect(result).toEqual({ drinks: [] });
  });

  it("handles API errors gracefully", async () => {
    apiClient.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchCocktails({ queryKey: ["cocktails", "Margarita"] })).rejects.toThrow("Network Error");
  });
});
