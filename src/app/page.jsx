"use client";
import React, { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import { useMovieContext } from "@/context/MovieContext";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import MovieCard from "@/components/MovieCard";
import CollectionComponent from "@/components/CollectionComponent";
import ShimmerCard from "@/components/ShimmerCard";

const Home = () => {
  const router = useRouter();
  const { query, movies, pagination, getMovies, isGettingMovies } =
    useMovieContext();

  const {
    user,
    getUserCollections,
    createCollection,
    addMovieToCollection,
    deleteCollection,
  } = useUserContext();

  const [movieToAddInCollection, setMovieToAddInCollection] = useState({});
  const [showCollections, setShowCollections] = useState(false);
  const [collections, setCollections] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // loaders
  const [isCreating, setIsCreating] = useState(false);
  const [addingTo, setAddingTo] = useState(null);

  useEffect(() => {
    getMovies(1);
  }, []);

  const handleShowMore = () => {
    if (pagination.page < pagination.totalPages) {
      getMovies(pagination.page + 1, true);
    }
  };

  const filteredMovies = useMemo(() => {
    if (!query) return movies;
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [movies, query]);

  const handleAddToCollection = async (movie) => {
    if (!user) {
      router.push("/loginRegister");
      return;
    }
    const data = await getUserCollections();
    setCollections(data.collections);

    const cleanedMovie = {
      tmdbId: movie.tmdbId,
      title: movie.title,
      poster: movie.poster,
      mediaType: movie.mediaType,
    };

    setMovieToAddInCollection(cleanedMovie);
    setShowCollections(true);
  };

  // add movie into collection
  const addToCollection = async (collectionId) => {
    try {
      setAddingTo(collectionId);
      const data = await addMovieToCollection(
        collectionId,
        movieToAddInCollection
      );
      if (data.success) {
        const updated = await getUserCollections();
        setCollections(updated.collections);
        setShowCollections(false);
      }
    } finally {
      setAddingTo(null);
    }
  };

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const data = await createCollection({
        title: newTitle,
        description: newDesc,
      });
      if (data.success) {
        const updated = await getUserCollections();
        setCollections(updated.collections);
        setNewTitle("");
        setNewDesc("");
        setShowCreateForm(false);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCollection = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection?"))
      return;
    await deleteCollection(id);
    const updated = await getUserCollections();
    setCollections(updated.collections);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <main className="flex-1">
        <Hero />
        <section className="max-w-6xl mx-auto px-6 mt-10 flex flex-col justify-between pb-5">
          <h2 className="text-2xl font-bold mb-6 " id="movies">
            Latest Movies
          </h2>

          {isGettingMovies ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ShimmerCard key={i} />
                ))}
              </div>
            </>
          ) : filteredMovies.length === 0 ? (
            <p className="text-gray-400">No movies found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredMovies.map((movie, i) => (
                <MovieCard
                  key={i}
                  movie={movie}
                  onClick={handleAddToCollection}
                  name="Add to collection"
                />
              ))}
            </div>
          )}

          {pagination.page < pagination.totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleShowMore}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg hover:cursor-pointer"
              >
                Show More
              </button>
            </div>
          )}
        </section>
      </main>

      {showCollections && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Choose Collection</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {collections.length > 0 ? (
                collections.map((cl) => (
                  <CollectionComponent
                    key={cl._id}
                    addToCollection={addToCollection}
                    deleteCollection={handleDeleteCollection}
                    cl={cl}
                    addingTo={addingTo}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-sm">No collections yet.</p>
              )}
            </div>

            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center justify-center hover:cursor-pointer"
              >
                <span className="text-xl font-bold">+</span> Create New
                Collection
              </button>
            ) : (
              <form
                onSubmit={handleCreateCollection}
                className="space-y-3 mt-4"
              >
                <input
                  type="text"
                  placeholder="Collection Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  rows="2"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 hover:cursor-pointer"
                  >
                    {isCreating ? "Creating..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={() => setShowCollections(false)}
              className="mt-6 w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
