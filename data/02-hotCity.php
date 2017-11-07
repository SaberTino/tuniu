<?php
	header("Content-Type:application/json;charset=utf-8");

	require_once("00-init.php");
	
	$region=$_REQUEST["region"];
	$sql="SELECT * FROM 02_hot_city WHERE region='$region'";
	echo json_encode(sql_execute($sql));
?>