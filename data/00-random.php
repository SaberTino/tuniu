<?php
	$a=rand(0,61);
	$b=rand(0,61);
	$c=rand(0,61);
	$d=rand(0,61);
	$array=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	function rn($n){
		return $array[$n];
	}
	echo $array[$a],$array[$b],$array[$c],$array[$d];