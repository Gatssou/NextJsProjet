'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ConnectedHeader from '../../components/ConnectedHeader/ConnectedHeader';
import AvatarUploader from '../../components/AvatarUploader/AvatarUploader';
import Footer from "../../components/Footer/Footer";
import { User } from '@/types/user';

axios.defaults.withCredentials = true;

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // ⚠️ Utiliser le même endpoint que Dashboard pour vérifier auth
        const res = await axios.get('/api/auth/verify');

        if (!res.data.authenticated || !res.data.user) {
          router.replace('/'); // pas connecté → home
          return;
        }

        setUser(res.data.user);
      } catch (err) {
        console.error('Erreur chargement profil:', err);
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

 const handleAvatarUpdate = (newAvatarUrl: string | null) => {
  if (!user) return;

  setUser({
    ...user,
    avatarUrl: newAvatarUrl ?? user.avatarUrl,
  });
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ConnectedHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-8 animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-32 bg-gray-200 rounded w-32 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
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
              onClick={() => router.push('/dashboard')}
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
    <div className="min-h-screen bg-gray-50">
      <ConnectedHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
            <p className="text-sm text-gray-600 mt-1">
              Gérez vos informations personnelles et votre avatar
            </p>
          </div>

          {/* Contenu */}
          <div className="p-6 space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Photo de profil</h2>
              <AvatarUploader user={user} onAvatarUpdate={handleAvatarUpdate} />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Informations du compte</h2>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{user.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{user.email || 'Non renseigné'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Membre depuis</label>
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Retour au dashboard
              </button>
            </div>
          </div> 
        </div>
      </div>
        <Footer />
    </div>
  );
}
