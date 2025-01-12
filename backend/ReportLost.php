<?php
// Enable CORS for API requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$host = "localhost";
$dbname = "lost_and_found";
$username = "root";
$password = ""; // Replace with your MySQL password if applicable

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Function to handle file upload
function uploadFile($file)
{
    $upload_dir = "uploads/";
    $photo_name = time() . "_" . basename($file["name"]);
    $upload_path = $upload_dir . $photo_name;

    // Check if directory exists and create if not
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true); // Create directory if it doesn't exist
    }

    // Move uploaded file to the server
    if (move_uploaded_file($file["tmp_name"], $upload_path)) {
        return $upload_path; // Return the file path if upload is successful
    } else {
        return false; // Return false if the upload fails
    }
}

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if all required fields are present
    if (
        isset($_POST["name"]) &&
        isset($_POST["item"]) &&
        isset($_POST["location"]) &&
        isset($_POST["date"]) &&
        isset($_POST["description"]) &&
        isset($_FILES["photo"])
    ) {
        // Escape strings to prevent SQL injection
        $name = $conn->real_escape_string($_POST["name"]);
        $item = $conn->real_escape_string($_POST["item"]);
        $location = $conn->real_escape_string($_POST["location"]);
        $date = $conn->real_escape_string($_POST["date"]);
        $description = $conn->real_escape_string($_POST["description"]);

        // Handle file upload
        $photo_path = uploadFile($_FILES["photo"]);

        if ($photo_path) {
            // Save form data and photo path to the database
            $sql = "INSERT INTO lost_items (name, item, location, date, description, photo_path) 
                    VALUES ('$name', '$item', '$location', '$date', '$description', '$photo_path')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Form submitted successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Failed to upload photo"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
?>
