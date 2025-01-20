<?php

$server = 'localhost';
$username = 'root';
$password = '';
$db = 'lost_and_found';

$conn = mysqli_connect($server, $username, $password, $db);

if (!$conn) {
    die("Failed to connect to Databases");
}
?>