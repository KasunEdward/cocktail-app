import FavoriteCard from "@/components/cards/favoriteCard";
import { Cocktail, useCocktailStore } from "@/store/cocktailStore";

export default function Favourites() {
  const { favorites, removeFromFavorites } = useCocktailStore();

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Favourite Cocktails</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favourite cocktails yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((cocktail:Cocktail) => (
            <FavoriteCard cocktail={cocktail} removeFromFavorites={removeFromFavorites}/>
          ))}
        </div>
      )}
    </div>
  );
}
