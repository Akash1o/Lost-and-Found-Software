<?php
// Enable CORS for API requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "DatabaseCon.php";
// Function to handle file upload
function uploadFile($file)
{
    $upload_dir = "uploads/";
    //created a folder name uplaods 

    $photo_name = time() . "_" . basename($file["name"]);
    //create a copy of original file with time_originalfilename.

    $upload_path = $upload_dir . $photo_name;
    //then the path will be shown like uplaods/02102_original,png

    // Check if directory exists and create if not
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true); // Create directory if it doesn't exist
    }
   // 0777 gives full read, write, and execute permissions to owner, group, and others.

    // Move uploaded file to the server
    if (move_uploaded_file($file["tmp_name"], $upload_path)) {
       //move uplaod file moves the temp file(files from form which are stores in browser)
       // to uplaoed path
       
        return $upload_path; // Return the file path if upload is successful
    } else {
        return false; // Return false if the upload fails
    }
}

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
        // Retrieve form data directly
        $name = $_POST["name"];
        $item = $_POST["item"];
        $location = $_POST["location"];
        $date = $_POST["date"];
        $description = $_POST["description"];

        // Handle file upload
        $photo_path = uploadFile($_FILES["photo"]);

        if ($photo_path) {
            // Save form data and photo path to the database
            $sql = "INSERT INTO lost_items (name, item, location, date, description, photo_path) 
                    VALUES ('$name', '$item', '$location', '$date', '$description', '$photo_path')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Your Form Submitted Succesfully."]);
            } else {
                echo json_encode(["success" => false, "message" => "Error in Database: " .  $conn->error]);
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
