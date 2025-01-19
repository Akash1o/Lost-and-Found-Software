<?php
// Allow requests from any domain (change "*" to a specific domain for security)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$host = "localhost";
$dbname = "lost_and_found";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (
        isset($_FILES['photo']) && isset($_POST['name'])
        && isset($_POST['date'])
        && isset($_POST['item'])
        && isset($_POST['location'])
        && isset($_POST['description'])
    ) {

        $file = $_FILES['photo'];
        $name = $_POST['name'];
        $item = $_POST['item'];
        $location = $_POST['location'];
        $date = $_POST['date'];
        $description = $_POST['description'];

        $uploadDir = 'upload/';

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = basename($file['name']);
        $filePath = $uploadDir . $fileName;

        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            $response = [
                'status' => 'success',
                'message' => 'file uploaded sucessfully',
                'filePath' => $filePath,
                'name' => $name,
                'item' => $item,
                'location' => $location,
                'date' => $date,
                'description' => $description
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to upload file'
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'No file or title provided'
        ];
    }
} else {
    echo json_encode(['success' => 'false', 'message' => 'Invalid server request']);
}

$query = "INSERT INTO found_items (name, item, location, date, description, photoPath) 
                    VALUES ('$name', '$item', '$location', '$date', '$description', '$filePath')";
$result=mysqli_query($conn,$query);

if($result){
    echo "DATA INSERTED SUCESSFULLY";
}
else{
    echo "FAILED TO INSERT DATA ";
}


header('Content-Type:application/json');
echo json_encode($response);
