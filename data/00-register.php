<?php
	require('00-init.php');
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	if($uname!=""&&$upwd!=""){
		$sql="INSERT INTO 00_tn_user VALUE(NULL,'$uname','$upwd')";
		echo (sql_register($sql));
	}else
		echo "传入参数为空，检查js代码！！！-鹿石宇";