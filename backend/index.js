import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const port = 5100;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/user/posts', postRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connect'))
  .catch((err) => console.error('MongoDB connection Error', err));

app.listen(port, () => `Server is running on port ${port}`);
