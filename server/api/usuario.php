<?php
header('Content-Type: application/json');
require_once 'conexion.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM Usuario");
        $usuarios = [];
        while ($row = $result->fetch_assoc())
            $usuarios[] = $row;
        echo json_encode($usuarios);
        break;
    case 'POST':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("INSERT INTO Usuario (nombre, correo, contrasena, id_rol) VALUES (?, ?, ?, ?)");
        $sentencia->bind_param("sssi", $datos['nombre'], $datos['correo'], $datos['contrasena'], $datos['id_rol']);
        $sentencia->execute();
        echo json_encode(['id_usuario' => $sentencia->insert_id]);
        $sentencia->close();
        break;
    case 'PUT':
        $datos = json_decode(file_get_contents('php://input'), true);
        $sentencia = $conn->prepare("UPDATE Usuario SET nombre=?, correo=?, contrasena=?, id_rol=? WHERE id_usuario=?");
        $sentencia->bind_param("sssii", $datos['nombre'], $datos['correo'], $datos['contrasena'], $datos['id_rol'], $datos['id_usuario']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $datos);
        $sentencia = $conn->prepare("DELETE FROM Usuario WHERE id_usuario=?");
        $sentencia->bind_param("i", $datos['id_usuario']);
        $sentencia->execute();
        echo json_encode(['success' => true]);
        $sentencia->close();
        break;
}
$conn->close();
?>