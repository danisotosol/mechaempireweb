<?php
header('Content-Type: application/json');
require_once 'conexion.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM Categoria");
        $data = [];
        while ($row = $result->fetch_assoc())
            $data[] = $row;
        echo json_encode($data);
        break;
    case 'POST':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("INSERT INTO Categoria (nombre_categoria) VALUES (?)");
        $sentencia->bind_param("sentencia", $datos['nombre_categoria']);
        $sentencia->execute();
        echo json_encode(['id_categoria' => $sentencia->insert_id]);
        $sentencia->close();
        break;
    case 'PUT':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("UPDATE Categoria SET nombre_categoria=? WHERE id_categoria=?");
        $sentencia->bind_param("si", $datos['nombre_categoria'], $datos['id_categoria']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $datos);
        $sentencia = $conn->prepare("DELETE FROM Categoria WHERE id_categoria=?");
        $sentencia->bind_param("i", $datos['id_categoria']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
}
$conn->close();
?>