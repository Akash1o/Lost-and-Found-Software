<?php
// Allow requests from any domain 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
include "DatabaseCon.php";

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
        $userId=$_GET['userId'];
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

$query = "INSERT INTO found_items (name,userId, item, location, date, description, photoPath) 
                    VALUES ('$name','$userId', '$item', '$location', '$date', '$description', '$filePath')";
$result=mysqli_query($conn,$query);

if($result){
    echo json_encode(["success" => true, "message" => "Your Form Submitted Succesfully."]);
}
else{
    echo json_encode(["success"=>false,"message" =>"Error in Database: " .  $conn->error]); 
}

$conn->close(); 
?>
