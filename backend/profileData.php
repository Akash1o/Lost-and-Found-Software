<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include('DatabaseCon.php');

$q="SELECT * FROM profile where code=1";
$stm=$conn->query($q);
if($stm->num_rows>0){
    $profile=$stm->fetch_assoc();
    
    echo json_encode(["success"=>true,"profile"=>$profile]);
}
else{
    echo json_encode(["success"=>false,"message"=>"No data found"]);
}
?>