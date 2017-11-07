;(()=>{
    let list=$(".navList");
    let span=$(".navTitle span");
    let a=$(".navList>li>a");
    let img=$("[data-hover='enter']");
	// let btn=$(".btn:first");
    let curve=$(".intRight .progress .bar");
    let spanIndex=$(".progress span");
    let barN=0;
    let arr=[90,85,70,95,75,40];
    let anim=$("#sessionTwo .dateBar .dateWork");
    let h4=$("#sessionTwo .dateInt h4");
    let dateSpan=$("#sessionTwo .dateInt span");
    let returnTop=$(".returnTop");
    span.click(function(){
        list.toggleClass("show")
    })
    a.click(function(e){
        $(e.target).parent().addClass("active").siblings().removeClass("active");
    })
    $(window).scroll(function(){
        if($(window).scrollTop()>=1000){
            for(let i=0;i<6;i++){
                technicalCurve(arr[i],i,barN,curve,"css",'width');
                technicalCurve(arr[i],i,barN,spanIndex,"css",'left');
                technicalCurve(arr[i],i,barN,spanIndex,"html");   
            }
            barN=100;
        }
        if($(window).scrollTop()>=2291){
            let animTime=0;
            for(let i=1;i<5;i++){
                $(anim[i-1]).addClass("anim"+i);
                let timer=setTimeout(function(){
                    $(h4[i-1]).css("width","250");
                },(i-1)*200)
                animTime=((i-1)*0.2)+"s";
                // console.log(animTime);
                $(dateSpan[i-1]).css("animation","loadingTwo 1s linear "+animTime+" both");
            }
        }
        if($(window).scrollTop()>=3000){
            let animTime=0;
            for(let i=5;i<8;i++){
                $(anim[i-1]).addClass("anim"+(i-3));

                let timer=setTimeout(function(){
                    $(h4[i-1]).css("width","250");
                },(i-1)*200)

                animTime=((i-1)*0.2)+"s";
                $(dateSpan[i-1]).css("animation","loadingThree 1s linear "+animTime+" both");
            }
        }
        // console.log($(window).scrollTop());
    })
    function technicalCurve(num,index,barN,el,cssName,av){
        let timer=setInterval(function(){
            if(barN>num){
                clearInterval(timer);
                timer=null;
            }else if(cssName=="css"){
                barN++;
                $(el[index]).css(av,barN+'%');
            }else if(cssName=="html"){
                barN++;
                $(el[index]).html(barN+'%');
            }
        },20)
    }

    var imgBox = $(".memberBox .imgBox");
        // console.log(imgBox);
        imgBox.hover(function(){
            // console.log(this);
            $(this).toggleClass("goin");
            // console.log($(this).children(0)[2]);
            $($(this).children(0)[2]).toggleClass("move");
        })





    var imgBox = $(".imgBox");
    var bgBox = $(".bgBox");
    var closeBtn = $("#closeBtn");
    // console.log(imgBox);
    imgBox.click(function(){
        // console.log($(this).index());
        bgBox.css("display","block");
    })

    closeBtn.click(function(){
        bgBox.css("display","none");
    })




    //返回顶部
    returnTop.click(function(){
        localStorage
    })
})()

;(()=>{
    
})()


// new Vue({
//     el:'#member',
//     data:{
//         imgs:[
//             {src:'03.png',isEnter:false},
//             {src:'shutterbug.jpg',isEnter:true},
//             {src:'salad.jpg',isEnter:false}
// ]
//     },
//     methods:{
//         enter:function(e){
//             this.imgs[$(e.target).index()].isEnter = true;
// 			console.log(1);
//         },
//         leave:function(e){
//             this.imgs[$(e.target).index()].isEnter = false;
// 			console.log(2);
//         }
//     }
// })