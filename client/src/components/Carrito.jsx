// src/components/Carrito.jsx
import { useCart } from '../contexts/CartContext';
import { FiTrash } from 'react-icons/fi';

const toAbsolute = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  const base = import.meta.env.VITE_API_URL || '';
  return `${base}${src}`;
};

export default function CarritoComp() {
  const { items, removeFromCart } = useCart();

  if (items.length === 0) return <p className="cart-empty">Tu carrito está vacío.</p>;

  return (
    <div className="cart-list">
      {items.map(({ producto, cantidad, precioUnitario }) => (
        <div key={producto._id} className="cart-item">
          <img className="thumb" src={toAbsolute(producto.imagen)} alt={producto.nombre} />
          <div className="cart-info">
            <div className="title">{producto.nombre}</div>
            <div className="muted">
              Cantidad: {cantidad} · Precio unitario: ${precioUnitario.toFixed(2)}
            </div>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => removeFromCart(producto._id)}
            title="Quitar"
            aria-label={`Quitar ${producto.nombre} del carrito`}
          >
            <FiTrash />
          </button>
        </div>
      ))}
    </div>
  );
}
