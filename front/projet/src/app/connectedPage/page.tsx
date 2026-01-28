"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/ConnectedHeader";

axios.defaults.withCredentials = true;

export default function ConnectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // état de chargement pour vérifier le token
 const [user,setUser] = useState<{ username: string } | null>(null);
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // ⚠️ Utilisation chemin relatif pour prod et local
     const res = await axios.get("/api/auth/verify", { withCredentials: true });

        if (!res.data.authenticated) {
          router.replace("/");
        } else {
          setUser(res.data.user);
          setLoading(false);
        }
      } catch (err) {
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
        <h2 className="text-2xl font-bold mb-4 text-black">
          Bienvenue sur MonSite connecté 
        </h2>
         <span className="font-semibold text-black height 50px">{user?.username}</span> 
        <p className="text-black">Placeholders pour fanart, posts et futurs jeux tour par tour.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div className="bg-white p-4 rounded shadow">Fanart placeholder</div>
          <div className="bg-white p-4 rounded shadow">Posts placeholder</div>
        </div>
      </main>
    </div>
  );
}
