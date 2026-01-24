"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

axios.defaults.withCredentials = true;

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!value) {
      setPasswordFeedback("");
      return;
    }
    if (!passwordRegex.test(value)) {
      setPasswordFeedback(
        "Mot de passe trop faible : min 8 caractères, 1 majuscule, 1 chiffre"
      );
    } else {
      setPasswordFeedback("Mot de passe correct ✔");
    }
  };

  const signup = async () => {
    setFeedback("");
    if (!username || !password) {
      setFeedback("Veuillez remplir tous les champs !");
      return;
    }
    if (!passwordRegex.test(password)) {
      setFeedback(
        "Mot de passe trop faible : min 8 caractères, 1 majuscule, 1 chiffre"
      );
      return;
    }

    try {
      await axios.post(`${API_URL}/signup`, { username, password });
      alert("Utilisateur créé ! Vous pouvez maintenant vous connecter.");
      setIsSignup(false);
      setUsername("");
      setPassword("");
      setPasswordFeedback("");
    } catch (err: any) {
      setFeedback(err.response?.data?.error || "Erreur lors de l'inscription");
    }
  };

  const login = async () => {
    setFeedback("");
    if (!username || !password) {
      setFeedback("Veuillez remplir tous les champs !");
      return;
    }

    try {
      await axios.post(`${API_URL}/login`, { username, password });
      router.push("/dashboard");
    } catch (err: any) {
      setFeedback(err.response?.data?.error || "Erreur login");
    }
  };

  const isButtonDisabled =
    !username || !password || (isSignup && !passwordRegex.test(password));

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-80 max-w-full animate-fade">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isSignup ? "Signup" : "Login"}
      </h2>

      <input
        className="w-full p-2 mb-3 border rounded"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 mb-2 border rounded"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />

      {isSignup && passwordFeedback && (
        <div
          className={`text-sm mb-2 ${
            passwordFeedback.includes("correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {passwordFeedback}
        </div>
      )}

      {feedback && (
        <div className="text-sm mb-2 text-red-600">{feedback}</div>
      )}

      <button
        onClick={isSignup ? signup : login}
        disabled={isButtonDisabled}
        className={`w-full p-2 mt-2 rounded text-white ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : isSignup
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSignup ? "Créer un compte" : "Se connecter"}
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
