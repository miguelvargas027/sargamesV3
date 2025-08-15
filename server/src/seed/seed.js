import 'dotenv/config';
import mongoose from 'mongoose';
import Producto from '../models/Producto.js';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'tienda' });
  await Producto.deleteMany({});
  await Producto.insertMany([
    {
      nombre: 'Camiseta React',
      descripcion: 'Camiseta 100% algodón',
      precio: 19.99,
      imagen: 'https://via.placeholder.com/300x200?text=Camiseta+React',
      stock: 50,
      categoria: 'ropa'
    },
    {
      nombre: 'Taza JS',
      descripcion: 'Para café o té',
      precio: 9.99,
      imagen: 'https://via.placeholder.com/300x200?text=Taza+JS',
      stock: 100,
      categoria: 'hogar'
    }
  ]);
  console.log('✅ Seed completado');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
