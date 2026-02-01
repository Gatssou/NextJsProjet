"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Fanart", href: "/fanart" },
  { label: "Posts", href: "/posts" },
  { label: "Jeux", href: "/jeux" },
];

export default function ConnectedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      // ⚠️ On utilise chemin relatif pour prod et local
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
    } catch (err) {
      console.error("Erreur logout", err);
    }
  };

  return (
    <header className="z-40 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/connectedPage")}
      >
        MonSite
      </h1>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:underline hover:text-gray-200 transition"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={logout}
          className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
        >
          Déconnexion
        </button>
      </nav>

      {/* Mobile menu burger */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl p-2"
        >
          ☰
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 hover:bg-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={logout}
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded m-2"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
