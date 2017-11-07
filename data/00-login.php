<?php
	session_start();
	require('00-init.php');
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	$sql="SELECT uid FROM 00_tn_user WHERE uname='$uname' AND upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row)
		echo "1";
	else
		echo '查询失败！请检查sql语句：'.$sql;	
	// $_SESSION['uid']=$row['uid'];
