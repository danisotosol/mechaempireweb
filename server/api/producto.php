<?php
header('Content-Type: application/json');
require_once 'conexion.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM Producto");
        $data = [];
        while ($row = $result->fetch_assoc())
            $data[] = $row;
        echo json_encode($data);
        break;
    case 'POST':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("INSERT INTO Producto (id_categoria, nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)");
        $sentencia->bind_param("issdis", $datos['id_categoria'], $datos['nombre'], $datos['descripcion'], $datos['precio'], $datos['stock'], $datos['imagen']);
        $sentencia->execute();
        echo json_encode(['id_producto' => $sentencia->insert_id]);
        $sentencia->close();
        break;
    case 'PUT':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("UPDATE Producto SET id_categoria=?, nombre=?, descripcion=?, precio=?, stock=?, imagen=? WHERE id_producto=?");
        $sentencia->bind_param("issdisi", $datos['id_categoria'], $datos['nombre'], $datos['descripcion'], $datos['precio'], $datos['stock'], $datos['imagen'], $datos['id_producto']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $datos);
        $sentencia = $conn->prepare("DELETE FROM Producto WHERE id_producto=?");
        $sentencia->bind_param("i", $datos['id_producto']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
}
$conn->close();
?>