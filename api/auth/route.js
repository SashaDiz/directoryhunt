/* eslint-env node */
/* global process */
// here's the file for route js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

// Load env variables
dotenv.config({ path: ".env.local" });

// MongoDB connection (assume you have a file exporting your client)
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URI);

const router = express.Router();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// Passport Google OAuth setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        await client.connect();
        const db = client.db();
        const users = db.collection("users");
        let user = await users.findOne({ googleId: profile.id });
        if (!user) {
          user = {
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          };
          await users.insertOne(user);
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize/deserialize (not used for JWT, but required by passport)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Registration endpoint
router.post("/register", express.json(), async (req, res) => {
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("users");
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ error: "User exists" });
    const hash = await bcrypt.hash(password, 10);
    await users.insertOne({ email, password: hash });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
router.post("/login", express.json(), async (req, res) => {
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("users");
    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Google OAuth endpoints
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // Issue JWT
    const token = jwt.sign({ email: req.user.email }, JWT_SECRET, { expiresIn: "1h" });
    // Redirect or respond with token
    res.redirect(`/auth-success?token=${token}`); // Or send JSON if using API only
  }
);

export default router;