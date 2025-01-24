<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include('DatabaseCon.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize inputs to avoid SQL injection or other vulnerabilities
    $code = 1;
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $faculty = mysqli_real_escape_string($conn, $_POST['faculty']);
    $contact = mysqli_real_escape_string($conn, $_POST['contact']);

    

    // $query = "INSERT INTO profile (name, id, faculty, contact) VALUES (?, ?, ?, ?)";

    // $query="UPDATE Profile SET name=?,id=?,faculty=?,contact=? WHERE code=1";

 $sql="SELECT * FROM profile where code=?";
 $stm=$conn->prepare($sql);
 $stm->bind_param("i",$code);
 $stm->execute();
    $result=$stm->get_result();

    if($result->num_rows>0){
        $query="UPDATE Profile SET name=?,id=?,faculty=?,contact=? WHERE code=?";
        $updatedStm=$conn->prepare($query);
        $updatedStm->bind_param("sisis",$name,$id,$faculty,$contact,$code);
        $updatedStm->execute();
    }
    else{
        $query="INSERT INTO Profile (name,id,faculty,contact) VALUES(?,?,?,?)";
        $updatedStm=$conn->prepare($query);
        $updatedStm->bind_param("sisi",$name,$id,$faculty,$contact);
        $updatedStm->execute();
    }
    if($updatedStm->affected_rows>0){
        echo json_encode(["message"=>"Data inserted successfully"]);
    }
    else{
        echo json_encode(["message"=>"Data was not inserted. Error: ".$conn->error]);
    }

    mysqli_close($conn);
}
?>
