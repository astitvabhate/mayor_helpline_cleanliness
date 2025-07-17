// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import reportRoutes from './routes/report-routes.js'; 
import adminRoutes from './routes/admin-routes.js';
import path from 'path';

dotenv.config(); // Load .env variables early

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const __dirname = path.resolve(); // Get the current directory

// Debugging
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/reports', reportRoutes);
// Add admin routes

app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, '/mayorhelpline-frontend/dist')));

app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.includes('.')) {
    return next();
  }

  res.sendFile(path.join(__dirname, 'urbanglow-frontend', 'dist', 'index.html'));
});


// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
