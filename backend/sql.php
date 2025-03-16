<?php

$servername = "localhost";
$username = "root"; 
$password = ""; 

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$dbName = "lost_and_found";
$dbCheckSql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbName'";
$dbCheckResult = mysqli_query($conn, $dbCheckSql);

if (mysqli_num_rows($dbCheckResult) > 0) {
    echo "Database '$dbName' already exists.<br>";
} else {

    $sql = "CREATE DATABASE $dbName";
    if (mysqli_query($conn, $sql)) {
        echo "Database created successfully.<br>";
    } else {
        die("Error creating database: " . mysqli_error($conn));
    }
}
mysqli_select_db($conn, $dbName);


function tableExists($conn, $tableName) {
    $result = mysqli_query($conn, "SHOW TABLES LIKE '$tableName'");
    return mysqli_num_rows($result) > 0;
}


$tableSql = "CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    idNumber VARCHAR(50) NOT NULL UNIQUE,
    faculty VARCHAR(100) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)";

if (tableExists($conn, "users")) {
    echo "Table 'users' already exists.<br>";
} else {
    if (mysqli_query($conn, $tableUsers)) {
        echo "Users table created successfully.<br>";
    } else {
        echo "Error creating users table: " . mysqli_error($conn) . "<br>";
    }
}

$tablefound="CREATE TABLE found_items(
fouond_id int AUTO_INCREMENT primary key,
name varchar(100) not null,
userId int,
item varchar(100) not null,
location varchar(100) not null,
date DATE DEFAULT CURRENT_DATE,
description varchar(100) not null,
photoPath varchar(100) not null
)";


if (tableExists($conn, "found_items")) {
    echo "Table 'found_items' already exists.<br>";
} else {
    if (mysqli_query($conn, $tableFound)) {
        echo "Found items table created successfully.<br>";
    } else {
        echo "Error creating found items table: " . mysqli_error($conn) . "<br>";
    }
}
$tableLost="CREATE TABLE lost_items(
lost_id int AUTO_INCREMENT primary key,
name varchar(100) not null,
userId int,
item varchar(100) not null,
location varchar(100) not null,
date DATE DEFAULT CURRENT_DATE,
description varchar(100) not null,
photo_path varchar(100) not null
)";

if (tableExists($conn, "lost_items")) {
    echo "Table 'lost_items' already exists.<br>";
} else {
    if (mysqli_query($conn, $tableLost)) {
        echo "Lost items table created successfully.<br>";
    } else {
        echo "Error creating lost items table: " . mysqli_error($conn) . "<br>";
    }
}
mysqli_close($conn);
?>
