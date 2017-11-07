$("#header").load("../data/header.php");//加载头部
$("#footer").load("../data/footer.php");//加载页尾
//左边导航推荐,鼠标悬停状态切换（display:none--->dispaly:block）
$(".leftCont>ul>li:first-child").hover(function(){
	$(".leftCont>ul>li:first-child>.navmask").toggle();
});
$(".leftCont>ul>li:nth-child(2)").hover(function(){
	$(".leftCont>ul>li:nth-child(2)>.navmask").css("top","-69px");
	$(".leftCont>ul>li:nth-child(2)>.navmask").toggle();
});
$(".leftCont>ul>li:nth-child(3)").hover(function(){
		$(".leftCont>ul>li:nth-child(3)>.navmask").css("top","-138px");
	$(".leftCont>ul>li:nth-child(3)>.navmask").toggle();
});
$(".leftCont>ul>li:last-child").hover(function(){
		$(".leftCont>ul>li:last-child .navmask").css("top","-207px");
	$(".leftCont>ul>li:last-child .navmask").toggle();
});

//轮播
(()=>{
  const LIWIDTH=
    parseFloat($("#banner").css("width"));
  var $imgs=$("[data-load=bannerImgs]"),
      $inds=$("[data-load=bannerInds]");
	var n=0,TRANS=300,INTERVAL=2000,
        timer=null;
  $.get("../data/00-banner.php?classify=7",data=>{//data为php请求后接收到的数据
   data.push(data[0]);//在五张轮播图片后面再加入第一张
    var html="";
    for(var img of data){
      html+=
        `<li>
          <a href="../${img.href}">
              <img src="../${img.src}">
          </a>
        </li>`
    }
    $("[data-load=bannerImgs]")
      .html(html).css("width",LIWIDTH*data.length);
    $("[data-load=bannerInds]")
      .html("<li></li>".repeat(data.length-1))
      .children().first().addClass("hover");
        return new Promise(resolve=>resolve());
    })
    .then(()=>{
			//自动播放
      function moveOnce(){
        var left=LIWIDTH*n;
        $imgs.css("left",-(left+LIWIDTH)+"px");
        $(".indicators>li:nth-child("+(n+1)+")").removeClass("hover");
        if(n+1==$imgs.children().length-1){
					$inds.children().last().removeClass("hover");
          $inds.children().first().addClass("hover");
          setTimeout(()=>{  
             $imgs.css("transition","");
             $imgs.css("left",0);
            n=0;
            setTimeout(()=>{
               $imgs.css("transition","all .3s linear");
            },100);
          },TRANS);
        }else{
            $(".indicators>li:nth-child("+(n+1)+")").next().addClass("hover");
            n++;
        }
      }
      timer=setInterval(moveOnce,INTERVAL+TRANS);
      return new Promise(resolve=>resolve(moveOnce));
    })
    .then((moveOnce)=>{
			//鼠标移入时，停止定时器
      $imgs.parent().mouseover(function(){
        clearInterval(timer);
        timer=null;
      })
				//鼠标移出时，开启定时器
      $imgs.parent().mouseout(function(){
        timer=setInterval(moveOnce,INTERVAL+TRANS);
      })
      for(let i=0;i<5;i++){
					//给小圆点绑定单击事件
        $(".indicators>li:nth-child("+(i+1)+")").click(function(){
          n=i;
					$imgs.css("left",-n*LIWIDTH+"px");
          $inds.find(".hover").removeClass("hover");
          $(".indicators>li:nth-child("+(i+1)+")").addClass("hover");
        })
      }
			//给左边按钮绑定单击事件
      $("[data-move=left]").click(function(e){
        e.preventDefault();
        if(n>0){ 				      
          $imgs.css("left",-(n-1)*LIWIDTH+"px");
					$(".indicators>li:nth-child("+(n+1)+")").removeClass("hover");
           $(".indicators>li:nth-child("+n+")").addClass("hover");
					 n--; 
        }else{				
          $imgs.css("transition","");
          n=$imgs.children().length-2;
          $imgs.css("left",-n*LIWIDTH+"px");
          setTimeout(()=>{
            $imgs.css("transition","all .3s linear");
            $(".indicators>li:first-child").removeClass("hover");
            $(".indicators>li:last-child").addClass("hover");
          },100)
        }
      })
				//给右边按钮绑定单击事件
      $("[data-move=right]").click(function(e){
        e.preventDefault();
        if(n<$inds.children().length-1){
					n++;
          $imgs.css("left",-n*LIWIDTH+"px");
          $(".indicators>li:nth-child("+n+")").removeClass("hover");
          $(".indicators>li:nth-child("+(n+1)+")").addClass("hover");				
        }else{			
					$imgs.css("left",-n*LIWIDTH+"px");
          $(".indicators>li:last-child").removeClass("hover");
          $(".indicators>li:nth-child(1)").addClass("hover");
          setTimeout(()=>{
            $imgs.css("transition","");   
            setTimeout(()=>{
              $imgs.css("transition","all .3s linear");
            },100)
          },TRANS)
					$imgs.css("left",0);
						n=0;
        }
      })
    })
    .catch(err=>console.log(err))
})();

//楼层
//页面第三层
//默认加载第一项
(()=>{
  $.get("../data/00-dataInquiry.php?table=07_wedding_photo&classify=马尔代夫旅拍",
		data=>{
   var html="";
      html+=
			`<div class="left-ad">
				<a href="404.html">
					<img src="../${data[0].src}" alt="">
				</a>
				<div class="whitemask">
					<div class="tit">${data[0].title}</div>
					<div class="subtit"></div>
				</div>
			</div>`;

		for(var i=1;i<data.length;i++){
			html+=
			`<div class="item">
				<div class="pic">
					<img src="../${data[i].src}" alt="">
					<div class="picmask"></div>
					<div class="words">${data[i].msg}</div>
					<div class="sta">
						<span class="myd">满意度：${data[i].satisfaction}</span>
					</div>
				</div>
				<div class="name">
					<span class="price">¥<em>${data[i].price.slice(0,4)}</em>起</span>
					<a href="javascript:;" title="${data[i].title}">${data[i].title}</a>
				</div>
			</div>`;
		}
		$("#tabs1").html(html);
				return new Promise(resolve=>resolve());
	})
		.then(()=>{
		//加载第二项
			loadMsg('07_wedding_photo','巴厘岛旅拍','#tabs1');
		})
		.then(()=>{
			//加载第三项
			loadMsg('07_wedding_photo','泰国旅拍','#tabs1');
		})
		.then(()=>{
			//加载第四项
			loadMsg('07_wedding_photo','意大利旅拍','#tabs1');
		})
		.then(()=>{
			//加载第五项
			loadMsg('07_wedding_photo','海外旅拍优选','#tabs1');
		})
		.then(()=>{
			//加载第六项
			loadMsg('07_wedding_photo','境外旅拍优选','#tabs1');
		})
			.then(()=>{
			//加载第一项
			loadMsg('07_wedding_photo','马尔代夫旅拍','#tabs1');
		})
})();
//	定义调用楼层信息函数
function loadMsg(table,classify,id){
	$(".floor>ul").on("mouseenter","li",function(){
			var msg=$(this).children().html();
		if(msg==classify){
			if($(this).siblings().hasClass("on")){
				$(this).siblings().removeClass("on");
			}
			$(this).addClass("on");
			$.get("../data/00-dataInquiry.php?table="+table+"&classify="+classify,
			data=>{
			var html="";
      html+=
			`<div class="left-ad">
				<a href="404.html">
					<img src="../${data[0].src}">
				</a>
				<div class="whitemask">
					<div class="tit">${data[0].title}</div>
					<div class="subtit"></div>
				</div>
			</div>`;
		for(var i=1;i<data.length;i++){
			html+=
			`<div class="item">
				<div class="pic">
					<img src="../${data[i].src}" alt="">
					<div class="picmask"></div>
					<div class="words">${data[i].msg}</div>
					<div class="sta">
						<span class="myd">满意度：${data[i].satisfaction}</span>
					</div>
				</div>
				<div class="name">
					<span class="price">¥<em>${data[i].price.slice(0,4)}</em>起</span>
					<a href="javascript:;" title="${data[i].title}">${data[i].title}</a>
				</div>
			</div>`;
		}
			$(id).html(html);
			return new Promise(resolve=>resolve());
		})
		}
	})
}
//页面第四层
(()=>{
  $.get("../data/00-dataInquiry.php?table=07_wedding_photo&classify=三亚旅拍",
		data=>{
		  var html="";
      html+=
			`<div class="left-ad">
				<a href="404.html">
					<img src="../${data[0].src}">
				</a>
				<div class="whitemask">
					<div class="tit">${data[0].title}</div>
					<div class="subtit"></div>
				</div>
			</div>`;

		for(var i=1;i<data.length;i++){
			html+=
			`<div class="item">
				<div class="pic">
					<img src="../${data[i].src}" alt="">
					<div class="picmask"></div>
					<div class="words">${data[i].msg}</div>
					<div class="sta">
						<span class="myd">满意度：${data[i].satisfaction}</span>
					</div>
				</div>
				<div class="name">
					<span class="price">¥<em>${data[i].price.slice(0,4)}</em>起</span>
					<a href="javascript:;" title="${data[i].title}">${data[i].title}</a>
				</div>
			</div>`;
		}
   $("#tabs2").html(html);
		return new Promise(resolve=>resolve());
	})
		.then(()=>{
		//加载第二项
			loadMsg('07_wedding_photo','云南旅拍','#tabs2');
		})
		.then(()=>{
			//加载第三项
			loadMsg('07_wedding_photo','国内旅拍优选','#tabs2');
		})
		.then(()=>{
			//加载第一项
			loadMsg('07_wedding_photo','三亚旅拍','#tabs2');
		})
})();

//页面第五层
(()=>{
  $.get("../data/00-dataInquiry.php?table=07_wedding_photo&classify=海外婚礼婚拍",
		data=>{
   var html="";
      html+=
			`<div class="left-ad">
				<a href="404.html">
					<img src="../${data[0].src}">
				</a>
				<div class="whitemask">
					<div class="tit">${data[0].title}</div>
					<div class="subtit"></div>
				</div>
			</div>`;

		for(var i=1;i<data.length;i++){
			html+=
			`<div class="item">
				<div class="pic">
					<img src="../${data[i].src}" alt="">
					<div class="picmask"></div>
					<div class="words">${data[i].msg}</div>
					<div class="sta">
						<span class="myd">满意度：${data[i].satisfaction}</span>
					</div>
				</div>
				<div class="name">
					<span class="price">¥<em>${data[i].price.slice(0,4)}</em>起</span>
					<a href="javascript:;" title="${data[i].title}">${data[i].title}</a>
				</div>
			</div>`;
		}
   $("#tabs3").html(html);
		return new Promise(resolve=>resolve());
	})
		.then(()=>{
		//加载第二项
			loadMsg('07_wedding_photo','巴厘岛婚礼','#tabs3');
		})
		.then(()=>{
			//加载第一项
			loadMsg('07_wedding_photo','海外婚礼婚拍','#tabs3');
		})
})();
	
//浪漫海滨层的滚轮事件
(()=>{
		var offset=$("#bj").offset();
		var offsetTop=offset.top;
		$(window).scroll(function(){
		if(document.body.scrollTop+offsetTop<=950){
				$("#bj>img").css("top",-300+"px");
		}
		if(document.body.scrollTop+offsetTop>1050){
				$("#bj>img").css("top",-100+"px");
		}
	});
})();

//电梯按钮
(()=>{
		var $fTops=$(".floor>h2");
//	console.log($fTops);
    var html="";
    for(var i=0;i<$fTops.length;i++){
			var $info=$($fTops[i]).html();
			html+=
        `<li class="lift_item">
			<a href="javascript:;" class="lift_btn">
				<span class="lift_btn_txt">${$info}
				</span>
			</a>
		</li>`
    }
		$("#lift>ul").html(html);
    var $ulLift=$("[data-list=elevator]")[0];
    function getTotalTop(elem){
			var total=elem.offsetTop;
      while(elem.offsetParent){
        elem=elem.offsetParent;
        total+=elem.offsetTop
      }
      return total;
    }
    var top1=getTotalTop($fTops[0]);
    var floors=[...$(".floor")];
    for(var f of floors){
      f.totalTop=getTotalTop(f);
    }
    var FHEIGHT=parseFloat(
      getComputedStyle(floors[0]).height
    );
    function checkOn(){
      var scrollTop=document.body.scrollTop;
      for(var i=0;i<floors.length;i++){
        if(scrollTop>=floors[i].totalTop+120-innerHeight/2
            &&scrollTop<floors[i].totalTop+FHEIGHT+120-innerHeight/2)
				
          $(".lift_list>li:nth-child("+(i+1)+")").addClass("lift_item_on");//亮
        else
          $(".lift_list>li:nth-child("+(i+1)+")").removeClass("lift_item_on");//灭
      }
    }
    $(window).scroll(function(){
      if(top1<=document.body.scrollTop+innerHeight/2){
        $("#lift").css("display","block");
      }else{
        $("#lift").css("display","");
			}
      checkOn();
    });
    for(let i=0;i<$(".lift_list>li").length;i++){
       $(".lift_list li:nth-child("+(i+1)+")").click(function(){
        moveTo(i);
      })
    }

    var DIST=0,DURA=500,STEPS=100,
        interval=DURA/STEPS,step=0,
        moved=0,timer=null;
    function moveTo(i){
      if(timer!=null){
        clearInterval(timer);
        timer=null;
        moved=0;
      }
      DIST=
       floors[i].totalTop+30-document.body.scrollTop;
      step=DIST/STEPS;
      timer=setInterval(()=>{
        window.scrollBy(0,step);
        moved++;
        if(moved==STEPS){
          clearInterval(timer);
          timer=null;
          moved=0;
          checkOn();
        }
      },interval)
    }
 
})();
	