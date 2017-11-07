/**
*用于保险的选择
*/
$((()=>{	
	let $priceItem=$("[data-toggle=price-item]");
	let $addPrice=$("[data-toggle=addPrice]");
	$("#section>.left-content>.content").on("click"," span.choose-box",function(){
		let $chosen=$(this);
		$chosen.toggleClass("insuranceBorder").children().toggle();
		if($chosen.parent().parent().hasClass("insurance")){
			let price=$chosen.parent().prev().children().first().text().slice(1);
			let title=$chosen.parent().prev().prev().children().first().text();			
			if($chosen.hasClass("insuranceBorder")){
				let html=`
					<ul class="price-item ${$chosen.data('toggle')}">
						<li>
							<span>保险产品</span>
							<span>￥ 2*${price}</span>
							<p>${title}</p>
						</li>
					</ul>	
				`;
				$priceItem.append(html);
				$addPrice.text(`￥${parseFloat($addPrice.text().slice(1))+2*price}`);
			}else{
				$priceItem.children("ul").remove("."+$chosen.data("toggle"));
				$addPrice.text(`￥${parseFloat($addPrice.text().slice(1)-2*price)}`);
			}
		}else{
			let title=$chosen.parent().prev().prev().children().first().text();			
			if($chosen.hasClass("insuranceBorder")){
				let html=`
					<ul class="price-item ${$chosen.data('toggle')}">
						<li>
							<span>套餐优惠</span>
							<span>-￥50</span>
							<p>${title}</p>
						</li>
					</ul>	
				`;
				$priceItem.append(html);
				$addPrice.text(`￥${parseFloat($addPrice.text().slice(1))-50}`);
			}else{
				$priceItem.children("ul").remove("."+$chosen.data("toggle"));
				$addPrice.text(`￥${parseFloat($addPrice.text().slice(1))+50}`);
			}
		}
	})
	$("[data-toggle=isShow]").click(function(){
		$("#section ul.insurance:eq(1)").toggleClass("inShow").next().toggleClass("inShow");
		$(this).children(":eq(1)").toggleClass("arrowUp");
		if($(this).children(":eq(0)").text()=="更多保险"){
			$(this).children(":eq(0)").text("收起");
		}else{
			$(this).children(":eq(0)").text("更多保险");
		}
	});
})());

/**
*鼠标滚轮事件加载模块
*/
$((()=>{
	let $insu=$("[data-toggle=insurance]");
	let $onSale=$("[data-toggle=onSale]");
	let $conn=$("[data-toggle=connector]");
	let $tourist=$("[data-toggle=tourist]");
	let $right=$("[data-toggle=right-content]");
	let rightTop=$right.offset().top;
	$(window).scroll(()=>{
		let viewH=$(window).scrollTop()+$(window).height();
		if(viewH>=$insu.offset().top+30) $insu.addClass("show");
		if(viewH>=$onSale.offset().top+30) $onSale.addClass("show");
		if(viewH>=$conn.offset().top+30) $conn.addClass("show");
		if(viewH>=$tourist.offset().top+30) $tourist.addClass("show");
		if($(window).scrollTop()>=rightTop){
			$right.addClass("stay");
		}else{
			$right.removeClass("stay");
		}
	});
})());