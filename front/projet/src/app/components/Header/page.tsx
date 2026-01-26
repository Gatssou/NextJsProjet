"use client";
import { useState, useEffect } from "react";
import AuthForm from "../AuthForm";
import MobileOverlay from "../MobileOverlay/page";
import Sidebar from "../Sidebar/page";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar à gauche */}
      <Sidebar isMobile={isMobile} />

      <div className="flex-1 flex flex-col">
        {/* Header en top */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <a href="#">
              <h1 className="text-2xl font-bold text-red-600">MonSite</h1>
          </a>

          {/* AuthForm Desktop */}
          {!isMobile && (
            <div className="w-80">
              <AuthForm />
            </div>
          )}

          {/* Menu burger Mobile */}
          {isMobile && (
            <button
              className="p-2 border rounded text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          )}
        </header>

        {/* Overlay mobile */}
        {isMobile && menuOpen && (
          <MobileOverlay onClose={() => setMenuOpen(false)} />
        )}

        {/* Main content */}
        <main className="p-6 flex-1 text-black">
          <h2 className="text-xl font-bold text-black">Contenu principal</h2>
          <p>Placeholders pour fanart, posts et futurs jeux...</p>
        </main>
      </div>
    </div>
  );
}
