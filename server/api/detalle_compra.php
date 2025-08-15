<?php
header('Content-Type: application/json');
require_once 'conexion.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM Detalle_compra");
        $data = [];
        while ($row = $result->fetch_assoc())
            $data[] = $row;
        echo json_encode($data);
        break;
    case 'POST':
        $d = json_decode(file_get_contents('php://input'), true);
        $s = $conn->prepare("INSERT INTO Detalle_compra (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)");
        $s->bind_param("iiid", $d['id_compra'], $d['id_producto'], $d['cantidad'], $d['precio_unitario']);
        $s->execute();
        echo json_encode(['id_detalle' => $s->insert_id]);
        $s->close();
        break;
    case 'PUT':
        $d = json_decode(file_get_contents('php://input'), true);
        $s = $conn->prepare("UPDATE Detalle_compra SET id_compra=?, id_producto=?, cantidad=?, precio_unitario=? WHERE id_detalle=?");
        $s->bind_param("iiidi", $d['id_compra'], $d['id_producto'], $d['cantidad'], $d['precio_unitario'], $d['id_detalle']);
        $s->execute();
        echo json_encode(['success' => true]);
        $s->close();
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $d);
        $s = $conn->prepare("DELETE FROM Detalle_compra WHERE id_detalle=?");
        $s->bind_param("i", $d['id_detalle']);
        $s->execute();
        echo json_encode(['success' => true]);
        $s->close();
        break;
}
$conn->close();
?>