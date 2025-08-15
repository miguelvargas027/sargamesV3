// src/controllers/producto.controller.js
import Producto from '../models/Producto.js';

export const getProductos = async (req, res) => {
  const productos = await Producto.find().sort({ createdAt: -1 });
  res.json(productos);
};

export const getProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(producto);
};

const getBaseURL = (req) =>
  process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

export const crearProducto = async (req, res) => {
  const body = req.body || {};
  if (req.file) {
    body.imagen = `${getBaseURL(req)}/uploads/${req.file.filename}`; // 👈 absoluta
  }
  const producto = await Producto.create({
    nombre: body.nombre,
    descripcion: body.descripcion || '',
    precio: body.precio,
    imagen: body.imagen || '',
    stock: body.stock || 0,
    categoria: body.categoria || 'general'
  });
  res.status(201).json(producto);
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  if (req.file) {
  const path = `uploads/${req.file.filename}`;                
  body.imagen = `${getBaseURL(req)}/${path}`;                 // <- la añadimos aquí
}
  const actualizado = await Producto.findByIdAndUpdate(id, body, { new: true });
  if (!actualizado) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(actualizado);
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  const eliminado = await Producto.findByIdAndDelete(id);
  if (!eliminado) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
};
