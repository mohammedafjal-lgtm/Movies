"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useMovieContext } from "@/context/MovieContext";
import { useUserContext } from "@/context/userContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { query, setQuery } = useMovieContext();
  const { user, logout } = useUserContext();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log(query);

    setShowSearch(false);
  };

  return (
    <div className="bg-amber-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">MovieApp</h1>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/collection">Collections</Link>
          <Link
            href="/loginRegister"
            onClick={() => {
              if (user) {
                logout();
              }
            }}
          >
            {user ? "logout" : "logIn"}
          </Link>

          <div className="relative">
            {showSearch ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="px-3 py-1 rounded text-white focus:outline-amber-50 border-white"
                />
                <button
                  type="submit"
                  className="bg-white text-amber-900 p-2 rounded hover:cursor-pointer"
                >
                  <FiSearch />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-amber-800 rounded hover:cursor-pointer"
              >
                <FiSearch />
              </button>
            )}
          </div>
        </nav>

        <button
          className="md:hidden p-2 rounded hover:bg-amber-800 hover:cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden mt-4 space-y-2">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/addmovie" className="block">
            Add Movie
          </Link>
          <Link href="/collections" className="block">
            Collections
          </Link>
          <Link href="/login" className="block">
            Login
          </Link>

          <div className="mt-2">
            {showSearch ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="px-3 py-1 rounded text-black w-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-amber-900 p-2 rounded hover:cursor-pointer"
                >
                  <FiSearch />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-amber-800 rounded"
              >
                <FiSearch />
              </button>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
