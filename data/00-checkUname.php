<?php
	require('00-init.php');
	@$uname=$_REQUEST["uname"];
	$sql="SELECT * FROM 00_tn_user WHERE uname='$uname'";
	echo sql_registerCheck($sql);