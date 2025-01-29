<?php
session_start(); // Start the session

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "DatabaseCon.php";

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($data["email"]) && isset($data["password"])) {
        $email = $data["email"];
        $password = $data["password"];

        // Secure query using prepared statements
        $sql = "SELECT idNumber, email FROM users WHERE email = ? AND password = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("ss", $email, $password);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                
                // Store user session
                $_SESSION["user"] = $user["email"];

                echo json_encode([
                    "success" => true,
                    "message" => "Login successful.",
                    "idNumber" => $user["idNumber"]  // Return idNumber for React
                ]);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid email or password."]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Email and password are required."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
?>
