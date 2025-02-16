import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { fetchCocktails } from "../apis/cocktailApi";
import { useState } from "react";
import { useCocktailSearch } from "../queries/cocktailSearch";

vi.mock("../apis/cocktailApi", () => ({
  fetchCocktails: vi.fn(),
}));

describe("useCocktailSearch Hook", () => {
    const createWrapper = () => {
        const queryClient = new QueryClient();
        return ({ children }: { children: ReactNode }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
      };

  it("should not fetch data when searchTerm is empty", async () => {
    const { result } = renderHook(() => useCocktailSearch(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
