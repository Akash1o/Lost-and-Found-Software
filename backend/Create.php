<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include "DatabaseCon.php";

if ($_SERVER["REQUEST_METHOD"] === 'POST') {

    // Check if all required fields are set
    if (
        isset($_POST["fullname"]) &&
        isset($_POST["idNumber"]) &&
        isset($_POST["faculty"]) &&
        isset($_POST["contact"]) &&
        isset($_POST["email"]) &&
        isset($_POST["password"])
    ) {
        $fullname = $_POST["fullname"];
        $idNumber = $_POST["idNumber"];
        $faculty = $_POST["faculty"];
        $contact = $_POST["contact"];
        $email = $_POST["email"];
        $password = $_POST["password"];
      

        // SQL query to insert the data into the database
        $sql = "INSERT INTO users (fullname,idNumber,faculty,contact, email, password)
                VALUES ('$fullname','$idNumber','$faculty','$contact', '$email', '$password')";
        
        if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Your account has been created."]);
            
        } else {
            echo json_encode(["success" => false, "message" => "Error in Database: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
?>




