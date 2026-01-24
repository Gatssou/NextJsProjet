"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      router.push("/"); // redirige vers login
    } catch (err) {
      console.error(err);
      alert("Erreur logout");
    }
  };

  return (
    <main style={{ padding: 30 }}>
      <h1>Dashboard</h1>

      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </main>
  );
}
