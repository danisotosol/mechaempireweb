import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Producto.css';

export default function Producto() {
    const { id } = useParams();   // ID viene de la URL
    const [prod, setProd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/server/api/producto.php?id=${id}`);
                if (!res.ok) throw new Error("Error al obtener el producto");
                const data = await res.json();
                setProd(data);
            } catch (e) {
                console.error(e);
                setError("No se pudo cargar el producto");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const addToCart = () => {
        if (!prod) return;
        const item = {
            id: prod.id_producto,
            nombre: prod.nombre,
            precio: Number(prod.precio),
            cantidad: Number(cantidad),
            imagen: prod.imagen
        };

        const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

        // si ya existe el producto, sumar cantidad
        const i = carrito.findIndex(x => x.id === item.id);
        if (i >= 0) carrito[i].cantidad += item.cantidad;
        else carrito.push(item);

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Producto agregado al carrito");
    };

    if (loading) return <div className="container py-4">Cargando...</div>;
    if (error || !prod) return <div className="container py-4 text-danger">{error || "Producto no encontrado"}</div>;

    const disponible = Number(prod.stock) > 0;

    return (
        <div className="container py-4 producto-detalle">
            <Link to="/" className="btn btn-link mb-3">← Volver</Link>
            <div className="card p-3">
                <div className="row g-3">
                    <div className="col-12 col-md-5">
                        <img className="img-fluid rounded" src={prod.imagen} alt={prod.nombre} />
                    </div>
                    <div className="col-12 col-md-7">
                        <h2 className="mb-2">{prod.nombre}</h2>
                        <p className="text-muted">{prod.descripcion}</p>
                        <p className="h4 mb-1">${Number(prod.precio).toFixed(2)}</p>
                        <p className={disponible ? "text-success" : "text-danger"}>
                            {disponible ? `Disponible (${prod.stock} en stock)` : "Agotado"}
                        </p>

                        <div className="d-flex align-items-center gap-2 my-3">
                            <label className="form-label mb-0">Cantidad:</label>
                            <input
                                type="number"
                                className="form-control"
                                style={{ width: 100 }}
                                min={1}
                                max={Math.max(1, Number(prod.stock))}
                                value={cantidad}
                                onChange={e => setCantidad(e.target.value)}
                            />
                            <button disabled={!disponible} onClick={addToCart} className="btn btn-primary">
                                Agregar al carrito
                            </button>
                        </div>

                        <small className="text-secondary">ID: {prod.id_producto}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}