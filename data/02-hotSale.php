<?php
	header('Content-Type: application/json;charset=UTF-8');
	require('00-init.php');
	@$city=$_REQUEST["city"];
	$sql="SELECT * FROM 02_city_business WHERE city='$city' LIMIT 0,5";
	echo (sql_execute($sql));