<?php

session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('DatabaseCon.php');

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case 'GET':
        if (!isset($_GET['idNumber'])) {
            echo json_encode(["success" => false, "message" => "Missing idNumber parameter"]);
            exit();
        }

        $idNumber = $_GET['idNumber'];

        $query = "SELECT * FROM users WHERE idNumber = ?";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("s", $idNumber);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $profile = $result->fetch_assoc();
                echo json_encode(["success" => true, "profile" => $profile]);
            } else {
                echo json_encode(["success" => false, "message" => "No profile found"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['idNumber']) || !isset($data['fullname']) || !isset($data['faculty']) || !isset($data['contact'])) {
            echo json_encode(["success" => false, "message" => "Missing required fields"]);
            exit();
        }

        $fullname = $data['fullname'];
        $idNumber = $data['idNumber'];
        $faculty = $data['faculty'];
        $contact = $data['contact'];

        $sql = "UPDATE users SET fullname=?, faculty=?, contact=? WHERE idNumber=?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("ssss", $fullname, $faculty, $contact, $idNumber);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "No changes made"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
        }
        break;

    default:
        echo json_encode(["success" => false, "message" => "Invalid request method"]);
        break;
}

$conn->close();
?>
