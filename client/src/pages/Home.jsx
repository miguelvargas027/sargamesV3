// src/pages/Home.jsx
import { useProducts } from '../hooks/useProducts';
import ProductoCard from '../components/ProductoCard';
import FAQ from '../components/FAQ';
import logoWebp from '../assets/logo.webp';

export default function Home() {
  const { data: productos, loading, error } = useProducts();

  if (loading) return <div className="container section">Cargando...</div>;
  if (error) return <div className="container section">Ocurrió un error cargando productos.</div>;

  // Arreglos para secciones 
  const tendencia = productos.slice(0, 8);
 

  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="container hero-wrap">
          <div>
            <h1 className="hero-title">¡Bienvenido a nuestra tienda en línea!</h1>
            <p className="hero-sub">Encuentra tus juegos favoritos a los mejores precios</p>
            <div className="hero-cta">
              <a className="btn" href="#tendencia">Ver ofertas</a>
              <a className="btn btn-secondary" href="#contacto">Contacto</a>
            </div>
          </div>
          <div>
            {/* Si tienes una imagen/ilustración en assets, colócala aquí */}
            <picture className="hero-illustration">
  {/* Si tienes fallback PNG, descomenta la línea y déjala debajo del source */}
  {/* <source srcSet={heroWebp} type="image/webp" /> */}
        <img
           src={logoWebp}
            alt="Consola y gamepad destacados"
            loading="eager"
            decoding="async"
            sizes="(max-width: 100%) 100vw, 40vw"/>
            </picture>
          </div>
        </div>
      </header>

      {/* Productos en tendencia */}
      <section id="tendencia" className="section">
        <div className="container">
          <h2 className="section-title">Productos en tendencia</h2>
          <div className="grid">
            {tendencia.map(p => <ProductoCard key={p._id} producto={p} />)}
          </div>
        </div>
      </section>

      {/* Franja confianza */}
      <section className="section">
        <div className="container">
          <div className="trust">
            Compra con confianza — Catálogo actualizado y soporte cuando lo necesites.
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign:'center' }}>Preguntas frecuentes</h2>
          <FAQ />
        </div>
      </section>
    </>
  );
}
