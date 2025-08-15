// src/components/ProductoCard.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { PiTagLight, PiPackageLight } from 'react-icons/pi';

export default function ProductoCard({ producto }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img className="card-img" src={producto.imagen} alt={producto.nombre} />
      <div className="card-body">
        <div className="card-title">{producto.nombre}</div>

        <div className="card-meta">
          <span title="Precio"><PiTagLight /> ${producto.precio?.toFixed(2)}</span>
          <span title="Stock"><PiPackageLight /> {producto.stock ?? 0}</span>
        </div>

        <div className="card-actions">
          <button className="btn" onClick={() => addToCart(producto, 1)}>Comprar</button>
          <Link className="btn btn-secondary" to={`/producto/${producto._id}`}>Ver detalles</Link>
        </div>
      </div>
    </div>
  );
}
