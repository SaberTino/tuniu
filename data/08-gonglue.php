<?php
	require("init.php");
	$sql="SELECT * FROM 08_gonglue";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
	echo json_encode($rows);
?>