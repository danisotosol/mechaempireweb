// PerfilUsuario.jsx
import React, { useState, useEffect } from "react";

const PerfilUsuario = () => {
    // Datos de usuario simulados
    const [usuario, setUsuario] = useState({
        nombre: "Usuario Invitado",
        email: "invitado@ejemplo.com",
    });

    // Historial de compras simulado
    const [historial, setHistorial] = useState([
        { id: "001", fecha: "2025-07-20", total: 45.5 },
        { id: "002", fecha: "2025-08-05", total: 120.0 },
        { id: "003", fecha: "2025-08-10", total: 25.0 },
    ]);

    const [clave, setClave] = useState("");

    // Manejo del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", usuario.nombre);
        formData.append("email", usuario.email);
        formData.append("clave", clave);

        try {
            const response = await fetch("procesar.php", {
                method: "POST",
                body: formData,
            });
            const html = await response.text();
            document.open();
            document.write(html);
            document.close();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar los cambios.");
        }
    };

    // Manejo de cerrar sesión
    const handleCerrarSesion = () => {
        window.location.href = "procesar.php?accion=cerrar_sesion";
    };

    // Función para ver detalles de compra
    const verDetalles = (compraId) => {
        alert(`Mostrando detalles de la compra ${compraId}`);
    };

    // Manejo de inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container">
            <h1>Perfil de Usuario</h1>
            <p>
                Bienvenido, <span>{usuario.nombre}</span>
            </p>

            <hr />

            <h2>Información del Perfil</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                />

                <label htmlFor="clave">Nueva Contraseña:</label>
                <input
                    type="password"
                    id="clave"
                    name="clave"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                />

                <button type="submit">Guardar Cambios</button>
            </form>

            <hr />

            <h2>Historial de Compras</h2>
            <table>
                <thead>
                <tr>
                    <th>ID de Compra</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Detalles</th>
                </tr>
                </thead>
                <tbody>
                {historial.map((compra) => (
                    <tr key={compra.id}>
                        <td>{compra.id}</td>
                        <td>{compra.fecha}</td>
                        <td>${compra.total.toFixed(2)}</td>
                        <td>
                            <button onClick={() => verDetalles(compra.id)}>Ver</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <hr />

            <button className="cerrar-sesion" onClick={handleCerrarSesion}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default PerfilUsuario;
