<?php
header('Content-Type: application/json');
require_once 'conexion.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM Compra");
        $data = [];
        while ($row = $result->fetch_assoc())
            $data[] = $row;
        echo json_encode($data);
        break;
    case 'POST':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("INSERT INTO Compra (id_usuario, fecha, total) VALUES (?, ?, ?)");
        $sentencia->bind_param("isd", $datos['id_usuario'], $datos['fecha'], $datos['total']);
        $sentencia->execute();
        echo json_encode(['id_compra' => $sentencia->insert_id]);
        $sentencia->close();
        break;
    case 'PUT':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("UPDATE Compra SET id_usuario=?, fecha=?, total=? WHERE id_compra=?");
        $sentencia->bind_param("isdi", $datos['id_usuario'], $datos['fecha'], $datos['total'], $datos['id_compra']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $datos);
        $sentencia = $conn->prepare("DELETE FROM Compra WHERE id_compra=?");
        $sentencia->bind_param("i", $datos['id_compra']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
}
$conn->close();
?>