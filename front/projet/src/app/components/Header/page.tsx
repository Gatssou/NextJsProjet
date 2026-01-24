"use client";
import { useState, useEffect } from "react";
import AuthForm from "../AuthForm";
import MobileOverlay from "../MobileOverlay/page";

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
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">MonSite</h1>
      {!isMobile && <AuthForm />}
      {isMobile && (
        <>
          <button
            className="p-2 border rounded text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          {menuOpen && <MobileOverlay onClose={() => setMenuOpen(false)} />}
        </>
      )}
    </header>
  );
}
