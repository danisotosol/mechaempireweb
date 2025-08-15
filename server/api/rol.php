<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$result = $conn->query("SELECT * FROM Rol");
$roles = [];
while ($row = $result->fetch_assoc()) $roles[] = $row;
echo json_encode($roles);
$conn->close();
?>