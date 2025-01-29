<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');


// $data=json_decode(file_get_contents('php://input',true));
// $emails=$data["email"];
//  $_SESSION["email"] = $emails; 
 

if (isset($_SESSION['user'])) {
   
    // User is logged in
    echo json_encode(['loggedIn' => true]);
} else {
    // User is not logged in
    echo json_encode(['loggedIn' => false]);
}
?>
