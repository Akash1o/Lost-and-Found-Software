<?php
session_start();

if (!isset($_SESSION["user"])) {
    // If no user session exists, redirect to the login page after waiting for 3 seconds
    echo json_encode(["success" => false, "message" => "You must be logged in to access this page."]);
    header("refresh:3;url=login.html"); // Redirect after 3 seconds
    exit();
}
?>
