$("#header").load("../data/header.php");//加载头部
$("#footer").load("../data/footer.php");//加载页尾
			//var expand=document.querySelector("li.expand");
			//expand.onmouseover=function(){
			//	document.querySelector("div.more").style.display="block";
			//}
			//document.querySelector("div.more").onmouseover=function(){
			//	document.querySelector("div.more").style.display="block";
			//}
			//document.querySelector("div.more").onmouseout=function(){
			//	document.querySelector("div.more").style.display="";
			//}
			//expand.onmouseout=function(){
			//	document.querySelector("div.more").style.display="";
			//}
/****************************************slide***********************************************************/
			var inner1="色达实用攻略大全";
			var inner2="#带着挖财去旅行#会上瘾的蓝色，菲律宾火山萤火跳岛游";
			var inner3="不丹旅游吃喝玩乐全攻略";
			var inner4="#杭州建德#如梦似幻，寻找17℃的夏天";
		$("div.bannerSlide ul li").click(function(){
			var n = $(this).index()+1;
				if(n==1){
					$("div.bannerSlide h1").html(inner1);
				}
				if(n==2){
					$("div.bannerSlide h1").html(inner2);
				}
				if(n==3){
					$("div.bannerSlide h1").html(inner3);
				}
				if(n==4){
					$("div.bannerSlide h1").html(inner4);
				}
				for(var m=1;m<5;m++){
					$("div.bannerSlide").removeClass("bannerSlide"+m);
				}
				$("div.bannerSlide").addClass("bannerSlide"+n);
		
		})
		var t =0
		var timer=setInterval(function(){
			t++;
			if(t==5){
				t=1;
			}
			if(t==1){
				$("div.bannerSlide h1").html(inner1);
			}
			if(t==2){
				$("div.bannerSlide h1").html(inner2);
			}
			if(t==3){
				$("div.bannerSlide h1").html(inner3);
			}
			if(t==4){
				$("div.bannerSlide h1").html(inner4);
			}
			for(var m=1;m<5;m++){
				$("div.bannerSlide").removeClass("bannerSlide"+m);
			}
			$("div.bannerSlide").addClass("bannerSlide"+t);
		},5000)
		/****************************达人玩法下拉菜单********************************************/
	$("div.firstpic,div.first").mouseover(function(){
		$("div.firstpic div.info").css({
			"height":"90px",
			"opacity":"0",
			"transition":"all .2s linear"
		})
		$("div.first").css({
			"height":"318px",
			"opacity":"1",
			"transition":"all .3s linear"
		})
	});
	$("div.firstpic,div.first").mouseout(function(){
		$("div.firstpic div.info").css({
			"height":"69px",
			"opacity":"1",
			"transition":"all .5s linear"
		});
		$("div.first").css({
			"height":"0px",
			"opacity":"0",
			"transition":"all .3s linear"
		})
	});
	$("div.secondpic,div.second").mouseover(function(){
		$("div.secondpic div.info").css({
			"height":"90px",
			"opacity":"0",
			"transition":"all .2s linear"
		})
		$("div.second").css({
			"height":"318px",
			"opacity":"1",
			"transition":"all .3s linear"
		})
	});
	$("div.secondpic,div.second").mouseout(function(){
		$("div.secondpic div.info").css({
			"height":"69px",
			"opacity":"1",
			"transition":"all .5s linear"
		});
		$("div.second").css({
			"height":"0px",
			"opacity":"0",
			"transition":"all .3s linear"
		})
	})
	$("div.thirdpic,div.third").mouseover(function(){
		$("div.thirdpic div.info").css({
			"height":"90px",
			"opacity":"0",
			"transition":"all .2s linear"
		})
		$("div.third").css({
			"height":"318px",
			"opacity":"1",
			"transition":"all .3s linear"
		})
	});
	$("div.thirdpic,div.third").mouseout(function(){
		$("div.thirdpic div.info").css({
			"height":"69px",
			"opacity":"1",
			"transition":"all .5s linear"
		});
		$("div.third").css({
			"height":"0px",
			"opacity":"0",
			"transition":"all .3s linear"
		})
	})
	/************************地址的选择***************************************************************/
	$("div.addtitle ul li").mouseover(function(){
			var i = $(this).index()+1;
			$("div.addmain:nth-child("+i+")").css("display","block");
			$("div.addmain:nth-child("+i+")").siblings().css("display","none");
		})
	/************************************************推荐攻略****************************************************************/
	$(function(){
			$.ajax({
				type:"GET",
				url:"../data/08-gonglue.php",
				success:function(data){
					var ul="";
					for(var p=0;p<18;p++){
						var number=Math.ceil((Math.random()*10000+10000));
						ul+=`
							<ul>
								<li>
									<a href="${data[p].src}"><img src="../${data[p].img}" width="280px" height="157.5px" alt=""></a>
									<div class="detail">
										<p>${data[p].title}</p>
										<p class="history">
											<img src="../images/08-gonglue/2a4576e6ea09bac20225e74e101aecb1_w90_h90_c1_t0.png" alt="" height="34px">
											Username
											<span class="look">${number}人浏览</span>
										</p>
									</div>
								</li>
							</ul>
						`
					}
					$("div.recommend").html(ul);
					var i=0;
					$("div.recommend ul").slice(0, 18).css("display","none");
					$("div.recommend ul").slice(0, 6).css("display","block");
					$("div.guild>a").click(function(){
						i++;
						$("div.recommend ul").slice(0, 6).fadeOut(500);
						$("div.recommend ul").slice(0, 18).css("display","none");
						$("div.recommend ul").slice(6*i, 6*(i+1)).fadeIn(500);
						$("div.recommend ul").slice(6*i, 6*(i+1)).css("display","block");
						if(i==2){
							i=-1;
						}
					})	
				},
				error:function(){
					console.log("error");
				}
			});
	/************************************超值特卖******************************************/
	$(function(){
			$.ajax({
				type:"GET",
				url:"../data/08-gonglue2.php",
				success:function(data){
					var div="";
					for(var s=0;s<24;s++){
						div+=`
						<a href="${data[s].src}">
							<div class="special">
								<div class="soldTitle">${data[s].classify}</div>
								<img src="../${data[s].img}" width="370px" height="210px">
								<div class="soldTail">
									<p>${data[s].title}</p>
									<div class="soldPrice">
										<p>
											￥<span>${data[s].price}元</span> 起
											<button type="submit">立即抢购</button>
										</p>
									</div>
								</div>
							</div>
						</a>
						`
					}
					$("div.sortMain").html(div);
					$("div.sortMain>a").slice(3,24).css("display","none");
					$("div.soldMain ul li").mouseover(function(){
					var sNumber=$(this).index()+1;
						$("div.sortMain>a").slice(0, 3).fadeOut(500);
						$("div.sortMain>a").slice(0, 24).css("display","none");
						$("div.sortMain>a").slice(sNumber*3-3, sNumber*3).fadeIn(500);
						$("div.sortMain>a").slice(sNumber*3-3, sNumber*3).css("display","block");
					})
				},
				error:function(){
					console.log("error");
				}
			});
	})
	/*******************************************游记和榜单***************************************************************/
			$.ajax({
				type:"GET",
				url:"../data/08-gonglue.php",
				success:function(data){
					var a="";
					for(var p=18;p<36;p++){
						var number=Math.ceil((Math.random()*10000+10000));
						var pNumber=Math.ceil((Math.random()*10+1));
						a+=`
							<a href="">
								<div class="item">
								<img src="../${data[p].img}" alt="">
								<p>${data[p].title}</p>
								<p>${data[p].span}</p>
								<p>${pNumber}个目的地 <span style="float:right;color:#a2a2a2">${number}人浏览</span></p>
								</div>
							</a>
						`
					}
					$("div.main").html(a);
					var m=0;
					$("div.main>a").slice(0, 18).css("display","none");
					$("div.main>a").slice(0, 6).css("display","block");
					$("div.travelmain a.change").click(function(){
						m++;
						$("div.main>a").slice(0, 6).fadeOut(500);
						$("div.main>a").slice(0, 18).css("display","none");
						$("div.main>a").slice(6*m, 6*(m+1)).fadeIn(500);
						$("div.main>a").slice(6*m, 6*(m+1)).css("display","block");
						if(m==2){
							m=-1;
						}
					})
				},
				error:function(){
					console.log("error");
				}
			});
	})
