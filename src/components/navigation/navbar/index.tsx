import Link from "next/link";
import React from "react";
const NavBar = ({ toggle }: { toggle: () => void }) => {
  return (
    <div className="container flex justify-between bg-primary-1 items-center mx-auto px-4 w-full h-20 sticky top-0">
      <h1 className="text-3xl text-white-1 font-medium">Cocktail Hub</h1>
      <button
        type="button"
        className="inline-flex items-center md:hidden"
        onClick={toggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path fill="#fff" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
        </svg>
      </button>
      <ul className="hidden md:flex gap-x-6 text-black ">
        <li>
          <Link href="/">
            <p className="text-white-1">Home</p>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <p className="text-white-1">Search</p>
          </Link>
        </li>
        <li>
          <Link href="/favourites">
            <p className="text-white-1">Favourites</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
