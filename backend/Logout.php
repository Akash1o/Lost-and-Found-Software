<?php
header("Access-Control-Allow-Origin:*"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow these methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow these headers

session_start(); // Start session

if (isset($_SESSION['user'])) {
    // User is logged in
    session_unset(); // Unset session variables
    session_destroy(); // Destroy the session
    echo json_encode(['loggedIn' => false]);
} else {
    // User is not logged in
    echo json_encode(['loggedIn' => false]);
}
?>
