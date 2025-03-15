<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('DatabaseCon.php');

$query1="SELECT count(*) as total from found_items";
$query2="SELECT count(*) as total from lost_items";
$query3="SELECT count(*) as total from users";

$result1=mysqli_query($conn,$query1);
$result2=mysqli_query($conn,$query2);
$result3=mysqli_query($conn,$query3);

$row1 = mysqli_fetch_assoc($result1);
$row2 = mysqli_fetch_assoc($result2);
$row3 = mysqli_fetch_assoc($result3);

if ($result1 && $result2 && $result3) {

    echo json_encode([
        'found' => $row1['total'],
        'lost' => $row2['total'],
        'user' => $row3['total']
    ]);
} else {

    echo json_encode(['error' => 'Failed to retrieve data']);
}


mysqli_close($conn);
?>