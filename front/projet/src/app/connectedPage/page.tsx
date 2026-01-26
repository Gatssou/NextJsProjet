"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/page";

axios.defaults.withCredentials = true;

export default function ConnectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // état de chargement pour vérifier le token

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/verify");
        if (!res.data.authenticated) {
          // ❌ Non connecté → redirection vers /
          router.replace("/");
        } else {
          // ✅ Connecté → on affiche la page
          setLoading(false);
        }
      } catch (err) {
        // ❌ Erreur / pas de token → redirection vers /
        router.replace("/");
      }
    };
    verifyAuth();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Chargement...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header pour utilisateur connecté */}
      <ConnectedHeader />

      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-black">Bienvenue sur MonSite connecté</h2>
        <p>Placeholders pour fanart, posts et futurs jeux tour par tour.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div className="bg-white p-4 rounded shadow">Fanart placeholder</div>
          <div className="bg-white p-4 rounded shadow">Posts placeholder</div>
        </div>
      </main>
    </div>
  );
}
