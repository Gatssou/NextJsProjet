"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/ConnectedHeader";

axios.defaults.withCredentials = true;

export default function ConnectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
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

  // Loading state with futuristic design
  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Loader */}
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <ConnectedHeader />

      {/* Background effects */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <main className="relative flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        
        {/* Welcome Section */}
        <div className="mb-12 space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/50 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Connecté</span>
          </div>

          {/* Welcome title */}
          <div className="space-y-3">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Bienvenue sur votre espace
            </h2>
            
            {/* Username display */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 flex-wrap">
            <p className="text-lg text-slate-300">
              Bienvenue
            </p>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg blur opacity-50"></div>
              <div className="relative px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                  {user?.username}
                </span>
              </div>
            </div>
            <span className="text-lg text-slate-300"></span>
          </div>
              <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full">
                <span className="text-xs font-bold text-purple-300">PRO</span>
              </div>
            </div>

            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>

          <p className="text-lg text-slate-300 max-w-2xl">
            Découvrez vos fanarts, partagez vos créations et participez à des parties multijoueurs en tour par tour.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Fanart Card */}
          <div className="group relative">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
            
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 lg:p-8 hover:border-cyan-500/50 transition-all duration-300 h-full">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                    Fanart Gallery
                  </h3>
                  <p className="text-sm text-slate-400">Vos créations artistiques</p>
                </div>
                <div className="p-3 bg-cyan-500/20 border border-cyan-400/30 rounded-xl">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-48 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center">
                  <p className="text-slate-500 text-sm">Aucun fanart pour le moment</p>
                </div>
                
                <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                  Ajouter un fanart
                </button>
              </div>
            </div>
          </div>

          {/* Posts Card */}
          <div className="group relative">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
            
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 lg:p-8 hover:border-purple-500/50 transition-all duration-300 h-full">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    Publications
                  </h3>
                  <p className="text-sm text-slate-400">Partagez avec la communauté</p>
                </div>
                <div className="p-3 bg-purple-500/20 border border-purple-400/30 rounded-xl">
                  <svg className="w-6 h-6 text-purple-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-48 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center">
                  <p className="text-slate-500 text-sm">Aucune publication</p>
                </div>
                
                <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                  Créer une publication
                </button>
              </div>
            </div>
          </div>

          {/* Coming Soon Card - Tour par tour */}
          <div className="lg:col-span-2 group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur"></div>
            
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-pink-500/20 backdrop-blur-sm border border-pink-400/50 rounded-full">
                <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">Bientôt disponible</span>
              </div>
              
              <h3 className="text-3xl font-black mb-3 text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text">
                Jeux Tour par Tour
              </h3>
              <p className="text-slate-300 mb-6">Préparez-vous à défier vos amis dans des parties stratégiques palpitantes !</p>
              
              <div className="flex justify-center gap-4">
                <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Joueurs inscrits</p>
                  <p className="text-2xl font-bold text-cyan-400">2.4K+</p>
                </div>
                <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">En développement</p>
                  <p className="text-2xl font-bold text-purple-400">78%</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}