import React from "react";

const MovieCard = ({ movie, onClick, name }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col">
      <div className="w-full aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster || "/fallback.jpg"}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-semibold line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400">{movie.mediaType}</p>

        {/* Button */}
        <button
          onClick={() =>
            onClick(name === "Remove From Collection" ? movie._id : movie)
          }
          className={`mt-4 w-full px-3 py-2 text-xs md:text-sm font-medium rounded-lg hover:cursor-pointer ${
            name === "Remove From Collection"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
