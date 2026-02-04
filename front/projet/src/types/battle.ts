// Types pour le système de battle

export interface Artist {
  id: number;
  username: string;
  avatarUrl: string | null;
  stats?: {
    wins: number;
    losses: number;
    draws: number;
  };
}

export interface BattlePost {
  id: string;
  artistId: number;
  imageUrl: string;
  title: string;
  description?: string;
  createdAt: Date | string;
  votes?: number;
}

export interface Battle {
  id: string;
  title: string;
  description: string;
  arenaTheme: string;
  status: 'ongoing' | 'finished' | 'upcoming';
  startDate: Date | string;
  endDate?: Date | string;
  artist1: Artist;
  artist2: Artist;
  post1?: BattlePost;
  post2?: BattlePost;
  votes?: {
    artist1Votes: number;
    artist2Votes: number;
  };
}

export interface BattleArenaProps {
  battle: Battle;
  onVote?: (artistId: number) => void;
  userVote?: number | null;
}