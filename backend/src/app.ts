// src/app.ts
import express from 'express';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes';

const app = express();

// ⚠️ Configuration stricte CORS pour éviter erreur 403
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // frontend + admin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api/videos', videoRoutes);

export default app;
