import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

let users: { username: string; password: string }[] = []; // fake DB en mémoire

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  let { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Champs requis" });

  username = username.trim();
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password))
    return res.status(400).json({ error: "Mot de passe trop faible" });

  if (users.find(u => u.username.toLowerCase() === username.toLowerCase()))
    return res.status(400).json({ error: "Nom d'utilisateur déjà utilisé" });

  const hashed = await bcrypt.hash(password, 12);
  users.push({ username, password: hashed });

  res.status(200).json({ message: "Utilisateur créé !" });
}
