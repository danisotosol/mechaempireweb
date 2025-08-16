document.addEventListener("DOMContentLoaded", () => {
    // Datos de usuario simulados (en un entorno real, vendrían del servidor)
    let usuario = {
        nombre: "",
        email: ""
    };

    // Historial de compras simulado
    const historial = [
        { id: "001", fecha: "2025-07-20", total: 45.50 },
        { id: "002", fecha: "2025-08-05", total: 120.00 },
        { id: "003", fecha: "2025-08-10", total: 25.00 }
    ];

    const formularioPerfil = document.getElementById("formulario-perfil");
    const nombreUsuarioSpan = document.getElementById("nombre-usuario");
    const comprasCuerpo = document.getElementById("compras-cuerpo");
    const cerrarSesionBtn = document.getElementById("cerrar-sesion");

    // Función para cargar los datos del usuario en la interfaz
    function cargarPerfil() {
        nombreUsuarioSpan.textContent = usuario.nombre;
        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("email").value = usuario.email;
    }

    // Función para renderizar el historial de compras
    function renderizarHistorial() {
        comprasCuerpo.innerHTML = "";
        historial.forEach(compra => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${compra.id}</td>
                <td>${compra.fecha}</td>
                <td>$${compra.total.toFixed(2)}</td>
                <td><button onclick="verDetalles('${compra.id}')">Ver</button></td>
            `;
            comprasCuerpo.appendChild(fila);
        });
    }

    // Manejador del formulario para guardar los cambios del perfil
    formularioPerfil.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevoNombre = document.getElementById("nombre").value;
        const nuevoEmail = document.getElementById("email").value;
        const nuevaClave = document.getElementById("clave").value;

        // Se simula el envío a PHP
        const formData = new FormData();
        formData.append("nombre", nuevoNombre);
        formData.append("email", nuevoEmail);
        formData.append("clave", nuevaClave);

        fetch("procesar.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(html => {
            document.open();
            document.write(html);
            document.close();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error al guardar los cambios.");
        });
    });

    // Manejador del botón de cerrar sesión
    cerrarSesionBtn.addEventListener("click", () => {
        // Enviar a PHP para cerrar sesión
        window.location.href = "procesar.php?accion=cerrar_sesion";
    });

    // Función simulada para ver detalles (solo muestra una alerta)
    window.verDetalles = (compraId) => {
        alert(`Mostrando detalles de la compra ${compraId}`);
    };

    cargarPerfil();
    renderizarHistorial();
});