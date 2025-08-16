import { useEffect, useState } from 'react';

export default function AdminProductos() {
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ id_categoria: 1, nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' });
    const [editId, setEditId] = useState(null);
    const [busca, setBusca] = useState('');

    // cargar lista de productos (GET)
    const cargar = async () => {
        setLoading(true);
        try {
            const res = await fetch("/server/api/producto.php");
            if (!res.ok) throw new Error("Error en GET productos");
            const data = await res.json();
            setLista(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargar(); }, []);

    // Crear o actualizar producto (POST / PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let url = "/server/api/producto.php";
            let method = "POST";

            if (editId) {
                url = `/server/api/producto.php?id=${editId}`;
                method = "PUT";
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Error en " + method);
            await res.json();

            // resetear formulario
            setForm({ id_categoria: 1, nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' });
            setEditId(null);

            await cargar();
        } catch (e) {
            console.error(e);
        }
    };

    // iniciar edición
    const startEdit = (p) => {
        setEditId(p.id_producto);
        setForm({
            id_categoria: p.id_categoria,
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: Number(p.precio),
            stock: Number(p.stock),
            imagen: p.imagen
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // eliminar producto (DELETE)
    const eliminar = async (id) => {
        if (!confirm("¿Eliminar producto?")) return;
        try {
            const res = await fetch(`/server/api/producto.php?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error en DELETE");
            await res.json();
            await cargar();
        } catch (e) {
            console.error(e);
        }
    };

    // filtro en tabla
    const filtered = lista.filter(p =>
        (p.nombre || '').toLowerCase().includes(busca.toLowerCase()) ||
        String(p.id_producto).includes(busca)
    );

    return (
        <div className="container py-4">
            <h2 className="mb-3">Administración de Productos</h2>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <div className="row g-3">
                    <div className="col-md-2">
                        <label className="form-label">Categoría (id)</label>
                        <input type="number" className="form-control" value={form.id_categoria}
                            onChange={e => setForm(f => ({ ...f, id_categoria: Number(e.target.value) }))} />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" value={form.nombre}
                            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Imagen (URL)</label>
                        <input className="form-control" value={form.imagen}
                            onChange={e => setForm(f => ({ ...f, imagen: e.target.value }))} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Descripción</label>
                        <textarea className="form-control" rows="2" value={form.descripcion}
                            onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Precio</label>
                        <input type="number" step="0.01" className="form-control" value={form.precio}
                            onChange={e => setForm(f => ({ ...f, precio: Number(e.target.value) }))} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Stock</label>
                        <input type="number" className="form-control" value={form.stock}
                            onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} />
                    </div>
                    <div className="col-md-6 d-flex align-items-end gap-2">
                        <button className="btn btn-primary" type="submit">
                            {editId ? "Actualizar" : "Crear"} producto
                        </button>
                        {editId && (
                            <button className="btn btn-secondary" type="button" onClick={() => {
                                setEditId(null);
                                setForm({ id_categoria: 1, nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' });
                            }}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* Tabla */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Listado</h5>
                <input className="form-control" style={{ maxWidth: 280 }} placeholder="Buscar por nombre o ID"
                    value={busca} onChange={e => setBusca(e.target.value)} />
            </div>

            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th>ID</th><th>Categoría</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Imagen</th><th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id_producto}>
                                    <td>{p.id_producto}</td>
                                    <td>{p.id_categoria}</td>
                                    <td>{p.nombre}</td>
                                    <td>${Number(p.precio).toFixed(2)}</td>
                                    <td>{p.stock}</td>
                                    <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.imagen}>{p.imagen}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(p)}>Editar</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p.id_producto)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={7} className="text-center text-muted">Sin resultados</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}