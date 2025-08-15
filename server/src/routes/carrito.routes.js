// src/routes/carrito.routes.js
import { Router } from 'express';
import { recibirCarrito } from '../controllers/carrito.controller.js';

const router = Router();

router.post('/', recibirCarrito); // POST /api/carrito

export default router;
