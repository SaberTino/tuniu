//轮播 广告位
$(function(){
	var left = $('.tnBanner .btnLeft');//获取左点击
	var right = $('.tnBanner .btnRight');//获取右点击
	var imgList = $('.activitySlide .bannerImg li'); //获取图片
	var ind = $('.bnCenter .bannerInd li'); //获取按钮
  	var i = 0;
	// 图片自动切换 定时器
	function move(){ 
		i++;
		if(i>5){
			i=0;
		}
		// (function(){
		imgList.eq(i).siblings().stop().animate({
			opacity:0
		},800);
		imgList.eq(i).stop().animate({
			opacity:1
		},800);
		ind.eq(i).addClass('current').siblings().removeClass('current');
			// })();
	}
	var timer=setInterval(move,2000);

	//鼠标移入父元素 显示左右按钮
	$(".bnCenter").mouseover(function(){
		left.css("display","block");
		right.css("display","block");
	});
	$(".bnCenter").mouseout(function(){
		left.css("display","none");
		right.css("display","none");
	});

   // 左点击  
   left.click(function(){
	   i--;
	   if(i<0){
		   i=5;
	   }
	   imgList.eq(i).siblings().stop().animate({
		   opacity:0
	   },800);
	   imgList.eq(i).stop().animate({
		   opacity:1
	   },800);
	   ind.eq(i).addClass('current').siblings().removeClass('current');
   });
   // 右点击
   right.click(function(){
	   i++;
	   if(i>5){
		   i=0;
	   }
	   imgList.eq(i).siblings().stop().animate({
		   opacity:0
	   },800);
	   imgList.eq(i).stop().animate({
		   opacity:1
	   },800);
	   ind.eq(i).addClass('current').siblings().removeClass('current');
   });

   //移入按钮 切换
   ind.mouseover(function(){
	   var n = $(this).index();
	   i=n;
	   imgList.eq(i).siblings().stop().animate({
		   opacity:0
	   },800);
	   imgList.eq(i).stop().animate({
		   opacity:1
	   },800);
	   ind.eq(i).addClass('current').siblings().removeClass('current');
   });

   //当鼠标移入，停止轮播图切换
	$(".bnCenter").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(move,2000);
	});
		
	//手风琴 广告
	$(".subjectImg li").mouseover(function(){
		$(this).addClass('current').children().stop().animate({left:-100},200);
		$(this).siblings().removeClass('current').children().stop().animate({left:0},200);
	});

	//左侧一级导航移入 移出事件
	$(".catalogFirst .firstTab").mouseover(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
	});

	//右侧 满意度 热点动图
	$(document).ready(function(){
		var imgHeight = -67;
		var timer = setInterval(function(){
			$(".hotPoint").css("backgroundPosition", '0px ' + imgHeight + 'px');
			imgHeight -= 70;
			if (imgHeight <= -6440) {
				clearInterval(timer);
			}
		}, 20)
	});
    $(document).ready(function(){
        var num = 0;
        var timer = setInterval(function(){
            num++;
            $(".hotPoint .hotNum").html(num);
            if (num >= 93) {
                clearInterval(timer);
            }
        }, 20)
    })
	//右侧 滚动列表
	var list=$(".rightSec .scrollList");
    var listH=0;
	var listTimer=setInterval(function(){
        list.css("top",listH);
		list.css({"transition":"all .2s linear"});
		listH-=65;
		if(listH<-520){
			listH=0;
			list.css({"transition":"all .0000000000001s linear"});
			list.css("top",listH);
		}
	},2000);


	//出游服务 图文广告
	$(".btmMain a").mouseover(function(){
		$(this).children("img").css("top","-2px");
		$(this).children("span").css("color","#ff6600");
	});
	$(".btmMain a").mouseout(function(){
		$(this).children("img").css("top","0");
        $(this).children("span").css("color","#656565");
	});
})


/* 超值特卖 */
$(function(){
	$(".special .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("current").siblings().removeClass("current");
        var index=$(".special .tabs .current").index();
		$(".layerBodyList .layerBody").eq(index).addClass("current").siblings().removeClass("current");
	});

	// (function(){
	/* 超值特卖 倒计时 */
	function time(target){
		var target = new Date(target);
		var now = new Date();
		var timer = new Object();
		var s = parseInt((target - now) / 1000);
		timer.d = parseInt(s / (3600 * 24));
		timer.h = parseInt(s % (3600 * 24) / 3600);
		timer.m = parseInt(s % 3600 / 60);
		timer.s = s % 60;
		return timer;
	}
	setInterval(function(){
		var timer1=time("2017/10/12 14:50:15");

		$(".timer1 .indexD").html(timer1.d);
		$(".timer1 .indexH").html(timer1.h);
		$(".timer1 .indexM").html(timer1.m);
		$(".timer1 .indexS").html(timer1.s);
	},1000);
	setInterval(function(){
		var timer2=time("2017/10/13 23:59:59");
		$(".timer2 .indexD").html(timer2.d);
		$(".timer2 .indexH").html(timer2.h);
		$(".timer2 .indexM").html(timer2.m);
		$(".timer2 .indexS").html(timer2.s);
	},1000);
    setInterval(function(){
        var timer3=time("2017/10/26 13:27:45");
        $(".timer3 .indexD").html(timer3.d);
        $(".timer3 .indexH").html(timer3.h);
        $(".timer3 .indexM").html(timer3.m);
        $(".timer3 .indexS").html(timer3.s);
    },1000);
    setInterval(function(){
        var timer4=time("2017/10/15 20:30:30");
        $(".timer4 .indexD").html(timer4.d);
        $(".timer4 .indexH").html(timer4.h);
        $(".timer4 .indexM").html(timer4.m);
        $(".timer4 .indexS").html(timer4.s);
    },1000);
    // })()
})

/* 游记攻略 */
$(function(){
	$(".tourBox .Htabs").on("mouseenter","li a",function(){
        //e.preventDefault();
        $(this).parent().addClass("current").siblings().removeClass("current");
        var index=$(".tourBox .Htabs .current").index();
		$(".tourBox .tourBody").eq(index).siblings().css("display","none").stop().animate({
			opacity:0
		},1000);
		$(".tourBox .tourBody").eq(index).css("display","block").stop().animate({
			opacity:2
		},1000);
	});
	$(".tourBody a").mouseover(function(){
		$(this).children(".proCover").stop().animate({bottom:0},200);
	});
	$(".tourBody a").mouseout(function(){
		$(this).children(".proCover").stop().animate({bottom:-50},200);
	});
})

/* 页面底部开关广告 */
$(function(){
    var wn=true;
	$(".wOpen .wOpenInner .btnClose").click(function(){
		$(this).parent().parent().stop().animate({left:"-100%"},400,function(){
			$(".wClose").stop().animate({left:"-55px"},400);
		})
		$(".mainBottom .tiexin span").animate({bottom:0},400);
        wn=true;
	})
    $(".wClose").click(function(){
        $(this).stop().animate({left:-110},200,function(){
            $(".wOpen").stop().animate({left:0},400);
        });
        $(".mainBottom .tiexin span").animate({bottom:147},600);
        wn=false;
    })
	$(".wClose").mouseover(function(){
		$(this).animate({left:0},400);
	})
	$(".wClose").mouseout(function(){
		if(wn==true){
		  $(this).stop().animate({left:"-55px"},400);
		}
	})

	/* 旅游合作局 */
    var tourism=$(".tourismWrap .twList");
    var tourTop=parseInt(tourism.css("top"));
    setInterval(function(){
        tourism.css("top",tourTop);
        tourTop-=90;
        if(tourTop<=-720){
            tourTop=0;
        }
    },3000);
})

/* 右边栏 畅销榜 */
$(function(){
	$(".asideTabTit li").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		var aIndex=$(this).index()+1;
		$(".asideTabList>li:nth-child("+aIndex+")").css("display","block").siblings().css("display","none");
	})
})

/* 右边栏 热门目的地 */
$(function(){
	var btnNum=1;
	$(".dest .btnLeft").click(function(){
		if(btnNum<0){
			$(".destContent ul").animate({left:0},500);
            btnNum=1;
		}
	})
    $(".dest .btnRight").click(function(){
        if(btnNum>0){
        	$(".destContent ul").animate({left:-150},500);
			btnNum=-1;
        }
    })
})

/* 页面右侧固定栏 */
$(function(){
    // $(".rightOrder li").mouseover(function(){
    //     $(this).children().css("display","block").stop().animate({right:40},400);
    // }).mouseout(function(){
    //     $(this).children("div").css("right","60px");
    // });
    $(".rightOrder").on("mouseover","li",function(){
        $(this).children().css("display","block").stop().animate({right:40},300);
        console.log($(this));
    }).on("mouseout","li",function(){
        $(this).children("div").stop().animate({right:60},1).css("display","none");
        console.log($(this).children("div").css("right"));
    });

	$(".rightOrder .toTop").mouseover(function(){
		$(".mainBottom .tiexin span").stop().animate({right:130},600);
	}).click(function(){
		$("body,html").animate({"scrollTop":0},500);
	});
	$(".rightOrder .toTop").mouseout(function(){
		$(".mainBottom .tiexin span").stop().animate({right:70},600);
	});
})
