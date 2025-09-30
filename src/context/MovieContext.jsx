"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const movieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isGettingMovies, setIsGettingMovies] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalPages: 1,
    totalResults: 0,
  });

  const getMovies = async (page = 1, append = false) => {
    try {
      setIsGettingMovies(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/moviesTv?page=${page}`
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch movies");
        return data;
      }
      setIsGettingMovies(false);
      setMovies((prev) => (append ? [...prev, ...data.data] : data.data));
      setPagination({
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
      });

      return data;
    } catch (error) {
      setIsGettingMovies(false);
      console.error("Error fetching movies:", error.message);
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };

  const value = {
    movies,
    pagination,
    getMovies,
    query,
    setQuery,
    isGettingMovies,
  };

  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export const useMovieContext = () => useContext(movieContext);
