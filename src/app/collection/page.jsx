"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import MovieCard from "@/components/MovieCard";
import ShimmerCard from "@/components/ShimmerCard";

export default function CollectionsPage() {
  const {
    getUserCollections,
    getMoviesInCollection,
    deleteMovieFromCollection,
    deleteCollection,
    gettingMovieOfCollection,
  } = useUserContext();

  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [movies, setMovies] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingMovieId, setDeletingMovieId] = useState(null);

  const fetchCollections = async () => {
    const data = await getUserCollections();
    if (data.success) {
      setCollections(data.collections);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleSelectCollection = async (collection) => {
    setSelectedCollection(collection);
    const data = await getMoviesInCollection(collection._id);
    if (data.success) {
      setMovies(data.movies);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this collection?"
    );
    if (!confirmed) return;
    setDeletingId(collectionId);
    const data = await deleteCollection(collectionId);
    setDeletingId(null);
    if (data.success) {
      await fetchCollections();
      if (selectedCollection?._id === collectionId) {
        setSelectedCollection(null);
        setMovies([]);
      }
    }
  };

  const handleRemoveMovie = async (movieId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this movie from the collection?"
    );
    if (!confirmed) return;

    setDeletingMovieId(movieId);
    const data = await deleteMovieFromCollection(movieId);
    setDeletingMovieId(null);

    if (data.success) {
      setMovies((prev) => prev.filter((m) => m._id !== movieId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Collections</h1>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {collections.length > 0 ? (
          collections.map((col) => (
            <div
              key={col._id}
              onClick={() => handleSelectCollection(col)}
              className={`min-w-[250px] p-4 rounded-xl cursor-pointer shadow-lg transition ${
                selectedCollection?._id === col._id
                  ? "bg-amber-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <h2 className="text-lg font-semibold">{col.title}</h2>
              <p className="text-sm text-gray-300 line-clamp-2">
                {col.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCollection(col._id);
                }}
                className="mt-2 px-2 py-1 text-xs font-medium rounded-md hover:cursor-pointer bg-red-600 hover:bg-red-700 disabled:opacity-50"
                disabled={deletingId === col._id}
              >
                {deletingId === col._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No collections yet...</p>
        )}
      </div>

      {selectedCollection && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Movies in "{selectedCollection.title}"
          </h2>

          {gettingMovieOfCollection ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ShimmerCard key={i} />
              ))}
            </div>
          ) : movies.length === 0 ? (
            <p className="text-gray-400">No Movies Has been added So Far</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={handleRemoveMovie}
                  name={
                    deletingMovieId === movie._id
                      ? "Deleting..."
                      : "Remove From Collection"
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
