$("#header").load("../data/header.php");//加载头部
$("#footer").load("../data/footer.php");//加载页尾
//轮播图片 banner
(()=>{
	var WIDTH=1920;
	var li=$("[data-img=move]>li:first").html();
	$("[data-img=move]").append(`<li>${li}</li>`);
	var n=$("#banner .imag").children().length;
	$("[data-img=move]").css("width",n*WIDTH);
	$("[data-load=point]").children().eq(0).addClass("banner_hover");
	var i=0;
	function tes(){
		i++;		
		$("[data-img=move]").css("left",-WIDTH*i);
		$("[data-load=point]").children().eq(i).addClass("banner_hover");
		$("[data-load=point]").children().eq(i-1).removeClass("banner_hover");
		if(i==n-1){
			$("[data-img=move]").css("left",0);
			$("[data-load=point]").children().eq(0).addClass("banner_hover");
			i=0;
		}
		return i;
	}
	var timer=setInterval(tes,3000);
	$("[data-img=move]").parent().mouseover(function(){
		clearInterval(timer);
		timer=null;
	}).mouseout(function(){
		timer=setInterval(tes,3000);
	})
	
	$("[data-load=point]").on("click","li",function(){
			let k=$(this).index();
			console.log(k);
			$("[data-img=move]").css("left",-WIDTH*k);
			$("[data-load=point]").children().removeClass("banner_hover");
			$(this).addClass("banner_hover");
		
	})
})();


//点击列表实现内容生成
$("#ticket>ul>li:eq(0)>div").show();
$("#ticket>ul>li:eq(0)>p").css("background","#898989");
$("#ticket>ul>li").on("click","p",function(){
	let i=$(this).parent().index();
	if(i==2||i==4||i==7){
		$("#ticket>ul>li>div").css("display","");
		$("#ticket>ul>li>p").css("background","");
		$("#ticket>ul>li:eq(0)>div").show();
		$(this).css("background","#898989");
		//console.log(i);
	}else{
		$("#ticket>ul>li>div").css("display","");
		$("#ticket>ul>li>p").css("background","");
		$(this).next().next().show();
		$(this).css("background","#898989");
	}

})
$(".city_click").on("click","a",function(e){
	let i=$(this).parent().index();
	if(i==0){
		$(".table").toggle();
		$(".table").css("top", 35);
		$(".table").css("color", "#25ABCD");
		
	}else
	if(i==1){
		$(".table").toggle();
		$(".table").css("top", 82);
		$(".table").css("color", "#25ABCD");
	}
	return i;
})
//点击地区框里的城市，信息出现在输入框里面
$(".table tbody tr").on("click","td",function() {
	var arr=$(this).parent().parent().parent().position().top;
        //console.log(parseInt(arr));
	if(parseInt(arr)<65){
		$(".table tbody tr td").css("color","");
		$(".city_click li:eq(0) input").val($(this).html());
		$(this).css("color","#FF5722");
	}else{
		$(".table tbody tr td").css("color","");
		$(".city_click li:eq(1) input").val($(this).html());
		$(this).css("color","#FF5722");
	}
})
//点击城市框，内容信息出来
$(".city_click").next().on("click","li",function(){
	$(this).css("background-position","-142px -60px ");		
	let start=    $(".city_click li:eq(0) input").val();
	let end=    $(".city_click li:eq(1) input").val();
	$(".city_click li:eq(0) input").val(end);
	$(".city_click li:eq(1) input").val(start);
	setTimeout((e)=>{
		$(this).css("background-position","-142px 0px ");
	},500);
})
//点击地区的内的×，信息隐藏
$(".table thead tr").on("click","td",function(){
	let html=$(this).html();
	if(html=="×"){
		$(".table").hide();
	}

})
//移出地区的内容，信息隐藏
$(".table").mouseleave(function(){
	$(this).hide();
});
//默认的航班信息
function city(start_city,end_city){
	$.ajax({
		type:'GET',
		url:'../data/04-jipiao.php',
		data:{start_city:start_city,end_city:end_city},
		success:function(data){
			var html="";
			//console.log(data);
			for(var p of data){
				html+=`
					<ul class="clear">
						<li class="clear">
					        <img src="${p.src}" alt="">
							<div>
								<p>${p.flight}</p>
								<p>ZH1805</p>
							</div>
						</li>
						<li class="clear">
							<div>${p.start_time}</div>
							<p>${p.start_city}</p>
						</li>
						<li>
							<p>${p.all_time}</p>
							<div></div>
						</li>
						<li class="clear">
							<div>${p.end_time}</div>
							<p>${p.end_city}</p>
						</li>
						<li>${p.punctual}</li>
						<li>￥${p.price}.00</li>
						<li>购买</li>
					</ul>	
				`;
			}
			//console.log(html);
			$("#plane").append(html);
		},
		error:function(){
			alert("网络故障");
		}
	})
}
city("武汉","重庆");
//点击搜索，飞机航班信息生成
$("#ticket #content-1>ul:nth-child(2)>li:last-child").on("click","a",function(){
	$("#plane").html("");
	$(this).css("background-position","0 0");
	setTimeout((e)=>{
		$(this).css("background-position","0 -41px");
	},500);
	let start_city=$(".city_click li:eq(0) input").val();
	let end_city=$(".city_click li:eq(1) input").val();
	//console.log(start_city);
	//console.log(end_city);	
    city(start_city,end_city);	
})
//日历生成
$(".birth").datepicker({
			changeYear: true,
			changeMonth: true,
			dateFormat: "yy年mm月dd日",
			monthNamesShort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
			dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六" ]
		});
//当天的日期生成
function date(){
	var date=new Date;
	let year=date.getFullYear();
	let month=date.getMonth()+1;
	let day=date.getDate();
	//console.log(day);
	let day2=date.getDate()+2;
	$(" .kalendar>li:first-child>input").val(year+"年"+month+"月"+day+"日");
	$(" .kalendar>li:last-child>input").val(year+"年"+month+"月"+day2+"日");    
}
date();
$("#content-1>ul:nth-child(1)>li:nth-child(1)").css("border-bottom"," 2px solid #00AFC7");
$("#content-1>ul:nth-child(1)>li:nth-child(1)").on("click","a",function(){
	$("#content-1>ul:nth-child(1)>li").css("border-bottom","");
	$("#content-1>ul:nth-child(1)>li:nth-child(1)").css("border-bottom"," 2px solid #00AFC7");
})
$("#content-1>ul:nth-child(1)>li:nth-child(2)").on("click","a",function(){
	$("#content-1>ul:nth-child(1)>li").css("border-bottom","");
	$("#content-1>ul:nth-child(1)>li:nth-child(2)").css("border-bottom"," 2px solid #00AFC7");
	//console.log(111);
})

//机票图片及数据下载
$.ajax({
			type:"GET",
			url:"../data/00-dataInquiry.php",
			data:{table:"plane_view",classify:"立即预定"},
			success:function(data){
				//console.log(data);
				var html="";
				for(var p of data){
					html+=`				
						<ul class="clear">
							<li>
								<img src="${p.src}" alt="">
								<div>${p.city}</div>
							</li>
							<li>
								<div>${p.title}</div>
								<div>${p.price}</div>
								<div>${p.classify}</div>
							</li>
						</ul>
					`;
				}
				$("#inform").append(html);
				//console.log(html);
			},
			error:function(){
				alert("网络故障");
			}
		});



function contentTwo(nav){
		$.ajax({
			type:"GET",
			url:"../data/00-dataInquiry.php",
			data:{table:"03_loose",classify:nav},
			success:function(data){
				//console.log(data);
				var html="";
				for(var p of data){
					html+=`				
					<li>
						<a href="${p.href}">
							<img src="../${p.src}" alt="">
						</a>
					</li>
					`;
				}
				$("#scen>ul").append(html);
				//console.log($("#scen").html());
			},
			error:function(){
				alert("网络故障");
			}
		});
	}

//邮轮爆款推荐    图片加载
contentTwo("皇家加勒比");
