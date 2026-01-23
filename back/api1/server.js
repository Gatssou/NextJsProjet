// api/api1/server.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors()); // Permet au front de communiquer
app.use(express.json());

const PORT = 5000;

const users = []; // Fake DB en mémoire

// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: "Utilisateur déjà existant" });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: "Utilisateur créé !" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Mot de passe incorrect" });

  const token = jwt.sign({ username }, "secretkey", { expiresIn: "1h" });
  res.json({ token });
});

// Protected route
app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Non autorisé" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretkey");
    res.json({ message: "Accès autorisé", user: decoded });
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
});

app.listen(PORT, () => console.log(`API1 démarrée sur http://localhost:${PORT}`));
