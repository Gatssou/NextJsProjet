'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Validation regex (même que signup)
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Vérifie le token au chargement
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('Token manquant');
        setVerifying(false);
        return;
      }

      try {
        const response = await axios.post('/api/auth/verify-reset-token', { token });
        if (response.data.valid) {
          setTokenValid(true);
        } else {
          setError(response.data.error || 'Token invalide');
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Token invalide');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validations
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        newPassword
      });

      setMessage(response.data.message);
      
      // Redirection après 2 secondes
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // État de chargement
  if (verifying) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600">Vérification du lien...</p>
      </div>
    );
  }

  // Token invalide
  if (!tokenValid) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Lien invalide</h2>
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm mb-4">
          {error}
        </div>
        <div className="text-center">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Demander un nouveau lien
          </a>
        </div>
      </div>
    );
  }

  // Formulaire
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Nouveau mot de passe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-black mb-2">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Min. 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {message}
            <p className="text-xs mt-1">Redirection...</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
        </button>
      </form>
    </div>
  );
}