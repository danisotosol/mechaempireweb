<?php
header('Content-Type: application/json');
require_once 'conexion.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM Venta");
        $data = [];
        while ($row = $result->fetch_assoc())
            $data[] = $row;
        echo json_encode($data);
        break;
    case 'POST':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("INSERT INTO Venta (id_producto, cantidad_vendida, fecha_venta) VALUES (?, ?, ?)");
        $sentencia->bind_param("iis", $datos['id_producto'], $datos['cantidad_vendida'], $datos['fecha_venta']);
        $sentencia->execute();
        echo json_encode(['id_venta' => $sentencia->insert_id]);
        $sentencia->close();
        break;
    case 'PUT':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("UPDATE Venta SET id_producto=?, cantidad_vendida=?, fecha_venta=? WHERE id_venta=?");
        $sentencia->bind_param("iisi", $datos['id_producto'], $datos['cantidad_vendida'], $datos['fecha_venta'], $datos['id_venta']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $datos);
        $sentencia = $conn->prepare("DELETE FROM Venta WHERE id_venta=?");
        $sentencia->bind_param("i", $datos['id_venta']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
}
$conn->close();
?>