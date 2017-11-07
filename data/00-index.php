<?php
    header("Content-Type:application/json;charset=UTF-8");
    $conn=mysqli_connect("127.0.0.1","root","","tuniu",3306);
    mysqli_query($conn,"SET NAMES UTF8");
    $name=$_REQUEST["name"];
    $classify=$_REQUEST["classify"];
    $sql="SELECT title,price,satisfaction,href,img FROM 01_index WHERE name='$name' AND classify='$classify'";
    $result=mysqli_query($conn,$sql);
    $all=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($all);
?>