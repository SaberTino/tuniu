<?php
	$db_host='127.0.0.1';
	$db_user='root';
	$db_password='';
	$db_database='tuniu';
	$db_port=3306;
	$db_charset='SET NAMES UTF8';

	$conn=mysqli_connect($db_host,$db_user,$db_password,$db_database,$db_port);
	mysqli_query($conn,$db_charset);

	/*查询语句返回字符串*/
	function sql_execute($sql){
		global $conn;
		$result=mysqli_query($conn,$sql);
		if(!$result){
			return '查询失败！请检查sql语句：'.$sql;
		}else{
			$rowList=mysqli_fetch_all($result,MYSQLI_ASSOC);
			return json_encode($rowList);
		}
	}

	/*注册验证*/
	function sql_registerCheck($sql){
		global $conn;
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_assoc($result);
		if($result&&$row!=null)
			return 0;
		else
			return 1;
	}

	/*注册操作*/
	function sql_register($sql){
		global $conn;
		$result=mysqli_query($conn,$sql);
		if($result)
			return 1;
		else
			return '查询失败！请检查sql语句：'.$sql;
	}