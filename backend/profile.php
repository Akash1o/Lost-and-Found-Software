<?php
session_start();  // Start the session

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'DatabaseCon.php'; // Ensure this file connects to your database

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id']; // Get user ID from session

// Get form data from POST
$name = $_POST['name'];
$faculty = $_POST['faculty'];
$contact = $_POST['contact'];

// Ensure all required fields are provided
if (empty($name) || empty($faculty) || empty($contact)) {
    echo json_encode(["success" => false, "message" => "Please fill in all fields"]);
    exit;
}

// Check if the user exists in the `users` table
$sql_check = "SELECT * FROM users WHERE user_id = '$user_id'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    // If the profile exists, try updating it
    $sql_update = "UPDATE users SET name = '$name', faculty = '$faculty', contact = '$contact' WHERE user_id = '$user_id'";

    if ($conn->query($sql_update) === TRUE) {
        echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
    } else {
        // Debugging: check the MySQL error
        echo json_encode(["success" => false, "message" => "Failed to update profile. Please try again back", "error" => $conn->error]);
    }
} else {
    // If the profile doesn't exist (which is unlikely), insert a new record
    $sql_insert = "INSERT INTO users (user_id, name, faculty, contact) VALUES ('$user_id', '$name', '$faculty', '$contact')";
    if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(["success" => true, "message" => "Profile created successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to create profile. Please try again"]);
    }
}

$conn->close();
?>
