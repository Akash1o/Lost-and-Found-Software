<?php
// Enable CORS for API requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Content-Type");


include "DatabaseCon.php";

// Retrieve data from the database
$sql = "SELECT * FROM lost_items";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $items = [];
    //creates empty array to store the rows

    while($row = $result->fetch_assoc()) {
    //loops through each row from result fetchassoc fetches rows in associative
    //array format from each row of result in key value pair.

    
        $items[] = $row;
  //append the each row in the items array.

    }
    echo json_encode(["success" => true, "item" => $items]);
} else {
    echo json_encode(["success" => false, "message" => "No items found"]);
}

$conn->close();
?>
