// src/hooks/useProducts.js
import { useEffect, useState } from 'react';
import { fetchProductos } from '../services/productos';

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productos = await fetchProductos();
        setData(productos);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
}
