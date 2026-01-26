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
  const router = useRouter();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handlePasswordChange = (value: string) => {
    setPassword(value);
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
    if (!username || !password) {
      setFeedback("Veuillez remplir tous les champs !");
      return;
    }
    if (!passwordRegex.test(password)) {
      setFeedback("Mot de passe trop faible !");
      return;
    }

    try {
      const res = await axios.post("/api/signup", { username, password });
      alert(res.data.message || "Utilisateur créé !");
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
      const res = await axios.post("/api/login", { username, password });
      if (res.data.success) {
        router.push("/transitionPage"); // page de transition avant connectedPage
      }
    } catch (err: any) {
      setFeedback(err.response?.data?.error || "Erreur login");
    }
  };

  const isButtonDisabled =
    !username || !password || (isSignup && !passwordRegex.test(password));

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-80 max-w-full animate-fade">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-500">
        {isSignup ? "Signup" : "Login"}
      </h2>

      <input
        className="w-full p-2 mb-3 border border-gray-400 rounded text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 mb-2 border border-gray-400 rounded text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {feedback && <div className="text-sm mb-2 text-red-600">{feedback}</div>}

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

      <div className="text-sm mt-4 text-center text-red-600">
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
