<?php
	header('Content-Type: application/json;charset=UTF-8');
	require('00-init.php');
	$classify=$_REQUEST["classify"];
	$sql="SELECT * FROM 00_tn_banner WHERE classify='$classify'";
	echo (sql_execute($sql));