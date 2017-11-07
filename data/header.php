<?php
header("Content-Type:text/html;charset=UTF-8");
?>
<div id="header_box">
		<!-- 头部第一部分-->
		<div class="header">
			<ul class="header_ul">
				<li class="header_list1">
					<a href="login.html">登录</a>
					<span>|</span>
					<a href="register.html">注册</a>
					<img src="../images/registgift.gif">
				</li>
			</ul>
			<ul class="header_ul2 ">
				<li>
					<a href="#">途牛招聘</a>
				</li>
				<li>
					<a href="#">严选商城</a>
				</li>
				<li>
					<a href="#">企业频道</a>
				</li>
				<li>
					<a href="#">会员俱乐部</a>
				</li>
				<li>
					<a href="#">我的订单</a>
				</li>
				<li>
					<a href="#">网站地图</a>
				</li>
				<li>
					<!--<img src="../images/logo0127.png"/>-->
				</li>
			</ul>
   		</div>
		<!-- 头部第二部分-->
    	<div id="logo" >
        	<div class="logo_1">
				<img src="../images/logo0127.png"/>
			</div>
			<div class="site">
				<div>
					<a href="#">杭州站</a>
				</div>
				<img src="../images/local_branch.png"/>
			</div>
			<div class="search_box">
				<div class="btn1">
					<span>
					所有产品
						</span>
				</div>
				<div class="btn2">
					<input type="text" value="马尔代夫" name="search">
					<ul class="search-result">
						<!-- 后台动态生成 -->
					</ul>
				</div>
				<div class="btn3">
					<a href="#">美国</a>
					<a href="#">三亚</a>
				</div>
				<div class="btn4">
					<a href="#">
						<img src="../images/search.png"/>
					</a>
				</div>
			</div>
			<div class="seek">
				<a href="#">高级搜索</a>
			</div>
			<div class="service_box">
				<a>欢迎使用</a><br/>
				<a>在线客服</a>
				<a class="service_3" href="">24h客服服务电话</a><br/>
				<img src="../images/tel.png" alt="">
				<span>4007-999-999</span>
			</div>
    	</div>
		 <!--头部第三部分-&#45;&#45;面包屑导航-->
		<div id="nav1">
			<ul>
				<li>
					<a href="../index.html">首页</a>
				</li>
				<li>
					<a href="02-zizhuyou.html">自助游</a>
				</li>
				<li>
					<a href="03-youlun.html">邮轮</a>
				</li>
				<li>
					<a href="04-jipiao.html">机票</a>
				</li>
				<li>
					<a href="05-jiudian.html">酒店</a>
				</li>
				<li>
					<a href="06-menpiao.html">门票</a>
				</li>
				<li>
					<a href="07-hunsha.html">出游服务</a>
				</li>
				<li>
					<a href="08-gonglue.html">攻略</a>
				</li>
				<li>
					<a href="team.html">团队风采</a>
				</li>
			</ul>
		</div>
	</div>

	<script>
		var uname=sessionStorage.getItem("uname");
		if(uname){
			$(".header_list1").html(`您好：${uname} <a href="html/login.html" id="logout">退出</a>`);
			$("#logout").click(function(){
				sessionStorage.removeItem("uname");
			})
		}
	</script>