// src/pages/AdminProductos.jsx
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import ProductoForm from '../components/ProductoForm';
import {
  fetchProductos,
  createProducto,
  updateProducto,
  deleteProducto
} from '../services/productos';

const toAbsolute = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  // para /uploads/... en dev/prod
  const base = import.meta.env.VITE_API_URL || '';
  return `${base}${src}`;
};

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // producto o null
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchProductos();
      setProductos(data);
    } catch (e) {
      console.error(e);
      setError('Error cargando productos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(payload) {
    try {
      setSaving(true);
      if (editing?._id) {
        await updateProducto(editing._id, payload);
      } else {
        await createProducto(payload);
      }
      setEditing(null);
      await load();
    } catch (e) {
      console.error(e);
      alert('Hubo un problema guardando el producto.');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      await load();
    } catch (e) {
      console.error(e);
      alert('No se pudo eliminar.');
    }
  }

  return (
    <div className="container admin-wrap">
      <h1 className="section-title">Administrar productos</h1>

      <div className="admin-grid">
        {/* Panel listado */}
        <div className="panel">
          <div className="panel-header">Listado</div>
          <div className="panel-body">
            {loading ? (
              <div className="subtle">Cargando…</div>
            ) : error ? (
              <div className="subtle">{error}</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th style={{ textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <img className="thumb" src={toAbsolute(p.imagen)} alt={p.nombre} />
                      </td>
                      <td>{p.nombre}</td>
                      <td>${Number(p.precio || 0).toFixed(2)}</td>
                      <td>{p.stock ?? 0}</td>
                      <td>
                        <div className="actions-row">
                          <button
                            className="btn btn-green"
                            onClick={() => setEditing(p)}
                            title="Editar"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => onDelete(p._id)}
                            title="Eliminar"
                          >
                            <FiTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {productos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="subtle">No hay productos aún.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Panel formulario */}
        <div className="panel">
          <div className="panel-header">{editing ? 'Editar producto' : 'Nuevo producto'}</div>
          <div className="panel-body">
            <ProductoForm
              initialData={editing}
              onSubmit={handleSave}
              onCancel={() => setEditing(null)}
              loading={saving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
