var data=["二等奖","谢谢","谢谢","一等奖","谢谢","谢谢","三等奖","谢谢","谢谢"];
//键值对数据格式[{name:"二等奖"，id:0},{name:"谢谢"，id:1},{name:"谢谢"，id:2},{name:"一等奖"，id:3},]
$(function(){
	init();
	//chaotic();
})

/*初始化函数*/
function init(){
	createBox("gameBox",data);
	setTimeout(function(){
		toback();
	},2000);
}

function createBox(mianBox,data){
	//尽量减少jquery选择器的使用次数
	var $gameBox=$("#"+mianBox);
	
	//<span class="box"><span class="front">1</span><span class="back"></span></span>
	for(var i=0;i<data.length;i++){
		;(function(i){
			var $a=$('<span class="box"><span class="front">'+data[i]+'</span><span class="back"></span></span>')
			$gameBox.append($a);
			$a.on("click",function(){
				console.log($(this).text());
				if($(this).text()=="一等奖"){
					if($(this).index()==8){
						exchange(2,this);
					}else{
						exchange(8,this);
					}
				}
				function exchange(index,box){
					var $box=$gameBox.children(".box");
					var text=$box.eq(index).text();
						//console.log(text);
						$box.eq(index).children(".front").text($(box).text());
						$(box).children(".front").text(text);
				}
				reversal(1,$(this));
			})
		})(i)
		
	}

}
//反转函数，支持参数，1为账面，0为反面,$EL为要翻转的元素，JQ对象
function reversal(code,$EL){
	if(code){
		$EL.children(".front").css("transform","rotateY(0deg)").siblings().css("transform","rotateY(180deg)");
	}else{
		$EL.children(".front").css("transform","rotateY(180deg)").siblings().css("transform","rotateY(0deg)");
	}
}

//全反转背面
function toback(){
	var $box=$("#gameBox .box");
	$box.each(function(){
		reversal(0,$(this));
	});
	//console.log($box);
	chaotic($box);
}

function chaotic(box){
	
	//console.log(box);
	box.sort(function(){
		var arr=[1,0,-1];
		return arr[Math.floor(Math.random()*3)];
	})
	$("#gameBox").append(box);
	//console.log(data);
}
