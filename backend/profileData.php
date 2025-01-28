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

// Query to fetch user data
$sql = "SELECT name, id, faculty, contact FROM users WHERE user_id = '$user_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $profile = $result->fetch_assoc();
    echo json_encode(["success" => true, "profile" => $profile]);
} else {
    echo json_encode(["success" => false, "message" => "Profile not found"]);
}

$conn->close();
?>
