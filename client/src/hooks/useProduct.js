// src/hooks/useProduct.js
import { useEffect, useState } from 'react';
import { fetchProductoById } from '../services/productos';

export function useProduct(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const producto = await fetchProductoById(id);
        setData(producto);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { data, loading, error };
}
