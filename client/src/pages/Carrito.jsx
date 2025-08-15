// src/pages/Carrito.jsx
import { Link, useNavigate } from 'react-router-dom';
import CarritoComp from '../components/Carrito';
import { useCart } from '../contexts/CartContext';

export default function CarritoPage() {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const deshabilitar = items.length === 0;

  return (
    <div className="container cart">
      <h1 className="section-title">Tu carrito</h1>

      <div className="cart-grid">
        {/* Lista de ítems */}
        <div className="panel">
          <div className="panel-body">
            <CarritoComp />
          </div>
        </div>

        {/* Resumen */}
        <aside className="panel cart-summary">
          <div className="panel-body">
            <div className="cart-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="cart-row subtle"><span>Envío</span><span>Gratis</span></div>
            <div className="cart-total"><span>Total</span><span>${total.toFixed(2)}</span></div>

            <button
              className="btn btn-green"
              disabled={deshabilitar}
              onClick={() => navigate('/pago')}
            >
              Confirmar pedido
            </button>

            <div style={{ marginTop: 10 }}>
              <Link className="btn btn-ghost" to="/">Seguir comprando</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
