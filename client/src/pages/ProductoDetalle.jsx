// src/pages/ProductoDetalle.jsx
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../contexts/CartContext';


export default function ProductoDetalle() {
  const { id } = useParams();
  const { data: producto, loading, error } = useProduct(id);
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="product container">
        <div className="product__grid">
          <div className="skeleton skeleton--image" />
          <div className="skeleton skeleton--panel" />
        </div>
      </div>
    );
  }
  if (error || !producto) {
    return (
      <div className="container section">
        <p>No se encontró el producto.</p>
        <Link className="link" to="/">← Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="product container">
      {/* migas + volver */}
      <nav className="product__breadcrumbs" aria-label="breadcrumb">
        <Link to="/" className="link">Inicio</Link>
        <span aria-hidden="true"> / </span>
        <span>{producto.nombre}</span>
      </nav>

      <div className="product__grid">
        {/* Imagen / galería simple */}
        <figure className="product__gallery">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="product__image"
            loading="eager"
          />
        </figure>

        {/* Panel de información */}
        <section className="product__panel" aria-labelledby="product-title">
          <h1 id="product-title" className="product__title">{producto.nombre}</h1>

          <p className="product__description">{producto.descripcion}</p>

          <div className="product__priceRow">
            <div className="product__price">
              ${producto.precio.toFixed(2)}
            </div>
            {/* Si manejas stock, puedes mostrar un badge aquí */}
            {/* <span className="product__badge">En stock</span> */}
          </div>

          <div className="product__actions">
            <button
              className="btn btn--primary"
              onClick={() => addToCart(producto, 1)}
              aria-label={`Agregar ${producto.nombre} al carrito`}
            >
              Agregar al carrito
            </button>
            <Link className="btn btn--ghost" to="/carrito">
              Ir al carrito
            </Link>
          </div>

          <ul className="product__meta">
            <li>Envío gratis a partir de $50</li>
            <li>Soporte por WhatsApp</li>
            <li>Devoluciones en 7 días</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
