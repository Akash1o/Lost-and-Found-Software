<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$server='localhost';
$username='root';
$password="";
$db="lost_and_found";

$conn=mysqli_connect($server,$username,$password,$db);

if(!$conn){
    die("Failed to connect");
}
$query="SELECT * FROM found_items";
$result=mysqli_query($conn,$query);

if($result->num_rows>0){
    $items=[];

    while($row=$result->fetch_assoc()){
        $items[]=$row;
    }
    echo json_encode(['success'=>'true','items'=>$items]);
}
else {
    echo json_encode(["success" => false, "message" => "No items found"]);
}
$conn->close();
?>