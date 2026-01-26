"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/page";
import  styles from "./dashboard.module.css";

axios.defaults.withCredentials = true;

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/verify");
        if (!res.data.authenticated) {
          // ❌ Non connecté → redirection vers /
          router.replace("/");
        } else {
          // ✅ Connecté → on récupère l'utilisateur et on affiche le contenu
          setUser(res.data.user);
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
        <h1 className="text-3xl font-bold mb-4 text-blue-500">Dashboard</h1>
        <p className="mb-2 text-black">Bienvenue <span className="font-semibold">{user?.username}</span> !</p>
        <p>Ici tu pourras gérer ton compte, voir tes posts, fanarts et futurs jeux tour par tour.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow text-black">Gestion Fanart</div>
          <div className="bg-white p-4 rounded shadow text-black">Gestion Posts</div>
          <div className={styles["romimins"]}>
            <p className={styles["romiminsPara"]}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia nisi qui, eos nobis id quasi minus assumenda consectetur eum expedita laboriosam ipsum, vitae accusamus voluptatem labore modi eius necessitatibus illo?</p>
          </div>
        </div>
      </main>
    </div>
  );
}
