// src/routes/producto.routes.js
import { Router } from 'express';
import {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/producto.controller.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { upload } from '../middlewares/upload.js';


const router = Router();

router.get('/', getProductos);                     // GET /api/productos
router.get('/:id', validateObjectId, getProducto); // GET /api/productos/:id
router.post('/', upload.single('imagen'), crearProducto);                 // POST /api/productos
router.put('/:id', validateObjectId, upload.single('imagen'), actualizarProducto); // PUT /api/productos/:id
router.delete('/:id', validateObjectId, eliminarProducto);// DELETE /api/productos/:id

export default router;
