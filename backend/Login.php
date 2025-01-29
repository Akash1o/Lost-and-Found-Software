<?php
session_start();  // Start the session

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include "DatabaseCon.php";

// $data = json_decode(file_get_contents('php://input'), true);
// $emails=$data['email'];

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    
    // Check if email and password are set
    if (isset($_POST["email"]) && isset($_POST["password"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];
        $_SESSION['sandesh']=$email;
        
        // SQL query to check if the user exists
        $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            // If the user exists, start a session
            $_SESSION["user"] = $email;  // Store user's email in session
            echo json_encode(["success" => true, "message" => "Login successful."]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid email or password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Email and password are required."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
?>
