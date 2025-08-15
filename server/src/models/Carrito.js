// src/models/Carrito.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const CarritoSchema = new mongoose.Schema(
  {
    items: { type: [ItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    // Campos opcionales de cliente / envío
    nombreCliente: { type: String },
    emailCliente: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Carrito', CarritoSchema);
