"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type NavLink = {
  label: string;
  href: string;
  target?: "_blank";
  rel?: string;
};

const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Fanart",
    href: "https://animedessins.vercel.app/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { label: "Posts", href: "/posts" },
  { label: "Jeux", href: "/jeux" },
];

export default function ConnectedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      router.push("/");
    } catch (err) {
      console.error("Erreur logout", err);
    }
  };

  const renderLink = (link: NavLink) => {
    const isExternal = link.href.startsWith("http");

    if (isExternal) {
      return (
        <a
          key={link.label}
          href={link.href}
          target={link.target}
          rel={link.rel}
          className="px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-800/50 hover:text-white"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.href}
        className="px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-800/50 hover:text-white"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="z-40 bg-slate-900/70 backdrop-blur-xl text-white p-4 shadow-lg flex justify-between items-center border-b border-slate-700/50">
      {/* Logo */}
      <h1
        className="text-2xl font-extrabold cursor-pointer bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        onClick={() => router.push("/connectedPage")}
      >
        MonSite
      </h1>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map(renderLink)}
        <button
          onClick={logout}
          className="ml-4 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all duration-200 shadow-sm shadow-red-500/30"
        >
          Déconnexion
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl p-2 focus:outline-none"
        >
          ☰
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-4 w-52 bg-slate-900/95 backdrop-blur-lg text-white rounded-xl shadow-xl flex flex-col border border-slate-700/50 overflow-hidden animate-slideDown">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("http");

              return isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  className="px-4 py-3 hover:bg-slate-800/50 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 hover:bg-slate-800/50 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              onClick={logout}
              className="mt-2 mb-2 mx-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-500/30 transition-all duration-200"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
