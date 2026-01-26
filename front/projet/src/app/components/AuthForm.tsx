"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (!isSignup) return; // ⬅️ IMPORTANT : feedback seulement en signup

    if (!value) {
      setPasswordFeedback("");
      return;
    }

    setPasswordFeedback(
      passwordRegex.test(value)
        ? "Mot de passe correct ✔"
        : "Mot de passe trop faible : min 8 caractères, 1 majuscule, 1 chiffre"
    );
  };

  const signup = async () => {
    setFeedback("");
    setLoading(true);

    if (!username || !password) {
      setFeedback("Veuillez remplir tous les champs !");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setFeedback("Mot de passe trop faible !");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/signup", {
        username: username.trim(),
        password,
      });

      alert(res.data.message || "Utilisateur créé !");
      setIsSignup(false);
      setUsername("");
      setPassword("");
      setPasswordFeedback("");
    } catch (err: any) {
      setFeedback(err.response?.data?.error || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setFeedback("");
    setLoading(true);

    if (!username || !password) {
      setFeedback("Veuillez remplir tous les champs !");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/login", {
        username: username.trim(),
        password,
      });

      // ✅ Le cookie JWT est posé ici
      router.replace("/transitionPage");
    } catch (err: any) {
      setFeedback(err.response?.data?.error || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    loading || !username || !password || (isSignup && !passwordRegex.test(password));

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-80 max-w-full animate-fade">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-500">
        {isSignup ? "Signup" : "Login"}
      </h2>

      <input
        className="w-full p-2 mb-3 border border-gray-400 rounded text-black"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 mb-2 border border-gray-400 rounded text-black"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />

      {isSignup && passwordFeedback && (
        <div
          className={`text-sm mb-2 ${
            passwordFeedback.includes("correct")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {passwordFeedback}
        </div>
      )}

      {feedback && <div className="text-sm mb-2 text-red-600">{feedback}</div>}

      <button
        onClick={isSignup ? signup : login}
        disabled={isButtonDisabled}
        className={`w-full p-2 mt-2 rounded text-white ${
          isButtonDisabled
            ? "bg-gray-400"
            : isSignup
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Chargement..."
          : isSignup
          ? "Créer un compte"
          : "Se connecter"}
      </button>

      <div className="text-sm mt-4 text-center">
        {isSignup ? (
          <>
            Déjà un compte ?{" "}
            <button
              onClick={() => {
                setIsSignup(false);
                setFeedback("");
                setPasswordFeedback("");
                setUsername("");
                setPassword("");
              }}
              className="text-blue-600 hover:underline"
            >
              Connectez-vous
            </button>
          </>
        ) : (
          <>
            Pas de compte ?{" "}
            <button
              onClick={() => {
                setIsSignup(true);
                setFeedback("");
                setPasswordFeedback("");
                setUsername("");
                setPassword("");
              }}
              className="text-blue-600 hover:underline"
            >
              Inscrivez-vous
            </button>
          </>
        )}
      </div>
    </div>
  );
}
