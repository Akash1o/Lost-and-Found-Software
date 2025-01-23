<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "DatabaseCon.php";

// Query to find matching items between lost_items and found_items
$query = "
    SELECT 
        lost_items.id AS lost_id,
        lost_items.name AS lost_name,
        lost_items.item AS lost_item,
        lost_items.location AS lost_location,
        lost_items.date AS lost_date,
        lost_items.description AS lost_description,
        lost_items.photo_path AS lost_photo_path,
        found_items.id AS found_id,
        found_items.name AS found_name,
        found_items.item AS found_item,
        found_items.location AS found_location,
        found_items.date AS found_date,
        found_items.description AS found_description,
        found_items.photo_paht AS found_photo_path
    FROM 
        lost_items
    INNER JOIN 
        found_items
    ON 
        lost_items.item = found_items.item 
        AND lost_items.location = found_items.location 
        AND lost_items.date = found_items.date
";

$result = mysqli_query($conn, $query);

if ($result->num_rows > 0) {
    $matchedItems = [];

    // Fetch matched items
    while ($row = $result->fetch_assoc()) {
        $matchedItems[] = $row;
    }

    // Return matched items as JSON
    echo json_encode(["success" => true, "matchedItems" => $matchedItems]);
} else {
    echo json_encode(["success" => false, "message" => "No matching items found"]);
}

$conn->close();
?>