// src/services/productos.js
import { api } from './api';

export const fetchProductos = async () => {
  const { data } = await api.get('/productos');
  return data;
};

export const fetchProductoById = async (id) => {
  const { data } = await api.get(`/productos/${id}`);
  return data;
};

// NUEVO
export const createProducto = async (payload) => {
  const isFD = (typeof FormData !== 'undefined') && (payload instanceof FormData);
  const { data } = await api.post('/productos', payload, {
    headers: isFD ? { 'Content-Type': 'multipart/form-data' } : undefined
  });
  return data;
};

export const updateProducto = async (id, payload) => {
  const isFD = (typeof FormData !== 'undefined') && (payload instanceof FormData);
  const { data } = await api.put(`/productos/${id}`, payload, {
    headers: isFD ? { 'Content-Type': 'multipart/form-data' } : undefined
  });
  return data;
};

export const deleteProducto = async (id) => {
  const { data } = await api.delete(`/productos/${id}`);
  return data;
};
