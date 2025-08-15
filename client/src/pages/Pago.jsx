// src/pages/Pago.jsx
import { useMemo, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { enviarCarrito } from '../services/carrito';
import { Link, useNavigate } from 'react-router-dom';

const toAbsolute = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  const base = import.meta.env.VITE_API_URL || '';
  return `${base}${src}`;
};

export default function Pago() {
  const { items, total, clearCart } = useCart();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const deshabilitar = loading || items.length === 0;

  const isEmailValid = useMemo(() => {
    if (!email) return true; // opcional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const onPagar = async () => {
    if (!isEmailValid) return;

    try {
      setLoading(true);
      setMsg('');
      await enviarCarrito({
        items: items.map(i => ({
          producto: i.producto._id,
          cantidad: i.cantidad,
          precioUnitario: i.precioUnitario,
        })),
        total,
        nombreCliente: nombre || undefined,
        emailCliente: email || undefined,
      });

      clearCart();
      setMsg('✅ Pedido enviado correctamente');
      // si prefieres, redirige al home después de unos segundos:
      setTimeout(() => navigate('/'), 1200);
    } catch (e) {
      console.error(e);
      setMsg('❌ Ocurrió un error al enviar el pedido.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container checkout">
        <h1 className="section-title">Pago</h1>
        <div className="panel">
          <div className="panel-body">
            <p className="subtle">Tu carrito está vacío.</p>
            <Link to="/" className="btn btn-ghost" style={{ marginTop: 10 }}>
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout">
      <h1 className="section-title">Pago</h1>

      <div className="checkout-grid">
        {/* Resumen del pedido */}
        <aside className="panel">
          <div className="panel-header">Resumen</div>
          <div className="panel-body">
            <div className="checkout-list">
              {items.map(({ producto, cantidad, precioUnitario }) => (
                <div key={producto._id} className="checkout-item">
                  <img className="thumb" src={toAbsolute(producto.imagen)} alt={producto.nombre} />
                  <div className="info">
                    <div className="title">{producto.nombre}</div>
                    <div className="muted">
                      x{cantidad} · ${precioUnitario.toFixed(2)}
                    </div>
                  </div>
                  <div className="price">
                    ${(precioUnitario * cantidad).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-row" style={{ marginTop: 10 }}>
              <span>Envío</span><span>Gratis</span>
            </div>
            <div className="cart-total">
              <span>Total a pagar</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>

        {/* Datos del comprador */}
        <div className="panel">
          <div className="panel-header">Datos</div>
          <div className="panel-body">
            <form className="form-grid" onSubmit={(e) => { e.preventDefault(); onPagar(); }}>
              <div className="field">
                <label htmlFor="nombre">Nombre (opcional)</label>
                <input
                  id="nombre"
                  className="input"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email (opcional)</label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && <small className="subtle" style={{ color:'#ff8da6' }}>Ingresa un correo válido.</small>}
              </div>

              <div className="actions-row">
                <button
                  type="submit"
                  className="btn btn-green"
                  disabled={deshabilitar || !isEmailValid}
                >
                  {loading ? 'Enviando…' : 'Enviar pedido'}
                </button>
                <Link to="/" className="btn btn-ghost">Seguir comprando</Link>
              </div>

              {msg && <div className="subtle" style={{ marginTop: 8 }}>{msg}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
