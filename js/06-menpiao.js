$("#header").load("../data/header.php");//加载头部
$("#footer").load("../data/footer.php");//加载页尾
$(".tabs:has([data-toggle=tab])").on("mouseenter","[data-toggle=tab]",function(e){
  var $tar=$(e.target);
  if(!$tar.parent().is(".active")){
    $tar.parent().addClass("active")
        .siblings().removeClass("active");
    var id=$tar.attr("href");
    $(id).addClass("active")
        .siblings().removeClass("active");
  }
});
//	定义调用楼层信息函数
function loadMsg(table,classify,id){
	$("#jd").on("mouseenter","li",function(){
		var msg=$(this).children().html();
		if(msg==classify){
			if($(this).siblings().hasClass("active")){
				$(this).siblings().removeClass("active");
			}
			$(this).addClass("active");
			$.get("../data/00-dataInquiry.php?table="+table+"&classify="+classify,
			data=>{
			var html="";
			 for (var i=0;i<data.length;i++ ){
			html+=`
					<li class="clear">
						<div class="col">
							<div class="container">
								<div class="front" style="background-image:url(../${data[i].src})">
									<div class="inner">
										<p>${data[i].title}</p>
											<span>¥${data[i].price}</span>
									</div>
								</div>
								<div class="back">
									<div class="inner">
										<p>${data[i].msg}</p>
									</div>
								</div>
							</div>
						</div>
					</li>`;
		}
			$(id).html(html);
			return new Promise(resolve=>resolve());
		})
		}
	})
}

(()=>{
  $.get("../data/00-dataInquiry.php?table=06_menpiao&classify=上海",
		data=>{
		  var html="";
      for (var i=0;i<data.length;i++ ){
			html+=`
					<li class="clear">
						<div class="col">
							<div class="container">
								<div class="front" style="background-image:url(../${data[i].src})">
									<div class="inner">
										<p>${data[i].title}</p>
											<span>¥${data[i].price}</span>
									</div>
								</div>
								<div class="back">
									<div class="inner">
										<p>${data[i].msg}</p>
									</div>
								</div>
							</div>
						</div>
					</li>`;
		}
		$("#floor1").html(html);
		return new Promise(resolve=>resolve());
	})
		.then(()=>{
		//加载第二项
			loadMsg('06_menpiao','杭州','#floor1');
		})
		.then(()=>{
			//加载第三项
			loadMsg('06_menpiao','宁波','#floor1');
		})
		.then(()=>{
			//加载第四项
			loadMsg('06_menpiao','台州','#floor1');
		})
			.then(()=>{
			//加载第五项
			loadMsg('06_menpiao','绍兴','#floor1');
		})
			.then(()=>{
			//加载第六项
			loadMsg('06_menpiao','嘉兴','#floor1');
		})
		.then(()=>{
			//加载第一项
			loadMsg('06_menpiao','上海','#floor1');
		})
})();
