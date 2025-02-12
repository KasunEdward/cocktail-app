import { fetchUniqueRandomCocktails } from "@/services/cocktailService";
import { Cocktail, useCocktailStore } from "@/store/cocktailStore";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const cocktails = await fetchUniqueRandomCocktails();
    return {
      props: { cocktails },
    };
  } catch (error) {
    return {
      props: { cocktails: [] },
    };
  }
};

interface HomeProps {
  cocktails: Cocktail[];
}

export default function Home({ cocktails }: HomeProps) {
  const { addToFavorites, favorites } = useCocktailStore();
  const refreshPage = () => {
    window.location.reload(); // Triggers a full refresh to call getServerSideProps again
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Random Cocktails</h1>
      <button
        onClick={refreshPage}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Refresh
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cocktails.map((cocktail:any) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
