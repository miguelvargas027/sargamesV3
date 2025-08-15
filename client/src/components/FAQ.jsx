// src/components/FAQ.jsx
import { useState } from 'react';

const data = [
  { q: '¿Cómo comprar?', a: 'Añade productos al carrito y finaliza tu compra en la sección Pago.' },
  { q: '¿Cuánto tarda en llegar mi pedido?', a: 'Usualmente entre 24 y 72 horas hábiles.' },
  { q: '¿Cómo puedo pagar?', a: 'Aceptamos tarjetas, transferencias y billeteras digitales.' },
];

export default function FAQ(){
  const [open, setOpen] = useState(null);
  return (
    <div className="faq">
      {data.map((item, i) => (
        <details key={i} open={open === i} onClick={() => setOpen(open === i ? null : i)}
                 style={{ background: 'var(--panel)', border: '1px solid #262c3f', borderRadius: '12px', padding: '10px 14px', marginBottom: '10px' }}>
          <summary style={{ cursor:'pointer', fontWeight: 600 }}>{item.q}</summary>
          <div className="subtle" style={{ marginTop: 8 }}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}
