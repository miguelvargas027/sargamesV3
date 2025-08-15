// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa'; // 👈 nuevo

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <Link to="/">
            <div className="logo-box" aria-hidden="true">
              <FaGamepad className="logo-icon" size={16} />
            </div>
            <span>SARGAMES</span>
          </Link>
        </div>

        <div className="search" role="search">
          <FiSearch />
          <input type="text" placeholder="Buscar productos" />
        </div>

        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/admin/productos">Alta</Link>
          <Link
            to="/carrito"
            className="cart-link"
            aria-label={`Carrito, ${count} artículo${count === 1 ? '' : 's'}`}
            title="Carrito"
          >
            <FiShoppingCart size={20} />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
