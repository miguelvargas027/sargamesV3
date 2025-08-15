import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import productoRoutes from './routes/producto.routes.js';
import carritoRoutes from './routes/carrito.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import 'express-async-errors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Archivos estáticos para imágenes subidas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Sirve /uploads desde server/uploads
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));


// Middlewares
app.use(
  cors({
    origin: (process.env.FRONTEND_ORIGIN || '').split(',').filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);

// 404 y errores
app.use(notFound);
app.use(errorHandler);

// Arranque
const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 API escuchando en puerto ${PORT}`));
});

app.set('trust proxy', 1);

