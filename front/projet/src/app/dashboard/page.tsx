"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/ConnectedHeader";
import styles from "./dashboard.module.css";

axios.defaults.withCredentials = true;

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // ⚠️ Utilisation chemin relatif pour prod et local
        const res = await axios.get("/api/auth/verify");

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
      <ConnectedHeader />

      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-blue-500">Dashboard</h1>
        <p className="mb-2 text-black">
          Bienvenue{" "}
          <span className="font-semibold">{user?.username}</span> !
        </p>
        <p>
          Ici tu pourras gérer ton compte, voir tes posts, fanarts et futurs
          jeux tour par tour.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow text-black">
            Gestion Fanart
          </div>
          <div className="bg-white p-4 rounded shadow text-black">
            Gestion Posts
          </div>
          <div className={styles["romimins"]}>
            <p className={styles["romiminsPara"]}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia nisi
              qui, eos nobis id quasi minus assumenda consectetur eum expedita
              laboriosam ipsum, vitae accusamus voluptatem labore modi eius
              necessitatibus illo?
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
