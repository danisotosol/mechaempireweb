<?php

// Inicia la sesión para poder gestionarla (en un proyecto real)
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Procesar la actualización del perfil
    if (isset($_POST["nombre"]) && isset($_POST["email"])) {
        $nombre = htmlspecialchars($_POST["nombre"]);
        $email = htmlspecialchars($_POST["email"]);
        $clave = $_POST["clave"]; // No se sanitiza porque la clave debe ser tratada de forma segura (ej. hashing)

        // Aquí iría la lógica para actualizar el perfil en la base de datos
        // Por ejemplo:
        // if (actualizarUsuario($nombre, $email, $clave)) {
        //     echo "<h1>Cambios Guardados</h1>";
        //     echo "<p>Tu perfil ha sido actualizado con éxito.</p>";
        // } else {
        //     echo "<h1>Error</h1>";
        //     echo "<p>No se pudieron guardar los cambios.</p>";
        // }

        // Simulación de respuesta exitosa
        echo "<h1>Cambios Guardados</h1>";
        echo "<p>Tu perfil ha sido actualizado con éxito. ¡Gracias, <strong>$nombre</strong>!</p>";
        echo "<p>Email: $email</p>";
        if (!empty($clave)) {
            echo "<p>La contraseña ha sido actualizada.</p>";
        }
        echo "<a href='index.html'>Volver al perfil</a>";

    } else {
        echo "<h3>Datos no válidos para actualizar el perfil.</h3>";
        echo "<a href='index.html'>Volver</a>";
    }

} elseif (isset($_GET["accion"]) && $_GET["accion"] === "cerrar_sesion") {
    // Procesar el cierre de sesión
    
    // Aquí iría la lógica para destruir la sesión
    // Por ejemplo:
    // session_unset();
    // session_destroy();

    echo "<h1>Cierre de Sesión Exitoso</h1>";
    echo "<p>Has cerrado tu sesión correctamente.</p>";
    echo "<a href='index.html'>Volver al inicio</a>";
    
} else {
    echo "<h3>Acceso no válido.</h3>";
    echo "<a href='index.html'>Volver</a>";
}

?>