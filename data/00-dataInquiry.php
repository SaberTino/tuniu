<?php
	header('Content-Type: application/json;charset=UTF-8');
	require('00-init.php');
	$table=$_REQUEST["table"];
	$classify=$_REQUEST["classify"];
	$sql="SELECT * FROM $table WHERE classify='$classify'";
	echo (sql_execute($sql));