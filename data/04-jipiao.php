<?php
header("Content-Type:application/json;charset=UTF-8");
@$scity=$_REQUEST["start_city"];
@$ecity=$_REQUEST["end_city"];
require("00-init.php");
$sql="SELECT * FROM passenger_ticket WHERE start_city='$scity' AND end_city='$ecity'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($row);

?>