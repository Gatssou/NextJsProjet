// back/api/server.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 5000;
const SECRET = "SUPER_SECRET"; // en prod : .env
const users = []; // fake DB pour test local

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ===============================
// 🔒 Protection brute-force
// ===============================
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  message: "Trop de tentatives, réessayez plus tard"
});
app.use("/login", limiter);
app.use("/signup", limiter);

// ===============================
// 🔑 SIGNUP
// ===============================
app.post("/signup", async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Champs requis" });

  username = username.trim();

  // Force mot de passe
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Mot de passe trop faible : min 8 caractères, 1 majuscule, 1 chiffre"
    });
  }

  // Vérifier si pseudo déjà existant (insensible à la casse)
  const userExists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (userExists) {
    return res.status(400).json({ error: "Nom d'utilisateur déjà utilisé. Veuillez en choisir un autre." });
  }

  const hashed = await bcrypt.hash(password, 12);
  users.push({ username, password: hashed });

  res.json({ message: "Utilisateur créé !" });
});

// ===============================
// 🔑 LOGIN
// ===============================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (!user) return res.status(401).json({ error: "Identifiants invalides" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Identifiants invalides" });

  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true si HTTPS
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  });

  res.json({ message: "Connecté !" });
});

// ===============================
// Middleware back pour routes protégées
// ===============================
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};

// Vérification token
app.get("/auth/verify", auth, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

// Route protégée /me
app.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post("/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnecté" });
});

// Test server
app.get("/", (req, res) => {
  res.send("API sécurisée en ligne !");
});

app.listen(PORT, () => console.log(`API sécurisée running http://localhost:${PORT}`));
