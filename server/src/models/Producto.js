// src/models/Producto.js
import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, default: '' },
    precio: { type: Number, required: true, min: 0 },
    imagen: { type: String, default: '' },
    stock: { type: Number, default: 0, min: 0 },
    categoria: { type: String, default: 'general' }
  },
  { timestamps: true }
);

export default mongoose.model('Producto', ProductoSchema);