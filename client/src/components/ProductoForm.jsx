// src/components/ProductoForm.jsx
import { useEffect, useState } from 'react';

const EMPTY = {
  nombre: '',
  descripcion: '',
  precio: '',
  imagen: '',
  stock: '',
  categoria: 'general',
};

export default function ProductoForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY);
  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || '',
        precio: initialData.precio ?? '',
        imagen: initialData.imagen || '',
        stock: initialData.stock ?? '',
        categoria: initialData.categoria || 'general',
      });
      setPreview(initialData.imagen || null);
      setImagenFile(null);
    } else {
      setForm(EMPTY);
      setPreview(null);
      setImagenFile(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImagenFile(file || null);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normaliza números
    const precio = form.precio === '' ? '' : Number(form.precio);
    const stock = form.stock === '' ? '' : Number(form.stock);

    if (imagenFile) {
      const fd = new FormData();
      fd.append('nombre', form.nombre);
      fd.append('descripcion', form.descripcion);
      fd.append('precio', precio);
      fd.append('stock', stock);
      fd.append('categoria', form.categoria);
      fd.append('imagen', imagenFile);
      await onSubmit(fd);
    } else {
      await onSubmit({
        ...form,
        precio,
        stock,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          className="input"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          className="textarea"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          className="input"
          type="number"
          step="0.01"
          min="0"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="imagenUrl">URL de imagen (opcional si subes archivo)</label>
        <input
          id="imagenUrl"
          className="input"
          type="text"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="https://…"
        />
      </div>

      <div className="field">
        <label>Archivo de imagen</label>
        <input className="file" type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="field">
        <label htmlFor="stock">Stock</label>
        <input
            id="stock"
            className="input"
            type="number"
            min="0"
            name="stock"
            value={form.stock}
            onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          className="select"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="aventura">Aventura</option>
          <option value="accion">Acción</option>
          <option value="rpg">RPG</option>
        </select>
      </div>

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: '100%', borderRadius: 10, border: '1px solid #262c3f' }}
        />
      )}

      <div className="actions-row">
        <button type="submit" className="btn btn-green" disabled={loading}>
          {loading ? 'Guardando…' : 'Guardar'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
