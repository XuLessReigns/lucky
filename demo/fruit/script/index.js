$(function(){
	setTimeout(function(){
		init();
	},2000)
	
	$("#gameBox .box").on("click",function(){
		$(this).children(".front").text(roll()).css("transform","rotateY(0deg)").siblings().css("transform","rotateY(180deg)");
		
	})
})

function init(){
	$("#gameBox .box .front").css("transform","rotateY(180deg)").siblings().css("transform","rotateY(0deg)");
}

function roll(){
	return Math.ceil(Math.random()*9);
}
