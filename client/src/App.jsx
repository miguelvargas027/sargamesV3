// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito from './pages/Carrito';
import Pago from './pages/Pago';
import AdminProductos from './pages/AdminProductos';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <CartProvider>
      <div className="layout">
        <Navbar />
        <main className="container content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/pago" element={<Pago />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
