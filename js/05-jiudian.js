$("#header").load("../data/header.php");//加载头部
$("#footer").load("../data/footer.php");//加载页尾
/**
 * Created by Administrator on 2017/9/11.
 */
/*--------------轮播-------------------------*/
function arcSlip(){
    var oPic=document.getElementById('user_pic');
    var oPrev=getByClass(oPic,'prev')[0];
    var oNext=getByClass(oPic,'next')[0];
    var aLi=oPic.getElementsByTagName('li');
    var arr=[];
    for(var i=0;i<aLi.length;i++)
    {
        var oImg=aLi[i].getElementsByTagName('img')[0];

        arr.push([parseInt(getStyle(aLi[i],'left')),parseInt(getStyle(aLi[i],'top')),
            getStyle(aLi[i],'zIndex'),oImg.width,parseFloat(getStyle(aLi[i],'opacity')*100)]);
    }
    oPrev.onclick=function moveTP()
    {
        arr.push(arr[0]);
        arr.shift();
        for(var i=0;i<aLi.length;i++){
            var oImg=aLi[i].getElementsByTagName('img')[0];
            aLi[i].style.zIndex=arr[i][2];
            startMove(aLi[i],{left:arr[i][0],top:arr[i][1],opacity:arr[i][4]});
            startMove(oImg,{width:arr[i][3]});
        }
    };
    oNext.onclick=function moveTN(){
        arr.unshift(arr[arr.length-1]);
        arr.pop();
        for(var i=0;i<aLi.length;i++)
        {
            var oImg=aLi[i].getElementsByTagName('img')[0];
            aLi[i].style.zIndex=arr[i][2];
            startMove(aLi[i],{left:arr[i][0],top:arr[i][1],opacity:arr[i][4]});
            startMove(oImg,{width:arr[i][3]});
        }
    };
    var moveTime = setInterval (function(){
        oNext.click();
    },1500);


    $("user_pic").hover(function(){
        clearInterval(moveTime);
    },function(){
        moveTime=setInterval(function(){
            oNext.click();
        },500);
    });

    function getStyle(obj,name){
        if(obj.currentStyle){ return obj.currentStyle[name]; }
        else{ return getComputedStyle(obj,false)[name]; }
    }
}
function getByClass(oParent,sClass){
    var aResult=[];
    var aEle=oParent.getElementsByTagName('*');
    for(var i=0;i<aEle.length;i++) {
        if(aEle[i].className==sClass)
        {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
function getStyle(obj,name){
    if(obj.currentStyle) {
        return obj.currentStyle[name];
    }else {
        return getComputedStyle(obj,false)[name];
    }
}
function startMove(obj,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var bStop=true;
        for(var attr in json){
            var cur=0;
            if(attr=='opacity') {
                cur=Math.round(parseFloat(getStyle(obj,attr))*100);
            }else {
                cur=parseInt(getStyle(obj,attr));
            }
            var  speed=(json[attr]-cur)/6;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(cur!=json[attr]) bStop=false;
            if(attr=='opacity') {
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }else{
                obj.style[attr]=cur+speed+'px';
            }
        }

        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd) fnEnd();
        }
    },30)
}
arcSlip();

/*-------------------手风琴---------------------------*/
(function(){      
			var slideMenu=function(){
			  var sp,st,t,m,sa,l,w,gw,ot;
			  return{
				 destruct:function(){
					  if(m){
						 clearInterval(m.htimer);
						 clearInterval(m.timer);
					  }
				 },
				 build:function(sm,sw,mt,s,sl,h){
					sp=s; 
					st=sw; 
					t=mt;
					m=document.getElementById(sm);
					sa=m.getElementsByTagName('li');
					l=sa.length; 
					w=m.offsetWidth; 
					gw=w/l;
					ot=Math.floor((w-st)/(l-1)); 
					var i=0;
					for(i;i<l;i++){
					  s=sa[i]; 
					  s.style.width=gw+'px'; 
					  this.timer(s)
					}
					if(sl!=null){
					  m.timer=setInterval(function(){
						 slideMenu.slide(sa[sl-1])
					  },t)}
				 },
				 timer:function(s){
					s.onmouseover=function(){
					  clearInterval(m.htimer);
					  clearInterval(m.timer);
					  m.timer = setInterval(function(){
						 slideMenu.slide(s)
					  },t);
					  //console.log($(this).find('.mask_b').html());
					  $(this).find('.mask_b').hide();
					  //console.log($(this).find('.mask_b').attr("style"));
				 }
					s.onmouseout=function(){
					  clearInterval(m.timer);
					  clearInterval(m.htimer);
					  m.htimer=setInterval(function(){
						 slideMenu.slide(s,true)
					  },t);
					  //console.log($(this).find('.mask_b').html());
					 $(this).find('.mask_b').show();
					 //console.log($(this).find('.mask_b').attr("style"));
				  }
				 },
				 slide:function(s,c){
					var cw=parseInt(s.style.width);
					if((cw<st && !c) || (cw>gw && c)){
					  var owt=0; var i=0;
					  for(i;i<l;i++){
						 if(sa[i]!=s){
							var o,ow; var oi=0; o=sa[i]; ow=parseInt(o.style.width);
							if(ow<gw && c){
							  oi=Math.floor((gw-ow)/sp); 
							  oi=(oi>0)?oi:1; 
							  o.style.width=(ow+oi)+'px';
							  //console.log(o);
							//console.log(o.style.width);
							}else if(ow>ot && !c){
							  oi=Math.floor((ow-ot)/sp); 
							  oi=(oi>0)?oi:1; 
							  o.style.width=(ow-oi)+'px';
							  //console.log(o);
							  //console.log(o.style.width);
							}
							if(c){
							  owt=owt+(ow+oi)
							}else{
							  owt=owt+(ow-oi)
							}
						 }
					  }
					  s.style.width=(w-owt)+'px';
					}else{
					  if(m.htimer)
						 clearInterval(m.htimer)
					  if(m.timer)
						 clearInterval(m.timer);
					}
				 }
			  };
			}();
			slideMenu.build('sm',400,10,10,1);
			})();

/*-------------------------广告轮播---------------------------*/
let show=$("#adv");
let ul=$("#adv-show");
let toLeft=$("#toLeft");
let toRight=$("#toRight");

let l=0;//记录左边距
let target=0;//记录第几张
let time=null;//自动播放的定时器
let timer1=null;//点击时的定时器
time=setInterval(autoPlay,1500);//每2秒进行一次滑动
	function autoPlay(){
		if(target<=-400){
			l=0;
			target=-100;
		}else{
			target-=100;
		}

		slide(target);//滑动速度
	}

	function slide(r){
		clearInterval(timer1);
		timer1=setInterval(autoPlay,30);
		function autoPlay(){
			if(l==r){
				clearInterval(timer1);
			}else{
				var speed=(r-l)/7;
				speed=(speed>=0)?Math.ceil(speed):Math.floor(speed);
				l=l+speed;
				ul.css("left",l+"%");
			}
		}
	}
	show.onmouseover=function(){
	  clearInterval(time);
	};

	show.onmouseout=function(){
	  time=setInterval(autoPlay,1500);
	};
//发现·当季游玩

$(".tabs:has([data-toggle=tab])")
				.on("mouseover","[data-toggle=tab]",function(e){
					var $tar=$(e.target);
					if(!$tar.parent().is(".active")){
						$tar.parent().addClass("active")
								.siblings().removeClass("active");
						var id=$tar.attr("href");
						$(id).addClass("active")
								.siblings().removeClass("active");
					}
				})