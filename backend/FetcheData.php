<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('DatabaseCon.php');

$response = ["success" => true];


$query1 = "SELECT * FROM users";
$result1 = mysqli_query($conn, $query1);

if ($result1->num_rows > 0) {
    $user = [];
    while ($row = $result1->fetch_assoc()) {
        $user[] = $row;
    }
    $response["item1"] = $user;
} else {
    $response["item1"] = []; 
}


$query2 = "SELECT * FROM lost_items";
$result2 = mysqli_query($conn, $query2);

if ($result2->num_rows > 0) {
    $lostItem = [];
    while ($row2 = $result2->fetch_assoc()) {
        $lostItem[] = $row2;
    }
    $response["lostItem"] = $lostItem;
} else {
    $response["lostItem"] = [];
}

$query3 = "SELECT * FROM found_items";
$result3 = mysqli_query($conn, $query3);

if ($result3->num_rows > 0) {
    $foundItem = [];
    while ($row3 = $result3->fetch_assoc()) {
        $foundItem[] = $row3;
    }
    $response["foundItem"] = $foundItem;
} else {
    $response["foundItem"] = [];
}


echo json_encode($response);
?>
