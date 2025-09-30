"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-amber-900 text-white min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-amber-900/90 z-0 "></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg animate-fadeInDown">
          🎬 Discover Your Next Favorite Movie
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-amber-100 max-w-2xl animate-fadeInUp">
          Explore trending movies, manage collections, and never miss a show.
        </p>

        <div className="mt-8 flex space-x-4 animate-fadeIn">
          <Link
            href="#movies"
            className="bg-white text-amber-900 px-6 py-3 rounded-xl font-semibold hover:bg-amber-100 transition"
          >
            Browse Movies
          </Link>
          <Link
            href="/collection"
            className="bg-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition"
          >
            My Collections
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 text-8xl text-amber-50 opacity-20 animate-slide">
        🎥
      </div>
    </section>
  );
}
