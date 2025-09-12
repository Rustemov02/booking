import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Database/models/User";

const router = express.Router();

// JWT üçün gizli açar
const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

let refreshTokens: string[] = []; //əslində DB-də saxlanmalıdır

// Qeydiyyat
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, roleName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      roleName: roleName || "user",  
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Giriş
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Access token
    const accessToken = jwt.sign(
      { userId: user._id, roleName: user.roleName },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Refresh token
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    refreshTokens.push(refreshToken);

    // Access token expiry date
    const decoded: any = jwt.decode(accessToken);
    const expires = new Date(decoded.exp * 1000).toISOString();

    res.status(200).json({
      accessToken,
      expires,
      firstName: user.firstName,
      lastName: user.lastName,
      refreshToken,
      roleName: user.roleName,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// refresh token ilə yeni accessToken almaq
router.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ message: "Refresh token required" });

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ accessToken });
  });
});

// Refresh token logout üçün endpoint (istəyə bağlı)

router.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
