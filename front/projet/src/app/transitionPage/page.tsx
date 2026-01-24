"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransitionPage() {
  const router = useRouter();

  useEffect(() => {
    // Après 2.5 secondes, redirige vers /connectedPage
    const timer = setTimeout(() => {
      router.push("/connectedPage");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Placeholder image */}
      <div className="mb-6 w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src="/placeholder-connexion.png" // <-- remplace par ton image
          alt="Connexion réussie"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Connexion réussie !</h2>
      <p className="text-gray-700 mb-6">Redirection vers votre tableau de bord...</p>

      {/* Loader animé */}
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
