"use client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10 animate-fadeInDown ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white">🎬 MovieApp</h2>
          <p className="mt-4 text-sm text-gray-500">
            Discover and manage your favorite movies and TV shows. Built with ❤️
            Md Afjal Ansari.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <a href="/" className="hover:text-amber-500 transition">
            Home
          </a>
          <a href="/movies" className="hover:text-amber-500 transition">
            Movies
          </a>
          <a href="/tv" className="hover:text-amber-500 transition">
            TV Shows
          </a>
          <a href="/collections" className="hover:text-amber-500 transition">
            Collections
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} MovieApp. All rights reserved.
      </div>
    </footer>
  );
}
