import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const SECRET = "SUPER_SECRET";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token || req.headers.cookie?.split("=")[1];
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const user = jwt.verify(token, SECRET);
    res.status(200).json({ authenticated: true, user });
  } catch {
    res.status(403).json({ authenticated: false });
  }
}
