"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/ConnectedHeader";
import { User } from "@/types/user";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { UserAvatarData } from '@/types/UserAvatar';
import Footer from "../components/Footer/Footer";

axios.defaults.withCredentials = true;

export default function ConnectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("/api/auth/verify", { withCredentials: true });

        if (!res.data.authenticated || !res.data.user) {
          router.replace("/");
          return;
        }

        setUser(res.data.user);
      } catch (err) {
        console.error("Erreur vérification auth :", err);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  // Callback pour mettre à jour l'avatar
 const handleAvatarUpdate = (newAvatarUrl: string | null) => {
  if (user) setUser({ ...user, avatarUrl: newAvatarUrl ?? user.avatarUrl });
};

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-4 border-4 border-transparent border-t-pink-500 border-r-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-lg text-slate-300 font-semibold">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <ConnectedHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-700 font-medium">Impossible de charger le profil.</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retour au dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <ConnectedHeader />

      <main className="relative flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Profil header */}
        <div className="mb-12 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg blur opacity-50"></div>
              <div className="relative px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                  {user.username}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Uploader */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Photo de profil</h2>
          <UserAvatar user={user} />
        </div>

        {/* Autres informations utilisateur */}
       
      </main>
      <Footer />
    </div>
    
  );
}
