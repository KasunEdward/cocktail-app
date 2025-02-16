import Button from "@/components/button";
import { Cocktail } from "@/store/cocktailStore";
import Image from "next/image";
const FavoriteCard = ({
  cocktail,
  removeFromFavorites,
}: {
  cocktail: Cocktail;
  removeFromFavorites: (id: string) => void;
}) => {
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
      <p className="text-gray-600">{cocktail.strCategory}</p>
      <Button
        onClick={() => removeFromFavorites(cocktail.idDrink)}
        className="mt-4 px-3 py-2"
      >
        Remove
      </Button>
    </div>
  );
};

export default FavoriteCard;
