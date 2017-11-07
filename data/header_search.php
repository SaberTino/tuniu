<?php
  header("Content-Type:application/json;charset=utf-8");
  require_once("00-init.php");
  $kw=$_REQUEST["kw"];
  $sql="SELECT title FROM 02_city_business WHERE title LIKE '%$kw%'";
  echo json_encode(sql_execute($sql)); 
?>