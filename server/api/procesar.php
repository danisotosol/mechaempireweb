<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["carrito"])) {
        // Decodifica la cadena JSON del formulario a un array de PHP
        $carrito = json_decode($_POST["carrito"], true);

        echo "<h1>Pedido Confirmado</h1>";
        echo "<h2>Productos:</h2>";
        echo "<ul>";
        
        $total = 0;
        if (!empty($carrito)) {
            foreach ($carrito as $producto) {
                // Muestra cada producto con sus detalles
                $subtotal = $producto["precio"] * $producto["cantidad"];
                echo "<li>" . htmlspecialchars($producto["nombre"]) . " - Cantidad: " . htmlspecialchars($producto["cantidad"]) . " - Subtotal: $" . number_format($subtotal, 2) . "</li>";
                $total += $subtotal;
            }
        }
        
        echo "</ul>";
        echo "<h3>Total del Pedido: $" . number_format($total, 2) . "</h3>";
        echo "<a href='index.html'>Volver al inicio</a>";

    } else {
        echo "<h3>No se recibió ningún producto en el carrito.</h3>";
        echo "<a href='index.html'>Volver al inicio</a>";
    }
} else {
    echo "<h3>Acceso no válido.</h3>";
    echo "<a href='index.html'>Volver al inicio</a>";
}
?>