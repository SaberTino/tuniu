/**
*此文件用于头部搜索框
*/
$((()=>{
	let $input=$("input[name=search]");
	let $ul=$input.next();
	$(document).on("click",()=>$ul.hide());	
	$input.keyup(e=>{	
		let reg=/\s+/;
		if($input.val()!="" && !reg.test($input.val())){
			if(e.keyCode!=38 && e.keyCode!=40 && e.keyCode!=13){
				$.ajax({
					url:"data/header_search.php",
					type:"GET",
					data:`kw=${$input.val()}`,
					success:data=>{
						let html="";
						if(JSON.parse(data).length!=0){
							for(let obj of JSON.parse(data)){
									html+=`
										<li>${obj.title.slice(0,23)}......</li>	
									`;
							}
							$ul.html(html).show().on("mouseover",e=>{
								$input.val(`${$(e.target).text().slice(0,17)}...`);
							});
						}			
					},
					error:()=>console.log("ajax请求失败！请检查！")
				}).then(()=>$ul.on("click","li",()=>location="html/02-zizhuyou.html"))
			}
		}else{
			$ul.hide();
		}
	}).on("keydown",e=>{
		let $focusLi=$("li.focus");
		let $firstLi=$ul.children().first();
		let $lastLi=$ul.children().last();
		if(!$ul.is(":hidden") && !$ul.is(":empty")){
			if(e.keyCode==38 || e.keyCode==40){
				if($focusLi.length==0){
					$firstLi.addClass("focus");
				}else{
					switch(e.keyCode){
						case 38:
							if($focusLi[0]===$firstLi[0]){
								$focusLi.removeClass("focus");
								$lastLi.addClass("focus");
							}else{
								$focusLi.removeClass("focus").prev().addClass("focus");
							}
							break;
						case 40:
						if($focusLi[0]===$lastLi[0]){
							$focusLi.removeClass("focus");
							$firstLi.addClass("focus");
						}else{
							$focusLi.removeClass("focus").next().addClass("focus");
						}
						break;
					}
				}
				$input.val(`${$("li.focus").text().slice(0,17)}...`);
			}else if(e.keyCode==13){
				location="html/02-zizhuyou.html";
				$input.val(`${$("li.focus").text().slice(0,17)}...`);
			}
		}
	});
})());