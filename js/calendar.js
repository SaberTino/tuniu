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
		let calendar=document.getElementById("calendar");//入住
		
		let titleBox=document.createElement("div");//创建标题模块
		let bodyBox=document.createElement("div");//创建显示日期的模块

		//往日历中添加标题
		titleBox.className="calendar-title-box";
		titleBox.innerHTML="<span class='prev-month' id='prevMonth'></span>" +
		"<span class='calendar-title' id='calendarTitle'></span>" +
		"<span id='nextMonth' class='next-month'></span>";
		calendar.appendChild(titleBox);

		//往日历区里添加显示区
		bodyBox.className="calendar-body-head";
		let _headHtml="<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
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
	};
	document.getElementById("nextMonth").onclick=function(){
		let date=dateObj.getDate();
		dateObj.setDate(new Date(date.getFullYear(),date.getMonth()+1,date.getDate()));
		show();
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
				let arr=cal.split("-");
				arr.pop(arr.length-1);
				let newCal=`${arr.join("-")}-${day}`;
				calendarTitle.innerText=newCal;//日历头部更新信息
				td.classList.add("choose");//添加选中属性
				let otherTd=td.parentNode.childNodes;
				let weekday=document.getElementById("calendar").nextElementSibling;
				for(let i= 0,len=otherTd.length;i<len;i++){
					if(otherTd[i].innerText==td.innerText){
						weekday.innerText=getWeekDay(i);
						break;
					}
				}
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
 *获取星期几
 */
function getWeekDay(index){
	let weekDay="";
	switch(index){
		case 0:weekDay="星期日";break;
		case 1:weekDay="星期一";break;
		case 2:weekDay="星期二";break;
		case 3:weekDay="星期三";break;
		case 4:weekDay="星期四";break;
		case 5:weekDay="星期五";break;
		case 6:weekDay="星期六";break;
	}
	return weekDay;
}

/**
*点击生成入住日历
*/
$((()=>{
	let $calendar=$("#calendar");
	let $calendarTitle=$("#calendarTitle");
	let $goTime=$("#goTime");
	let $weekday=$calendar.next();
	let now=new Date();
	$goTime.val(getDateStr(now));
	$weekday.text(getWeekDay(now.getDay()));
	$(document).on("click",()=>{
		$calendar.hide();
	});
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
/**
*点击生成退房日历
*/

$((()=>{
	let $calendar=$("#calendar2");
	let $calendarTitle=$("#calendarTitle");
	let $goTime=$("#goTime2");
	let $weekday=$calendar.next();
	let now=new Date();
	$goTime.val(getDateStr(now));
	$weekday.text(getWeekDay(now.getDay()));
	$(document).on("click",()=>{
		$calendar.hide();
	});
	$("#goTime2").click(e=>{
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





