"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const signup = async () => {
    await axios.post(`${API_URL}/signup`, {
      username,
      password,
    });
    alert("Utilisateur créé");
  };

  const login = async () => {
    const res = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    setToken(res.data.token);
    alert("Connecté");
  };

  const protectedRoute = async () => {
    const res = await axios.get(`${API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert(JSON.stringify(res.data));
  };

  return (
    <main style={{ padding: 30 }}>
      <h1>Test Auth Next.js + API</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={signup}>Signup</button>{" "}
      <button onClick={login}>Login</button>{" "}
      <button onClick={protectedRoute} disabled={!token}>
        Protected
      </button>
    </main>
  );
}
