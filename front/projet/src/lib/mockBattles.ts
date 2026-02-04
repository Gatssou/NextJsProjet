import { Battle } from '@/types/battle';

// Données mock pour les tests
// TODO: Remplacer par des vraies données depuis l'API

export const mockBattles: Battle[] = [
  {
    id: 'battle-1',
    title: 'Clash des Titans : Street Art Edition',
    description: 'Deux légendes du street art s\'affrontent dans une battle épique. Qui maîtrise le mieux les bombes et les couleurs ?',
    arenaTheme: 'Street Art',
    status: 'ongoing',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-15'),
    artist1: {
      id: 1,
      username: 'UrbanKing',
      avatarUrl: null,
      stats: {
        wins: 12,
        losses: 3,
        draws: 1
      }
    },
    artist2: {
      id: 2,
      username: 'SprayMaster',
      avatarUrl: null,
      stats: {
        wins: 10,
        losses: 4,
        draws: 2
      }
    },
    post1: {
      id: 'post-1',
      artistId: 1,
      imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=1000&fit=crop',
      title: 'Urban Jungle',
      description: 'Ma vision de la jungle urbaine en plein cœur de la ville',
      createdAt: new Date('2024-02-01'),
      votes: 145
    },
    post2: {
      id: 'post-2',
      artistId: 2,
      imageUrl: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=1000&fit=crop',
      title: 'Neon Dreams',
      description: 'Quand les rêves néon rencontrent le béton',
      createdAt: new Date('2024-02-01'),
      votes: 132
    },
    votes: {
      artist1Votes: 145,
      artist2Votes: 132
    }
  },
  {
    id: 'battle-2',
    title: 'Digital Art Showdown',
    description: 'Le futur de l\'art digital se joue ici. Deux visionnaires s\'affrontent avec leurs créations les plus audacieuses.',
    arenaTheme: 'Digital Art',
    status: 'ongoing',
    startDate: new Date('2024-02-05'),
    endDate: new Date('2024-02-20'),
    artist1: {
      id: 3,
      username: 'PixelWizard',
      avatarUrl: null,
      stats: {
        wins: 8,
        losses: 5,
        draws: 0
      }
    },
    artist2: {
      id: 4,
      username: 'CyberArtist',
      avatarUrl: null,
      stats: {
        wins: 15,
        losses: 2,
        draws: 1
      }
    },
    post1: {
      id: 'post-3',
      artistId: 3,
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=1000&fit=crop',
      title: 'Cyber Metropolis',
      description: 'Une métropole cyberpunk de ma création',
      createdAt: new Date('2024-02-05'),
      votes: 98
    },
    post2: {
      id: 'post-4',
      artistId: 4,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop',
      title: 'Neon Genesis',
      description: 'L\'origine néon du futur',
      createdAt: new Date('2024-02-05'),
      votes: 112
    },
    votes: {
      artist1Votes: 98,
      artist2Votes: 112
    }
  }
];

// Fonction utilitaire pour récupérer une battle par ID
export const getBattleById = (id: string): Battle | undefined => {
  return mockBattles.find(battle => battle.id === id);
};

// Fonction utilitaire pour récupérer toutes les battles actives
export const getActiveBattles = (): Battle[] => {
  return mockBattles.filter(battle => battle.status === 'ongoing');
};

// Fonction utilitaire pour récupérer les battles terminées
export const getFinishedBattles = (): Battle[] => {
  return mockBattles.filter(battle => battle.status === 'finished');
};