<?php
	header('Content-Type: application/json;charset=UTF-8');
	require('00-init.php');
	@$city=$_REQUEST["city"];
	$sql="SELECT * FROM 02_city_business WHERE city='$city'";
	echo (sql_execute($sql));