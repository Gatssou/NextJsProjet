"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/ConnectedHeader";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { UserAvatarData } from "@/types/UserAvatar";
import Footer from "../components/Footer/Footer";

axios.defaults.withCredentials = true;

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserAvatarData | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("/api/auth/verify", { withCredentials: true });

        if (!res.data.authenticated) {
          router.replace("/");
        } else {
          // On ne prend que ce dont on a besoin pour le dashboard
       const { username, avatarUrl } = res.data.user as {
  username: string;
  avatarUrl?: string | null;
};
setUser({ username, avatarUrl });
          setLoading(false);
        }
      } catch (err) {
        router.replace("/");
      }
    };

    verifyAuth();
  }, [router]);

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
          <p className="text-lg text-slate-300 font-semibold">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <ConnectedHeader />

      {/* Background effects */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 space-y-6">
          {/* Dashboard Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full">
            <svg className="w-4 h-4 text-blue-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Tableau de bord</span>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Welcome message */}
          <div className="flex items-center gap-3 flex-wrap">
            {user && <UserAvatar user={user} size={48} />}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg blur opacity-50"></div>
              <div className="relative px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                  {user?.username}
                </span>
              </div>
            </div>
          </div>

          <p className="text-slate-400 max-w-3xl leading-relaxed">
            Ici tu pourras changer ta photo de <a href="/dashboard/profile"><button className="text-white font-weight 800 cursor-pointer"><strong>Profil</strong></button></a>, gérer ton compte, voir tes posts, fanarts et futurs jeux tour par tour. Explore tes statistiques, gère ton contenu et reste connecté avec la communauté.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* --- Gestion Fanart Card --- */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 h-full">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-pink-500/20 border border-pink-400/30 rounded-xl">
                  <svg className="w-8 h-8 text-pink-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="px-2 py-1 bg-pink-500/20 border border-pink-400/30 rounded-full text-xs font-bold text-pink-300">12</span>
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text mb-2">
                Gestion Fanart
              </h3>
              <p className="text-sm text-slate-400 mb-4">Gérez vos créations artistiques et fanarts</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm">
                Gérer →
              </button>
            </div>
          </div>

          {/* --- Gestion Posts Card --- */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 h-full">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-500/20 border border-purple-400/30 rounded-xl">
                  <svg className="w-8 h-8 text-purple-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs font-bold text-purple-300">8</span>
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text mb-2">
                Gestion Posts
              </h3>
              <p className="text-sm text-slate-400 mb-4">Gérez vos publications et articles</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm">
                Gérer →
              </button>
            </div>
          </div>

          {/* --- Info Card --- */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 h-full">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-cyan-500/20 border border-cyan-400/30 rounded-lg">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <a href="/dashboard/profile">
                    <h3 className="text-lg font-bold text-cyan-400 mb-2 cursor-pointer">
                      Informations
                    </h3>
                  </a>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia nisi qui, eos nobis id quasi minus assumenda consectetur eum expedita laboriosam ipsum, vitae accusamus voluptatem labore modi eius necessitatibus illo?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- Statistics Card --- */}
          <div className="md:col-span-2 lg:col-span-3 group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl opacity-10 blur"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text mb-6">
                Statistiques rapides
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-400 mb-1">12</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Fanarts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400 mb-1">8</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-400 mb-1">247</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Vues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-400 mb-1">45</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">J'aime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
       <Footer />
    </div>
  );
}
