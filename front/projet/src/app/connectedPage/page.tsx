"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConnectedHeader from "../components/ConnectedHeader/ConnectedHeader";
import { User } from "@/types/user";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import BattleArena from "../components/BattleArena/BattleArena";
import { Battle } from "@/types/battle";
import { mockBattles } from "@/lib/mockBattles";
import Footer from "../components/Footer/Footer";

axios.defaults.withCredentials = true;

export default function ConnectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [battles, setBattles] = useState<Battle[]>([]);
  const [userVotes, setUserVotes] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("/api/auth/verify", { withCredentials: true });

        if (!res.data.authenticated || !res.data.user) {
          router.replace("/");
          return;
        }

        setUser(res.data.user);
        
        // Charger les battles (pour l'instant mock data)
        // TODO: Remplacer par un appel API réel
        setBattles(mockBattles);
        
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

  // Callback pour gérer les votes
  const handleVote = async (battleId: string, artistId: number) => {
    // TODO: Implémenter l'appel API pour enregistrer le vote
    console.log(`Vote pour l'artiste ${artistId} dans la battle ${battleId}`);
    
    // Enregistrer le vote localement
    setUserVotes(prev => new Map(prev).set(battleId, artistId));
    
    // TODO: Appel API exemple
    // try {
    //   await axios.post(`/api/battles/${battleId}/vote`, { artistId });
    // } catch (error) {
    //   console.error('Erreur lors du vote:', error);
    // }
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

      <main className="relative flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Profil header */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Info utilisateur */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg blur opacity-50"></div>
                <div className="relative px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                  <span className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                    {user.username}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation rapide */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/dashboard/profile')}
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 transition-all duration-200 text-sm font-medium"
              >
                Mon Profil
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-200 text-sm font-medium"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Section Avatar (collapsible sur mobile) */}
        <details className="mb-8 group">
          <summary className="cursor-pointer list-none">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Photo de profil
                </h2>
                <svg 
                  className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </summary>
          <div className="mt-4 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <UserAvatar user={user} />
          </div>
        </details>

        {/* Section Battles */}
        <div className="space-y-8">
          {/* Header de section */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text flex items-center gap-3">
              <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Battles en cours
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>

          {/* Liste des battles */}
          {battles.length > 0 ? (
            <div className="space-y-12">
              {battles.map((battle) => (
                <BattleArena
                  key={battle.id}
                  battle={battle}
                  onVote={(artistId) => handleVote(battle.id, artistId)}
                  userVote={userVotes.get(battle.id) || null}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-400 mb-2">Aucune battle en cours</h3>
              <p className="text-slate-500">Les prochaines battles arriveront bientôt !</p>
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Prêt à participer ?
              </h3>
              <p className="text-slate-300">
                Soumettez vos créations et affrontez les meilleurs artistes de la communauté !
              </p>
            </div>
            <button 
              onClick={() => router.push('/dashboard/submit')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Soumettre une création
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}