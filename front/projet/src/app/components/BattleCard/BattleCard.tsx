'use client';

import { Artist, BattlePost } from '@/types/battle';
import Image from 'next/image';

interface BattleCardProps {
  artist: Artist;
  post?: BattlePost;
  position: 'left' | 'right';
  votes: number;
  totalVotes: number;
  hasVoted?: boolean;
  onVote?: () => void;
  isWinner?: boolean;
}

export default function BattleCard({
  artist,
  post,
  position,
  votes,
  totalVotes,
  hasVoted = false,
  onVote,
  isWinner = false
}: BattleCardProps) {
  const votePercentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  
  // Placeholder image si pas de post
  const postImage = post?.imageUrl || 'https://via.placeholder.com/600x400?text=En+attente';

  return (
    <div className={`relative group ${position === 'left' ? 'md:pr-4' : 'md:pl-4'}`}>
      {/* Glow effect pour le gagnant */}
      {isWinner && (
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
      )}

      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
        {/* Header - Avatar et pseudo */}
        <div className="relative p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-75"></div>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700">
                <Image
                  src={artist.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.username)}&background=3b82f6&color=fff&size=128`}
                  alt={artist.username}
                  fill
                  className="object-cover"
                  unoptimized={!artist.avatarUrl}
                />
              </div>
            </div>

            {/* Infos artiste */}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                {artist.username}
              </h3>
              {artist.stats && (
                <p className="text-xs text-slate-400">
                  {artist.stats.wins}W - {artist.stats.losses}L - {artist.stats.draws}D
                </p>
              )}
            </div>

            {/* Badge gagnant */}
            {isWinner && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-bold text-white">Winner</span>
              </div>
            )}
          </div>
        </div>

        {/* Image du post */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-800">
          <Image
            src={postImage}
            alt={post?.title || 'Battle post'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={postImage.includes('placeholder')}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          
          {/* Info post en overlay */}
          {post && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h4 className="font-semibold text-lg mb-1 line-clamp-2">{post.title}</h4>
              {post.description && (
                <p className="text-sm text-slate-300 line-clamp-2">{post.description}</p>
              )}
            </div>
          )}

          {/* Badge "En attente" si pas de post */}
          {!post && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700">
                <p className="text-slate-400 font-medium">En attente de submission</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Votes et action */}
        <div className="p-4 bg-slate-900/50 border-t border-slate-700/50">
          {/* Barre de progression des votes */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-300">
                {votes} votes
              </span>
              <span className="text-sm font-bold text-cyan-400">
                {votePercentage}%
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                style={{ width: `${votePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Bouton de vote */}
          {onVote && (
            <button
              onClick={onVote}
              disabled={hasVoted}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                hasVoted
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95'
              }`}
            >
              {hasVoted ? '✓ Voté' : 'Voter pour cet artiste'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}