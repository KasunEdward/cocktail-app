import Button from "@/components/button";
import { Cocktail } from "@/store/cocktailStore";
import Image from "next/image";
const SearchCard = ({ cocktail, addToFavorites, checkDisabled }: { cocktail: Cocktail, addToFavorites:(cocktail:Cocktail)=>void, checkDisabled: (cocktail:Cocktail)=> boolean }) => {
  return (
    <div key={cocktail.idDrink} className="border p-4 rounded-lg shadow-lg">
      <Image
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        width={200}
        height={200}
        className="rounded mx-auto"
      />
      <h2 className="text-xl font-semibold mt-4">{cocktail.strDrink}</h2>
      <Button
        onClick={() => addToFavorites(cocktail)}
				disabled={checkDisabled(cocktail)}
        className="mt-4 px-3 py-2"
      >
        Add to Favorites
      </Button>
    </div>
  );
};

export default SearchCard;
