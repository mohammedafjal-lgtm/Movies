"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { FaLaptopHouse } from "react-icons/fa";
import { toast } from "react-toastify";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isloginOrRegister, setIsLoginOrRegister] = useState(false);
  const [gettingMovieOfCollection, setGettingMovieOfCollection] =
    useState(false);

  const register = async ({ name, email, password }) => {
    try {
      setIsLoginOrRegister(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Sign up failed");
        return data;
      }
      setIsLoginOrRegister(false);
      localStorage.setItem("token", data.token);
      setUser(true);
      toast.success("Signed up successfully");
      return data;
    } catch (error) {
      setIsLoginOrRegister(false);
      console.error("Register error:", error.message);
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      setIsLoginOrRegister(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return data;
      }
      setIsLoginOrRegister(false);

      localStorage.setItem("token", data.token);
      setUser(true);
      toast.success("Logged in successfully");
      return data;
    } catch (error) {
      setIsLoginOrRegister(false);
      console.error("Login error:", error.message);
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      setUser(null);
      toast.success("User Logged Out!");
    }
  };

  const getUserCollections = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/collections`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch collections");
      }
      return data;
    } catch (error) {
      console.error("Error fetching collections:", error.message);
      return { success: false, message: error.message };
    }
  };

  const createCollection = async ({ title, description }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create collection");
        return data;
      }
      toast.success(`${title} created successfully`);
      return data;
    } catch (error) {
      console.error("Error creating collection:", error.message);
      return { success: false, message: error.message };
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/collections/${collectionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete collection");
        return data;
      }

      toast.success("Collection deleted successfully");
      return data;
    } catch (error) {
      console.error("Error deleting collection:", error.message);
      return { success: false, message: error.message };
    }
  };

  const getMoviesInCollection = async (collectionId) => {
    try {
      setGettingMovieOfCollection(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/movies/${collectionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch movies");
      }
      setGettingMovieOfCollection(false);

      return data;
    } catch (error) {
      setGettingMovieOfCollection(false);
      console.error("Error fetching movies:", error.message);
      return { success: false, message: error.message };
    }
  };

  // { tmdbId, title, poster, mediaType }---movie
  const addMovieToCollection = async (collectionId, movie) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/movies/${collectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(movie),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add movie");
        return data;
      }

      toast.success("Movie added successfully");
      return data;
    } catch (error) {
      console.error("Error adding movie:", error.message);
      return { success: false, message: error.message };
    }
  };

  const deleteMovieFromCollection = async (movieId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete movie");
        return data;
      }

      toast.success("Movie deleted successfully");
      return data;
    } catch (error) {
      console.error("Error deleting movie:", error.message);
      return { success: false, message: error.message };
    }
  };

  const addMovie = async ({ title, poster, mediaType }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/movieTv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, poster, mediaType }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add movie");
        return data;
      }

      // Add new movie at top of list (optimistic update)
      setMovies((prev) => [data.data, ...prev]);

      toast.success("Movie added successfully");
      return data;
    } catch (error) {
      console.error("Error adding movie:", error.message);
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
    }
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    getUserCollections,
    createCollection,
    deleteCollection,
    getMoviesInCollection,
    addMovieToCollection,
    deleteMovieFromCollection,
    addMovie,
    isloginOrRegister,
    gettingMovieOfCollection,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUserContext = () => useContext(userContext);
