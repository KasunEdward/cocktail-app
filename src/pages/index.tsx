import RandomCard from "@/components/cards/randomCard";
import IconButton from "@/components/iconButton";
import RefreshIcon from "@/components/icons/refreshIcon";
import Tooltip from "@/components/tooltip";
import { useRandomCocktails } from "@/services/queries/cocktailSearch";
import { Cocktail } from "@/store/cocktailStore";

export default function Home() {

  const {
    data: cocktails = [],
    isLoading,
    isRefetching,
    refetch,
  } = useRandomCocktails();

  return (
    <div className="container mx-auto p-6 text-center">
      <div className="flex justify-center items-start gap-2">
        <h1 className="text-3xl font-bold mb-6">Random Cocktails</h1>
        <Tooltip content="Refresh cocktails">
          <IconButton onClick={() => refetch()} icon={RefreshIcon} />
        </Tooltip>
      </div>

      {(isLoading || isRefetching) ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cocktails.map((cocktail: Cocktail) => (
            <RandomCard key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      )}
    </div>
  );
}
