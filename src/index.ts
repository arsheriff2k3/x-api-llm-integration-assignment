import 'dotenv/config';
import express from 'express';
import { tweetRoutes } from './routes/tweet.routes';
// import axios from 'axios';
import passport from "passport";
import session from "express-session";
import { Strategy as TwitterStrategy } from "passport-twitter";
// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Set up session middleware
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware for parsing JSON requests
app.use(express.json());

// Twitter OAuth Strategy
passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY || "",
        consumerSecret: process.env.TWITTER_API_SECRET || "",
        callbackURL: process.env.CALLBACK_URL || "",
      },
      (token, tokenSecret, profile, done) => {
        return done(null, profile);
      }
    )
  );
  
// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj!);
});

// Authentication routes
app.get("/auth/twitter", passport.authenticate("twitter"));
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.send("Authenticated successfully! 🎉");
  }
);

// API routes
app.use('/api', tweetRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;