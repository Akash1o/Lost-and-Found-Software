<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('DatabaseCon.php');
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $itemId = $data['id'];

    $query = "DELETE FROM lost_items WHERE lost_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $itemId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Item deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete item"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid ID"]);
}

?>