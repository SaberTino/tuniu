$("#header").load("../data/header.php");//加载头部
$("#footer").load("../data/footer.php");//加载页尾
/*
*用于向数据库发送请求获得city_business图片
*/
$((()=>{
	let $seaRoman=$("[data-trigger=sea-romantic]");
	let $seaTitle=$("[data-trigger=sea-title]");
	let $seaPic=$("[data-trigger=sea-pic]");
	let $nature=$("[data-trigger=nature]");
	let $natureTitle=$("[data-trigger=nature-title]");
	let $naturePic=$("[data-trigger=nature-pic]");
	let $city=$("[data-trigger=city]");
	let $cityTitle=$("[data-trigger=city-title]");
	let $cityPic=$("[data-trigger=city-pic]");
	let $seaLeft=$("[data-trigger=sea-left]");
	let $natureLeft=$("[data-trigger=nature-left]");
	let $cityLeft=$("[data-trigger=city-left]");
	let $superGo=$("[data-trigger=superGo]");
	let $superGoTitle=$("[data-trigger=superGo-title]");
	let $superGoPic=$("[data-trigger=superGo-pic]");
	let $hotSale=$("[data-trigger=hotSale]");
	let $hotSalePic=$("[data-trigger=hotSale-pic]");
	let wH=$(window).height();

	//自定义一个属性，用于进行判断是否还要进行ajax请求
	$seaPic.data("isFull","false");
	$naturePic.data("isFull","false");
	$cityPic.data("isFull","false");
	$superGoPic.data("isFull","false");
	$hotSalePic.data("isFull","false");

	/**
	 * 滚轮滑动时，加载每个模块的第一页
	 */
	$(window).scroll(()=>{
		let wT=$(window).scrollTop();
		if($seaPic.data("isFull")=="false"){
			if(wT+wH>=$seaRoman.offset().top){
				lazyLoad("../data/02-zizhuyou.php","city=山东")
					.then(data=>addSectionRight(data,$seaPic))
				lazyLoad("../data/02-hotCity.php","region=山东")
					.then(data=>addSectionLeft(data,$seaLeft))
				$seaPic.data("isFull","true");
			}
		}
		if($naturePic.data("isFull")=="false"){
			if(wT+wH>=$nature.offset().top+100){
				lazyLoad("../data/02-zizhuyou.php","city=云南")
					.then(data=>addSectionRight(data,$naturePic))
				lazyLoad("../data/02-hotCity.php","region=云南")
					.then(data=>addSectionLeft(data,$natureLeft))
				$naturePic.data("isFull","true");
			}
		}
		if($cityPic.data("isFull")=="false"){
			if(wT+wH>=$city.offset().top+100){
				lazyLoad("../data/02-zizhuyou.php","city=广东")
					.then(data=>addSectionRight(data,$cityPic))
				lazyLoad("../data/02-hotCity.php","region=广东")
					.then(data=>addSectionLeft(data,$cityLeft))
				$cityPic.data("isFull","true");
			}
		}
		if($superGoPic.data("isFull")=="false"){
			if(wT+wH>=$superGo.offset().top+100){
				lazyLoad("../data/00-dataInquiry.php",`table=02_free&classify=当季热门`)
					.then(data=>addSectionRight(data,$superGoPic,"杭州出发"))
				$superGoPic.data("isFull","true");
			}
		}
		if($hotSalePic.data("isFull")=="false"){
			if(wT+wH>=$hotSalePic.offset().top+100){
				console.log(1);
				lazyLoad("../data/02-hotSale.php","city=广东")
					.then(data=>addSectionRight(data,$hotSalePic))
				$hotSalePic.data("isFull","true");
			}
		}
	});

	/*
	*浪漫海滨鼠标悬停时进行ajax请求
	*/
	$seaTitle.on("mouseover","li:not(.more)>a",e=>{
		let $a=$(e.target);
		$a.addClass("activeA").parent().addClass("activeL").siblings().removeClass("activeL").children().removeClass("activeA");
		lazyLoad("../data/02-zizhuyou.php",`city=${$a.text()}`)
			.then(data=>addSectionRight(data,$seaPic))
		lazyLoad("../data/02-hotCity.php",`region=${$a.text()}`)
			.then(data=>addSectionLeft(data,$seaLeft));
		$seaPic.data("isFull","true");
	});

	/*
	*自然风景鼠标悬停时进行ajax请求
	*/
	$natureTitle.on("mouseover","li:not(.more)>a",e=>{
		let $a=$(e.target);
		$a.addClass("activeA").parent().addClass("activeL").siblings().removeClass("activeL").children().removeClass("activeA");
		lazyLoad("../data/02-zizhuyou.php",`city=${$a.text()}`)
			.then(data=>addSectionRight(data,$naturePic))
		lazyLoad("../data/02-hotCity.php",`region=${$a.text()}`)
			.then(data=>addSectionLeft(data,$natureLeft))
		$naturePic.data("isFull","true");
	});

	/*
	 *城市观光鼠标悬停时进行ajax请求
	 */
	$cityTitle.on("mouseover","li:not(.more)>a",e=>{
		let $a=$(e.target);
		$a.addClass("activeA").parent().addClass("activeL").siblings().removeClass("activeL").children().removeClass("activeA");
		lazyLoad("../data/02-zizhuyou.php",`city=${$a.text()}`)
			.then(data=>addSectionRight(data,$cityPic))
		lazyLoad("../data/02-hotCity.php",`region=${$a.text()}`)
			.then(data=>addSectionLeft(data,$cityLeft))
		$cityPic.data("isFull","true");
	});

	/*
	 *超级自由行鼠标悬停时进行ajax请求
	 */
	$superGoTitle.on("mouseover","li:not(.more)>a",e=>{
		let $a=$(e.target);
		$a.addClass("activeA").parent().addClass("activeL").siblings().removeClass("activeL").children().removeClass("activeA");
		lazyLoad("../data/00-dataInquiry.php",`table=02_free&classify=${$a.text()}`)
			.then(data=>addSectionRight(data,$superGoPic,"杭州出发"))
		$superGoPic.data("isFull","true");
	});

	/**
	*用于请求数据
	*/
	function lazyLoad(urlStr,query){	
		return new Promise(resolve=>{
			$.ajax({
				url:urlStr,
				type:"GET",
				data:query,
				success:data=>resolve(data),
				error:function(){
					console.log("ajax请求失败，请检查");
				}
			})
		});
	}

	/**
	*用于Section右侧图片部分的html拼接
	*/
	function addSectionRight(data,$elem,content){
		let html="";
		for(let obj of data){
			html+=`
				<li>
					<div>
						<a href="detail.html">
							<img src="../${obj.img}">
						</a>
						<div class="inText">
							${obj.title}	
						</div>
					</div>
					<p>
						<span>￥</span>
						<span class="money">${obj.price.slice(0,-3)}</span>
						<span>起</span>
						<span class="satisfaction">
			`;
			if(content){
				html+=content;
			}else{
				html+=`满意度：${obj.satisfaction}`;
			}
			html+=`</span>
					</p>
					</li>	
					`;
		}
		$elem.html(html);	
	}
	
	/**
	*用于Section左侧热门目的地的数据拼接
	*/
	function addSectionLeft(data,$elem){
		let html="";
		for(let obj of JSON.parse(data)){
			html+=`
				<li>
						<a href="javascript:;">${obj.hotArea}</a>
						<span>♥ ${obj.num}</span>
				</li>	
			`;
		}
		$elem.html(html);
	}
})());