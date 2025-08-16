import { useState } from "react";
import "./Carrito.css";

export default function Carrito() {
    const [productos] = useState([
        { id: 1, nombre: "Producto 1", precio: 10.0 },
        { id: 2, nombre: "Producto 2", precio: 15.0 },
        { id: 3, nombre: "Producto 3", precio: 25.5 },
    ]);

    const [carrito, setCarrito] = useState([]);

    // Agregar producto al carrito
    const agregarAlCarrito = (productoId) => {
        const producto = productos.find((p) => p.id === productoId);
        if (!producto) return;

        const productoEnCarrito = carrito.find((item) => item.id === productoId);
        if (productoEnCarrito) {
            setCarrito(
                carrito.map((item) =>
                    item.id === productoId
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    // Eliminar producto del carrito
    const eliminarDelCarrito = (productoId) => {
        setCarrito(carrito.filter((item) => item.id !== productoId));
    };

    // Calcular total
    const total = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    // Enviar pedido al backend (PHP)
    const enviarPedido = async (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert("El carrito está vacío. Agregue productos antes de confirmar.");
            return;
        }

        const formData = new FormData();
        formData.append("carrito", JSON.stringify(carrito));

        try {
            const response = await fetch(
                "http://localhost/server/api/procesar.php",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                alert("Pedido enviado correctamente ✅");
                setCarrito([]);
            } else {
                alert("Error al enviar el pedido ❌");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert("No se pudo enviar el pedido.");
        }
    };

    return (
        <div className="container">
            <h1>Productos Disponibles</h1>
            <div className="productos">
                {productos.map((producto) => (
                    <div key={producto.id} className="producto">
                        <h3>{producto.nombre}</h3>
                        <p>Precio: ${producto.precio.toFixed(2)}</p>
                        <button onClick={() => agregarAlCarrito(producto.id)}>
                            Agregar al carrito
                        </button>
                    </div>
                ))}
            </div>

            <hr />

            <h2>Tu Carrito</h2>
            <table id="tablaCarrito">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {carrito.map((item) => (
                    <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>${item.precio.toFixed(2)}</td>
                        <td>{item.cantidad}</td>
                        <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                        <td>
                            <button onClick={() => eliminarDelCarrito(item.id)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <p>
                <strong>Total: ${total.toFixed(2)}</strong>
            </p>

            <form onSubmit={enviarPedido}>
                <button type="submit" className="confirmar">
                    Confirmar Pedido
                </button>
            </form>
        </div>
    );
}
