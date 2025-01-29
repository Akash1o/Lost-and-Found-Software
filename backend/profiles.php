<?php

session_start();  // Start the session
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('DatabaseCon.php');

$method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents('php://input'), true);


$email = $_SESSION['sandesh'] ?? null; 


if ($email) {
    switch ($method) {
        case 'GET':
            // Fetch data based on the email from session
            $query = "SELECT * FROM profile WHERE email = ?";
            if ($stmt = $conn->prepare($query)) {
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0) {
                    $profile = $result->fetch_assoc();
                    echo json_encode(["success" => true, "profile" => $profile]);
                } else {
                    echo json_encode(["success" => false, "message" => "No profile found"]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
            }
            break;

        case 'POST':
            // Retrieve data from the request body
            $name = $data['name'];
            $id = $data['id'];
            $faculty = $data['faculty'];
            $contact = $data['contact'];

            // Insert the profile data into the profile table, using the email from the session
            $sql = "INSERT INTO profile (name, id, faculty, contact, email) VALUES (?, ?, ?, ?, ?)";
            if ($stmt = $conn->prepare($sql)) {
                $stmt->bind_param("sisss", $name, $id, $faculty, $contact, $email);
                $stmt->execute();

                if ($stmt->affected_rows > 0) {
                    echo json_encode(["success" => true, "message" => "Data inserted successfully"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Data was not inserted. Error: " . $conn->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
            }
            break;

        case 'PUT':
            // Update profile based on the email from the session
            $name = $data['name'];
            $id = $data['id'];
            $faculty = $data['faculty'];
            $contact = $data['contact'];

            $sql = "UPDATE profile SET name=?, id=?, faculty=?, contact=? WHERE email=?";
            if ($stmt = $conn->prepare($sql)) {
                $stmt->bind_param("sisss", $name, $id, $faculty, $contact, $email);
                $stmt->execute();

                if ($stmt->affected_rows > 0) {
                    echo json_encode(["success" => true, "message" => "Data updated successfully"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Data was not updated. Error: " . $conn->error]);
                }
                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
            }
            break;

        default:
            echo json_encode(["success" => false, "message" => "Invalid request method"]);
            break;
    }
} else {
    echo json_encode(["success" => false, "message" => "User not logged in or no email found in session",'email'=>$email,'data'=>$data]);
}

$conn->close();
?>
