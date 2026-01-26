"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// On garde withCredentials si JWT est stocké en cookie httpOnly
axios.defaults.withCredentials = true;

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const signup = async () => {

    
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
      // ✅ Appel relatif vers l'API Next.js, fonctionne en local et production Vercel
      const res = await axios.post("/api/signup", { username, password });

      if (res.data.user) {
        alert("Utilisateur créé ! Vous pouvez maintenant vous connecter.");
        router.push("/"); // redirection login
      }
    } catch (err: any) {
      // Logging complet pour savoir exactement ce qui échoue
      console.error("SIGNUP ERROR FRONTEND:", err);
      console.log("ERR RESPONSE DATA:", err.response?.data);

      setFeedback(
        err.response?.data?.error || "Erreur lors de l'inscription"
      );
    }
  };

  return (
    <main style={{ padding: 30 }}>
      <h1>Signup</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (!e.target.value) {
            setFeedback("");
          } else if (!passwordRegex.test(e.target.value)) {
            setFeedback(
              "Mot de passe trop faible : min 8 caractères, 1 majuscule, 1 chiffre"
            );
          } else {
            setFeedback("Mot de passe correct ✔");
          }
        }}
      />
      <br />
      <br />

      {feedback && (
        <div
          style={{
            color: feedback.includes("correct") ? "green" : "red",
            marginBottom: 10,
          }}
        >
          {feedback}
        </div>
      )}

      <button onClick={signup}>Créer un compte</button>

      <p style={{ marginTop: 15 }}>
        Déjà un compte ? <a href="/">Connectez-vous</a>
      </p>
    </main>
  );
}
