//验证码
var msg="";
function cav(){
	var w=70, h=35;
	c3.width=w;
	c3.height=h;
	var ctx = c3.getContext("2d");
	function rn(min,max){
		var n =Math.random()*(max-min)+min;
		return Math.floor(n);
	}
	function rc(min,max){
		var r = g = b = rn(min,max);
		return `rgb(${r},${g},${b})`;
	}
	ctx.fillStyle=rc(200,230);
	ctx.fillRect(0,0,w,h);
	var pool="ABCDEFGHIJKLMNabcdefghijkmn0123456789";
	var str="";
	for(var i=0;i<4;i++){
		var index=Math.floor(Math.random()*pool.length);
		str += pool[index];
	}
	msg=str;
	ctx.font="30px SimHei";
	ctx.fillStyle=rc(100,180);
	ctx.textBaseline="top";
	ctx.fillText(str,0,0);

	for(var i=0;i<6;i++){
		ctx.strokeStyle=rc(0,255);
		ctx.beginPath();
		ctx.moveTo(rn(0,w),rn(0,h))
		ctx.lineTo(rn(0,w),rn(0,h))
		ctx.stroke();
	}
	for(var j=0;j<50;j++){
		ctx.fillStyle=rc(0,255);
		ctx.beginPath();
		ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
		ctx.fill();
	}
}
cav();
$("#change").click(function(){
	cav();
})


//账号密码验证
$(function(){		
	$("#submit").click(function(){
		var uname=$("#uname").val();
		var upwd=$("#upwd").val();
		var show=$(".kong span");
		var code=$(".verify input").val();
			$.ajax({
				type:"GET",
				url:"../data/00-login.php",
				data:{uname:uname,upwd:upwd},
				success:function(data){
					if(uname==""){
						show.html("请输入用户名").parent().css("visibility","visible");
					}else if(upwd==""){
						show.html("请输入密码").parent().css("visibility","visible");
					}else if(code==""){
						show.html("请输入验证码").parent().css("visibility","visible");
					}else if(code.toLowerCase()!=msg.toLowerCase()){
						show.html("验证码不正确").parent().css("visibility","visible");
					}else if(data!="1"){
						show.html("用户名/密码不正确").parent().css("visibility","visible");
					}else if(data=="1"){
						location="skin.html";
						sessionStorage.setItem("uname",uname);
					}				
				},
				error:function(){
					console.log("err");
				}
			})		
	})
}) 

/* 判断用户名 密码是否为空 */
var kong=$(".kong");
function check_uname(){
	var uname=$("#uname").val();
	if(uname!="")
		kong.css("visibility","hidden");
}
function check_upwd(){
	var upwd=$("#upwd").val();
	if(upwd!="")
		kong.css("visibility","hidden");
}
function check_code(){
	var code=$(".verify input").val();
	if(code!="")
		kong.css("visibility","hidden");
}


