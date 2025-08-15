// src/services/carrito.js
import { api } from './api';

export const enviarCarrito = async (payload) => {
  // payload: { items, total, nombreCliente?, emailCliente? }
  const { data } = await api.post('/carrito', payload);
  return data;
};
