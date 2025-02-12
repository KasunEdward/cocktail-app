import { create } from "zustand";

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
}

interface CocktailStore {
  favorites: Cocktail[];
  addToFavorites: (cocktail: Cocktail) => void;
  removeFromFavorites: (idDrink: string) => void;
}

export const useCocktailStore = create<CocktailStore>((set) => ({
  favorites: [],
  addToFavorites: (cocktail) =>
    set((state) => ({
      favorites: [...state.favorites, cocktail],
    })),
  removeFromFavorites: (idDrink) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.idDrink !== idDrink),
    })),
}));
