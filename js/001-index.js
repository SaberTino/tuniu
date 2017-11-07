$(function(){
    /* 数据库请求及拼接 */
    function loadImg(name,classify,elem){
        $.ajax({
            type:"GET",
            url:"data/00-index.php",
            data:{name:name,classify:classify},
            success:function(img){
                var html="";
                for(var i of img){
                    html+=`
                    <li class="proItem">
						<div class="proPic">
							<a href="html/404.html">
							    <img src="${i.img}">
							</a>
							<div class="proMessBg"></div>
							<div class="proMess">
							    <a href="${i.href}">${i.title}</a>
							</div>
							</div>	
							<div class="proInfor">
							<a href="${i.href}">
							    <span class="fl">¥
							    <em>${i.price}</em>
							    <i>起</i>
							    </span>
							    <span>满意度${i.satisfaction}</span>
							</a>										
						</div>
					</li>
                    `;
                }
                elem.html(html);
                $(".proItem").mouseover(function(){
                    $(this).addClass("proItemBg");
                })
                $(".proItem").mouseout(function(){
                    $(this).removeClass("proItemBg");
                })
            },
            error:function(){
                console.log("err");
            }
        })
    }
    /* 当季热玩 */
	var rewan=$("[data-rel=rewanList]");
    $("[data-rel=rewan] .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("colorZi").siblings().removeClass("colorZi");
        var name = $("[data-rel=rewan] h2").html();
        var classify =$(e.target).html();
        loadImg(name,classify,rewan);
    });
    /* 国内旅游 */
    var guonei=$("[data-rel=guoneiList]");
    $("[data-rel=guonei] .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("colorHong").siblings().removeClass("colorHong");
        var name = $("[data-rel=guonei] h2").html();
        var classify =$(e.target).html();
        loadImg(name,classify,guonei);
    });
    /* 出境短线 */
    var duanyou=$("[data-rel=duanyouList]");
    $("[data-rel=duanyou] .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("colorLan").siblings().removeClass("colorLan");
        var name = $("[data-rel=duanyou] h2").html();
        var classify =$(e.target).html();
        loadImg(name,classify,duanyou);
    });
    /* 出境长线 */
    var changxian=$("[data-rel=changxianList]");
    $("[data-rel=changxian] .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("colorLv").siblings().removeClass("colorLv");
        var name = $("[data-rel=changxian] h2").html();
        var classify =$(e.target).html();
        loadImg(name,classify,changxian);
    });
    /* 自驾旅游 */
    var zijia=$("[data-rel=zijiaList]");
    $("[data-rel=zijia] .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("colorCheng").siblings().removeClass("colorCheng");
        var name = $("[data-rel=zijia] h2").html();
        var classify =$(e.target).html();
        loadImg(name,classify,zijia);
    });
    /* 门票精选 */
    var menpiao=$("[data-rel=menpiaoList]");
    $("[data-rel=menpiao] .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("colorQing").siblings().removeClass("colorQing");
        var name = $("[data-rel=menpiao] h2").html();
        var classify =$(e.target).html();
        loadImg(name,classify,menpiao);
    });
    /* 当地玩乐 */
    var wanle=$("[data-rel=wanleList]");
    $("[data-rel=wanle] .tabs").on("mouseover","li a",function(e){
        e.preventDefault();
        $(e.target).parent().addClass("colorHuang").siblings().removeClass("colorHuang");
        var name = $("[data-rel=wanle] h2").html();
        var classify =$(e.target).html();
        loadImg(name,classify,wanle);
    });

    /* 滚轮滑动时加载 */
    var $rewan=$("[data-rel=rewan]");
    var $guonei=$("[data-rel=guonei]");
    var $duanyou=$("[data-rel=duanyou]");
    var $changxian=$("[data-rel=changxian]");
    var $zijia=$("[data-rel=zijia]");
    var $menpiao=$("[data-rel=menpiao]");
    var $wanle=$("[data-rel=wanle]");
    var $youji=$("[data-rel=youji]");
    $rewan.data("isFull","false");
    $guonei.data("isFull","false");
    $duanyou.data("isFull","false");
    $changxian.data("isFull","false");
    $zijia.data("isFull","false");
    $menpiao.data("isFull","false");
    $wanle.data("isFull","false");
    $youji.data("isFull","false");

    var wH=$(window).height();
    var floatNav=-1;
    $(window).scroll(function(){
        var wT=$(window).scrollTop();
        if($rewan.data("isFull")=="false"){
            if(wT+wH>=$rewan.offset().top+100){
                loadImg("当季热玩","出境短线",rewan);
                $("[data-rel=rewan] .tabs li:nth-child(1)").addClass("colorZi");
                $rewan.data("isFull","true");
            }
        }
        if($guonei.data("isFull")=="false"){
            if(wT+wH>=$guonei.offset().top+300){
                loadImg("国内旅游","精选",guonei);
                $("[data-rel=guonei] .tabs li:nth-child(1)").addClass("colorHong");
                $guonei.data("isFull","true");
            }
        }
        if($duanyou.data("isFull")=="false"){
            if(wT+wH>=$duanyou.offset().top+300){
                loadImg("出境短线","精选",duanyou);
                $("[data-rel=duanyou] .tabs li:nth-child(1)").addClass("colorLan");
                $duanyou.data("isFull","true");
            }
        }
        if($changxian.data("isFull")=="false"){
            if(wT+wH>=$changxian.offset().top+300){
                loadImg("出境长线","精选",changxian);
                $("[data-rel=changxian] .tabs li:nth-child(1)").addClass("colorLv");
                $changxian.data("isFull","true");
            }
        }
        if($zijia.data("isFull")=="false"){
            if(wT+wH>=$zijia.offset().top+300){
                loadImg("自驾旅游","常州",zijia);
                $("[data-rel=zijia] .tabs li:nth-child(1)").addClass("colorCheng");
                $zijia.data("isFull","true");
            }
        }
        if($menpiao.data("isFull")=="false"){
            if(wT+wH>=$menpiao.offset().top+300){
                loadImg("门票精选","精选",menpiao);
                $("[data-rel=menpiao] .tabs li:nth-child(1)").addClass("colorQing");
                $menpiao.data("isFull","true");
            }
        }
        if($wanle.data("isFull")=="false"){
            if(wT+wH>=$wanle.offset().top+300){
                loadImg("当地玩乐","东南亚",wanle);
                $("[data-rel=wanle] .tabs li:nth-child(1)").addClass("colorHuang");
                $wanle.data("isFull","true");
            }
        }

        /* 电梯导航 */
        if(floatNav<0){
            if(wT+wH>=$rewan.offset().top+600) {
                $(".floatNav").css("display","block").css("top","0px").stop().animate({top:500},400, function () {
                    $(".floatNav").stop().animate({top: 130},450);
                });
                floatNav=1;
            }
        }else if(wT+wH<$rewan.offset().top+600){
             $(".floatNav").css({"display":"block","top":"300px"}).animate({top:1000},500).css("display","none");
             console.log($(".floatNav").css({"display":"block","top":"300px"}));
             floatNav=-1;
        }


        if(wT+wH>=$rewan.offset().top+500&&wT+wH<$guonei.offset().top+500){
            $(".floatNav li:nth-child(1)").css("background","#d74568").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(1)").css("background","#fff").children().css("color","#999");
        }
        if(wT+wH>=$guonei.offset().top+500&&wT+wH<$duanyou.offset().top+500){
            $(".floatNav li:nth-child(3)").css("background","#ED0505").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(3)").css("background","#fff").children().css("color","#999");
        }
        if(wT+wH>=$duanyou.offset().top+500&&wT+wH<$changxian.offset().top+500){
            $(".floatNav li:nth-child(5)").css("background","#517ac0").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(5)").css("background","#fff").children().css("color","#999");
        }
        if(wT+wH>=$changxian.offset().top+500&&wT+wH<$zijia.offset().top+500){
            $(".floatNav li:nth-child(7)").css("background","#3aa860").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(7)").css("background","#fff").children().css("color","#999");
        }
        if(wT+wH>=$zijia.offset().top+500&&wT+wH<$menpiao.offset().top+500){
            $(".floatNav li:nth-child(9)").css("background","#E15B38").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(9)").css("background","#fff").children().css("color","#999");
        }
        if(wT+wH>=$menpiao.offset().top+500&&wT+wH<$wanle.offset().top+500){
            $(".floatNav li:nth-child(11)").css("background","#08AFB1").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(11)").css("background","#fff").children().css("color","#999");
        }
        if(wT+wH>=$wanle.offset().top+500&&wT+wH<$youji.offset().top+500){
            $(".floatNav li:nth-child(13)").css("background","#EFAD08").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(13)").css("background","#fff").children().css("color","#999");
        }
        if(wT+wH>=$youji.offset().top+500){
            $(".floatNav li:nth-child(15)").css("background","#2E9900").children().css("color","#fff");
        }else{
            $(".floatNav li:nth-child(15)").css("background","#fff").children().css("color","#999");
        }
    });

    function toList(layer){
        var scroll_offset=layer.offset().top-160;
        $("body,html").animate({"scrollTop":scroll_offset},500);
    }
    $(".floatNav li:eq(0)").click(function(){
        toList($rewan);
    });
    $(".floatNav li:eq(2)").click(function(){
        toList($guonei);
    });
    $(".floatNav li:eq(4)").click(function(){
        toList($duanyou);
    });
    $(".floatNav li:eq(6)").click(function(){
        toList($changxian);
    });
    $(".floatNav li:eq(8)").click(function(){
        toList($zijia);
    });
    $(".floatNav li:eq(10)").click(function(){
        toList($menpiao);
    });
    $(".floatNav li:eq(12)").click(function(){
        toList($wanle);
    });
    $(".floatNav li:eq(14)").click(function(){
        toList($youji);
    });
});
