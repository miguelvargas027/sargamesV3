// client/src/components/Footer.jsx
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <a href="/" className="footer__logo">Sargames Store</a>
          <p className="footer__tagline">
            Juegos al mejor precio, soporte rápido y envíos a todo el país.
          </p>
          <ul className="footer__contact">
            <li><a href="mailto:info@sargames.com">info@sargames.com</a></li>
            <li><a href="tel:1234567890">+584242006407</a></li>
            <li>Horarios: Lun–Sáb 9–18h</li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__barContent">
          <small>© {new Date().getFullYear()} Sargames. Todos los derechos reservados.</small>
          <div className="footer__social" aria-label="Redes sociales">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://tiktok.com" aria-label="TikTok"><FaTiktok /></a>
            <a href="https://wa.me/1234567890" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
