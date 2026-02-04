'use client';

import { useState } from 'react';
import { Battle } from '@/types/battle';
import BattleCard from '../BattleCard/BattleCard';

interface BattleArenaProps {
  battle: Battle;
  onVote?: (artistId: number) => void;
  userVote?: number | null;
}

export default function BattleArena({ battle, onVote, userVote }: BattleArenaProps) {
  const [localUserVote, setLocalUserVote] = useState<number | null>(userVote || null);

  // Calcul des votes
  const votes1 = battle.votes?.artist1Votes || 0;
  const votes2 = battle.votes?.artist2Votes || 0;
  const totalVotes = votes1 + votes2;

  // Déterminer le gagnant
  const winner = votes1 > votes2 ? battle.artist1.id : votes2 > votes1 ? battle.artist2.id : null;

  const handleVote = (artistId: number) => {
    if (localUserVote) return; // Déjà voté
    
    setLocalUserVote(artistId);
    onVote?.(artistId);
  };

  // Statut de la battle
  const getStatusBadge = () => {
    switch (battle.status) {
      case 'ongoing':
        return (
          <span className="px-4 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            En cours
          </span>
        );
      case 'finished':
        return (
          <span className="px-4 py-1.5 bg-slate-700/50 text-slate-400 border border-slate-600/50 rounded-full text-sm font-semibold">
            Terminée
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm font-semibold">
            À venir
          </span>
        );
    }
  };

  return (
    <div className="relative">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse blur-3xl"></div>
      </div>

      <div className="relative space-y-6">
        {/* Header de l'arène */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 p-6 md:p-8">
          {/* Effet de grille */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative z-10 space-y-4">
            {/* Titre et statut */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                {/* Theme tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
                  <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                  <span className="text-xs font-semibold text-purple-400">{battle.arenaTheme}</span>
                </div>

                {/* Titre principal */}
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
                  {battle.title}
                </h1>
              </div>

              {/* Statut */}
              <div className="flex items-center gap-3">
                {getStatusBadge()}
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">
              {battle.description}
            </p>

            {/* Stats de la battle */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <span className="text-sm text-slate-400">
                  <span className="font-bold text-white">{totalVotes}</span> votes
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-400">
                  Commence le <span className="font-semibold text-white">
                    {new Date(battle.startDate).toLocaleDateString('fr-FR')}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VS Divider - Desktop */}
        <div className="hidden md:flex justify-center items-center py-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 blur-xl opacity-50"></div>
            <div className="relative bg-slate-900 border-4 border-slate-700 rounded-full w-20 h-20 flex items-center justify-center">
              <span className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
                VS
              </span>
            </div>
          </div>
        </div>

        {/* Battle Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-0">
          {/* Artiste 1 */}
          <BattleCard
            artist={battle.artist1}
            post={battle.post1}
            position="left"
            votes={votes1}
            totalVotes={totalVotes}
            hasVoted={localUserVote !== null}
            onVote={() => handleVote(battle.artist1.id)}
            isWinner={battle.status === 'finished' && winner === battle.artist1.id}
          />

          {/* VS Divider - Mobile */}
          <div className="md:hidden flex justify-center items-center py-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 blur-lg opacity-50"></div>
              <div className="relative bg-slate-900 border-4 border-slate-700 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
                  VS
                </span>
              </div>
            </div>
          </div>

          {/* Artiste 2 */}
          <BattleCard
            artist={battle.artist2}
            post={battle.post2}
            position="right"
            votes={votes2}
            totalVotes={totalVotes}
            hasVoted={localUserVote !== null}
            onVote={() => handleVote(battle.artist2.id)}
            isWinner={battle.status === 'finished' && winner === battle.artist2.id}
          />
        </div>

        {/* Message si l'utilisateur a voté */}
        {localUserVote && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-400">Vote enregistré !</p>
                <p className="text-sm text-green-300/70">Merci d'avoir participé à cette battle</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}