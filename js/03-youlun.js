$("#header").load("../data/header.php");//加载头部
$("#footer").load("../data/footer.php");//加载页尾
//轮播图片 banner
(()=>{
	$.ajax({
		type:"GET",
		url:"../data/00-dataInquiry.php",
        data:{table:"00_tn_banner",classify:3},
		success:function(data){
			//console.dir(data);
			//console.log(JSON.parse(data));

			var html="";
			for(var p of data){
			    html+=`
				    <li>
						<a href="404.html">
							<img src="../${p.src}" alt=""/>
						</a>
					</li>	
				`;
			}
			$("[data-img=move]").html(html);
			var WIDTH=1920;
			//console.log(WIDTH);
			var li=$("[data-img=move]>li:first").html();
			//console.log($("[data-img=move]"));
			$("[data-img=move]").append(`<li>${li}</li>`);
			var n=$("#banner .imag").children().length;
			//console.log(n);
			$("[data-img=move]").css("width",n*WIDTH);
			$("[data-load=point]").children().eq(0).addClass("banner_hover");
			//console.log(n);
			var i=0;
			function tes(){
				i++;		
				$("[data-img=move]").css("left",-WIDTH*i);
				$("[data-load=point]").children().eq(i).addClass("banner_hover");
				$("[data-load=point]").children().eq(i-1).removeClass("banner_hover");
				$("[data-img=move]").css("transition","all .3s linear");
				if(i==n-1){
					$("[date-img=move]").css("transition","");
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
		},
		error:function(){
			alert("网络故障");
		}
	});
    

})();
/////////////////////////////////////////////////////
/**
*右侧模块自定义日历
*/
$((()=>{
	/**
	*定义一个对象，用于记录，获取并设置显示日期
	*/
	let dateObj=(function(){
		let _date=new Date();
		return {
			getDate:function(){
				return _date;
			},
			setDate:function(date){
				_date=date;
			}
		};
	})();
	renderHTML();
	show();

	/**
	*渲染calender中的HTML
	*/
	function renderHTML(){
		let calendar=document.getElementById("calendar");
		let titleBox=document.createElement("div");//创建标题模块
		let bodyBox=document.createElement("div");//创建显示日期的模块

		//往日历中添加标题
		titleBox.className="calendar-title-box";
		titleBox.innerHTML="<span class='prev-month' id='prevMonth'></span>" +
		"<div class='calendar-title' id='calendarTitle'></div>" +
		"<span id='nextMonth' class='next-month'></span>";
		calendar.appendChild(titleBox);
		//往日历区里添加显示区
		bodyBox.className="calendar-body-head";
		let _headHtml="<tr><th>星期日</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th></tr>";
		let _bodyHtml="";
			//因为一个月最多31天，加上前一个月留的和下个月开头，总共一个月最多占6行
		for(let i=0;i<6;i++){
			_bodyHtml+="<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
		}
		bodyBox.innerHTML=`<table id="calendarTable" class="calendar-table">${_headHtml}${_bodyHtml}</table>`;
		calendar.appendChild(bodyBox);
	}

	/**
	 *表格中显示显示数据，并设置类名
	 */
	function show(){
		let calendarTitle=document.getElementById("calendarTitle");
		let _year=dateObj.getDate().getFullYear();//获得年份
		let _month=dateObj.getDate().getMonth()+1;//月份，函数获得的是月份减一，因为从0开始
		let _date=dateObj.getDate().getDate();//几号
		let _day=dateObj.getDate().getDay();//星期几
		

		//设置日历顶部日期
		let _dateStr=getDateStr(dateObj.getDate());
		calendarTitle.innerText=_dateStr;
		month=_dateStr.split("-")[1];
		document.getElementById("month").innerHTML=`${month}月`;
		//设置表格中的日期数据
		let _table=document.getElementById("calendarTable");
		let _tds=_table.getElementsByTagName("td");
		let _firstDay=new Date(_year,_month-1,1);//获取当前月的第一天
		for(let i= 0,len=_tds.length;i<len;i++){
			//首先获得第一天星期几之后，也就是说，这个星期几就是距离星期一的位置，但是，开头为星期天，所以
			//要将位置+1，才是从开头开始计算日期
			let _thisDay=new Date(_year,_month-1,i+1-_firstDay.getDay());
			let _thisDayStr=getDateStr(_thisDay);
			_tds[i].innerText=_thisDay.getDate();
			if(_thisDayStr==getDateStr(new Date())){
				_tds[i].className="currentDay";//当前天
			}else if(_thisDayStr.slice(0,7)==getDateStr(_firstDay).slice(0,7)){
				_tds[i].className="currentMonth";//非当前月
			}else{
				_tds[i].className="otherMonth";//当前页
			}
		}
	}
	//点击  当前日期 则返回当前日期    
	document.getElementById("current").onclick=function(){
		let date=new Date;
		let aaaa=getDateStr(date).split("-");
		//console.log(aaaa);
		let calendarTitle=document.getElementById("calendarTitle");
		let _year=aaaa[0];//获得年份
		let _month=aaaa[1];//月份，函数获得的是月份减一，因为从0开始
		//console.log(_month);
		let _date=aaaa[2];//几号
		let _day=date.getDay();//星期几
		console.log( _day);
		//设置日历顶部日期
		
		document.getElementById("calendarTitle").innerHTML=`${_year}-${_month}-${_date}`;
		document.getElementById("month").innerHTML=`${_month}月`;
		//设置表格中的日期数据
		let _table=document.getElementById("calendarTable");
		let _tds=_table.getElementsByTagName("td");
		let _firstDay=new Date(_year,_month-1,1);//获取当前月的第一天
		for(let i= 0,len=_tds.length;i<len;i++){
			//首先获得第一天星期几之后，也就是说，这个星期几就是距离星期一的位置，但是，开头为星期天，所以
			//要将位置+1，才是从开头开始计算日期
			let _thisDay=new Date(_year,_month-1,i+1-_firstDay.getDay());
			let _thisDayStr=getDateStr(_thisDay);
			_tds[i].innerText=_thisDay.getDate();
			if(_thisDayStr==getDateStr(new Date())){
				_tds[i].className="currentDay";//当前天
			}else if(_thisDayStr.slice(0,7)==getDateStr(_firstDay).slice(0,7)){
				_tds[i].className="currentMonth";//非当前月
			}else{
				_tds[i].className="otherMonth";//当前页
			}
		}
	}

	
	/*
	*为上下月份增加点击事件
	*/

	document.getElementById("prevMonth").onclick=()=>{
		let date=dateObj.getDate();
		dateObj.setDate(new Date(date.getFullYear(),date.getMonth()-1,date.getDate()));
		show();
		month=document.getElementById("calendarTitle").innerHTML.split("-")[1];
		document.getElementById("month").innerHTML=`${month}月`;
	};
	document.getElementById("nextMonth").onclick=function(){
		let date=dateObj.getDate();
		dateObj.setDate(new Date(date.getFullYear(),date.getMonth()+1,date.getDate()));
		show();
		month=document.getElementById("calendarTitle").innerHTML.split("-")[1];
		document.getElementById("month").innerHTML=`${month}月`;
	};

	/*
	*为下面的显示区添加绑定事件，添加属性(利用事件冒泡减少监听个数)
	*/
	document.getElementById("calendarTable").onclick=e=>{
		let td=e.target;	
		let notChoose=document.querySelectorAll("td.choose");
		if(e.target.nodeName=="TD"){			
			if(td.className!="otherMonth"){
				let day=(parseInt(td.innerText)>=10)? td.innerText:`0${td.innerText}`;
				let calendarTitle=document.getElementById("calendarTitle");
				let cal=calendarTitle.innerText;
				arr=cal.split("-");
				arr.pop(arr.length-1);
				let newCal=`${arr[0]}-${arr[1]}-${day}`;
				calendarTitle.innerText=newCal;//日历头部更新信息
			}
		}
		for(let i=0;i<notChoose.length;i++){
				if(notChoose[i].classList.contains("choose")){
					notChoose[i].classList.remove("choose");
					if(notChoose[i].innerText==td.innerText){
						notChoose[i].classList.remove("choose");//清空选中之外和当前天的td中的choose
					}
				}
		}

	};
})());



/**
 *将日期字符串转为规定格式
 */
function getDateStr(date){
	let y=date.getFullYear();
	let m=date.getMonth()+1;
	let d=date.getDate();
	m=(m>=10)?m:`0${m}`;
	d=(d>=10)?d:`0${d}`;
	return `${y}-${m}-${d}`;
}
/**
*点击生成日历
*/
$((()=>{
	let $calendar=$("#calendar");
	let $calendarTitle=$("#calendarTitle");
	let $goTime=$("#goTime");
	let $weekday=$calendar.next();
	let now=new Date();
	$goTime.val(getDateStr(now));
	$("#goTime").click(e=>{
		e.stopPropagation();//必须阻止冒泡，否则会触发document上的点击事件
		$calendar.show();
	}).next().on("click",e=>{
		e.stopPropagation();//必须阻止冒泡，否则会触发document上的点击事件
		$calendar.show();
		if(e.target.nodeName=="TD"){
			$goTime.val($calendarTitle.text());
		}
	});
})());

//////////////////////////////////////////////////

function  content(title,url){
	$.ajax({
		type:"GET",
		url:"../data/00-dataInquiry.php",
		data:{table:"03_loose",classify:title},
		success:function(data){
			//var arr=JSON.parse(data);
			var arr=data;
			var html="";
					html+=`<div><div>
						<a href="404.html">
							<img src="../${arr[0].src}" alt="">
						</a>
					</div></div>`;
					for(var i=1;i<data.length;i++){
						html+=`
								<ul>
					<li>
						<a href="${arr[i].href}">放松之旅</a>
					</li>
					<li>
						<p>满意度：${arr[i].satisfaction}</p>
						<p>出发城市：${arr[i].city}</p>
					</li>				
					<li>
						<a href="404.html">
							<img src="../${arr[i].src}" alt="">
						</a>
					</li>
					<li>
						￥${arr[i].price}
					</li>
					<li>
						<a href="${arr[i].href}">${arr[i].title}</a>
					</li>
				</ul>
						`;
					}
			
			//console.log(html);
			url.html(html);
		},
		error:function(){
			alert("网络故障");
		}
	});
}

//邮轮日本航线    图片加载
content("途牛包船",$("#japan .content_one"));

//邮轮国内航线    图片加载
content("欧洲·地中海",$("#ocean .content_one"));
content("东南亚",$("#ocean .content_two"));
content("欧洲游轮",$("#ocean .content_three"));
content("远洋船票",$("#ocean .content_four"));
content("美洲·加勒比海",$("#ocean .content_five"));
content("澳新·中东·极地",$("#ocean .content_six"));

//邮轮国内航线    图片加载
content("特别推荐",$("#internal .content_one"));


function contentTwo(nav,url){
		$.ajax({
			type:"GET",
			url:"../data/00-dataInquiry.php",
			data:{table:"03_loose",classify:nav},
			success:function(data){
				//console.log(data);
				var html="";
				for(var p of data){
					html+=`
						<ul>
					<li>
						<a href="${p.href}">放松之旅</a>
					</li>
					<li>
						<p>满意度：${p.satisfaction}</p>
						<p>出发城市：${p.city}</p>
					</li>				
					<li>
						<a href="${p.href}">
							<img src="../${p.src}" alt="">
						</a>
					</li>
					<li>
						￥${p.price}
					</li>
					<li>
						<a href="${p.href}">${p.title}</a>
					</li>
				</ul>
					`;
				}
				url.append(html);
				//console.log(html);
			},
			error:function(){
				alert("网络故障");
			}
		});
	}

//邮轮爆款推荐    图片加载
contentTwo("爆款推荐",$("#recom"));


//邮轮日本航线    图片加载
contentTwo("歌诗达",$("#japan .content_two"));
contentTwo("皇家加勒比",$("#japan .content_three"));
contentTwo("公主",$("#japan .content_four"));
contentTwo("诺唯真",$("#japan .content_five"));
contentTwo("天海&丽星",$("#japan .content_six"));
//邮轮国内航线    图片加载
contentTwo("全年预售",$("#internal .content_two"));
contentTwo("世纪&黄金游轮",$("#internal .content_three"));
contentTwo("暑期优选",$("#internal .content_four"));


//邮轮日本航线   点击事件




//邮轮远洋航线   点击事件

//邮轮国内航线   点击事件

	
	$("#japan .nav  ul li").eq(0).addClass("hover");
	$("#ocean .nav  ul li").eq(0).addClass("hover");
	$("#internal .nav  ul li").eq(0).addClass("hover");
	$("#japan .nav  ul li").eq(0).children().addClass("hoverColor");
	$("#ocean .nav  ul li").eq(0).children().addClass("hoverColor");
	$("#internal .nav  ul li").eq(0).children().addClass("hoverColor");
	function lickAll(div,nav,li){
		nav.on("click","li",function(){
			console.log(11111);
			let i=$(this).index();
			div.hide();
			div.eq(i).show();
			li.removeClass("hover");
			li.eq(i).addClass("hover");
			li.children().removeClass("hoverColor");
			li.eq(i).children().addClass("hoverColor");
		});
	}

	lickAll($("#japan>div"),$("#japan .nav"),$("#japan .nav  ul li"));
	lickAll($("#ocean>div"),$("#ocean .nav"),$("#ocean .nav  ul li"));
	lickAll($("#internal>div"),$("#internal .nav"),$("#internal .nav  ul li"));



	//邮轮游轮公司   点击事件

	$("#company div").on("mousemove",".ul",function(){
		$(this).children().children().last().css("top",160);
		$(this).children().children().last().css("transition","all .3s linear");
		$(this).children().children().last().css("height",200);
	}).on("mouseout",".ul",function(){
		$(this).children().children().last().css("top",260);
		$(this).children().children().last().css("transition","all .3s linear");
		$(this).children().children().last().css("height",100);
	})

	$("#box .clear").on("click","li",function(){
		
		$(this).siblings().removeClass("kalendar");
		$(this).addClass("kalendar");
	})