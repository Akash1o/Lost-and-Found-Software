<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include "DatabaseCon.php";

if ($_SERVER["REQUEST_METHOD"] === 'POST') {

    // Check if all required fields are set
    if (
        isset($_POST["fullname"]) &&
        isset($_POST["email"]) &&
        isset($_POST["password"])
    ) {
        $fullname = $_POST["fullname"];
        $email = $_POST["email"];
        $password = $_POST["password"];
       $_SESSION["email"]=$email;

        // SQL query to insert the data into the database
        $sql = "INSERT INTO users (fullname, email, password)
                VALUES ('$fullname', '$email', '$password')";
        
        if ($conn->query($sql) === TRUE) {
            $sql_profile="INSERT INTO profile (email) VALUES ('$email')";
            if($conn->query($sql_profile)===TRUE){

                echo json_encode(["success" => true, "message" => "Your account has been created."]);
            }
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




