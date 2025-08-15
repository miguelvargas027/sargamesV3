// src/controllers/carrito.controller.js
import Carrito from '../models/Carrito.js';

export const recibirCarrito = async (req, res) => {
  // Espera: { items: [{ producto, cantidad, precioUnitario }], total, nombreCliente?, emailCliente? }
  const payload = req.body;
  console.log('🛒 Carrito recibido desde frontend:', JSON.stringify(payload, null, 2));

  // Guardar es opcional; aquí lo hacemos:
  const guardado = await Carrito.create(payload);

  res.status(201).json({
    message: 'Carrito recibido y almacenado',
    id: guardado._id
  });
};
