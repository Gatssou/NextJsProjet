'use client';

import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { User } from '@/types/user';

interface AvatarUploaderProps {
  user: User;
  onAvatarUpdate: (newAvatarUrl: string | null) => void;
}

export default function AvatarUploader({ user, onAvatarUpdate }: AvatarUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include', // <-- important
      });

      // On vérifie si c'est bien du JSON
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error('Réponse serveur invalide : ' + text);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'upload');
      }

      setSuccess('Avatar mis à jour avec succès !');
      onAvatarUpdate(data.user.avatarUrl);

      // Masquer le message de succès après 3 secondes
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'upload';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre avatar ?')) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/user/avatar', {
        method: 'DELETE',
        credentials: 'include', // <-- important
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error('Réponse serveur invalide : ' + text);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression');
      }

      setSuccess('Avatar supprimé avec succès !');
      onAvatarUpdate(null);

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar */}
      <Avatar
        src={user.avatarUrl}
        alt={user.username}
        size="xl"
        editable
        onUpload={handleUpload}
        loading={loading}
      />

      {/* Instructions */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Cliquez sur l'avatar pour changer la photo</p>
        <p className="text-xs text-gray-500">JPG, PNG, WebP ou GIF. Max 5MB.</p>
      </div>

      {/* Bouton supprimer */}
      {user.avatarUrl && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          Supprimer l'avatar
        </button>
      )}

      {/* Messages */}
      {error && (
        <div className="w-full max-w-md p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="w-full max-w-md p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}
    </div>
  );
}
