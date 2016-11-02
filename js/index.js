//查看是否有用户记住登入密码

function autoPlay(){
   // var a = window.localStorage["user"];
    //var b = JSON.parse(a);
    //console.log(b.userID);
    var a = window.localStorage.getItem("user");
    var b = JSON.parse(a);
    var s = window.sessionStorage.getItem("user");
    var sData = JSON.parse(s);
    if(b||sData){
        $(".login").hide();
        $(".register").hide();
        if(b){
            $(".userN").html(b.userID).show();
        }else {
            $(".userN").html(sData.userID).show();
        }
        $(".unLogin").show();
    }else{
        hide();
    }
}
$(".unLogin").on("click",function () {
    hide();
    //退出登录清空localStorage,sessionStorage的数据
    window.localStorage.removeItem("user");
    window.sessionStorage.removeItem("user");
});

//隐藏用户及退出按钮，显示登陆注册按钮
function hide() {
    $(".userN").hide();
    $(".unLogin").hide();
    $(".login").show();
    $(".register").show();
}
var data = [
    {"name":"二等奖","id":0},
    {"name":"谢谢","id":1},
    {"name":"欢迎再来","id":2},
    {"name":"谢谢","id":3},
    {"name":"三等奖","id":4},
    {"name":"再接再厉","id":5},
    {"name":"谢谢","id":6},
    {"name":"谢谢回顾","id":7},
    {"name":"一等奖","id":8}
];
$(function(){
    /*初始化函数*/
    autoPlay();
    init();
    //过2秒才翻转
    setTimeout(function () {
        toBack();
    },2000);
});

function init(){
    createBox("gameBox",data);
    lucky();
}

//创建节点并渲染到页面上
function createBox(mainBox,data) {
    //尽量减少jquery选择器的使用次数
    var $gameBox = $("#"+mainBox);
    var $flag = true;
    for(var i =0;i<data.length;i++){
        (function(i){
            var $a = $('<span class="box"><span class="front">'+data[i].name+'</span><span class="back"></span></span>');
            $gameBox.append($a);
            $a.on("click",function(){
                var $userN = $(".userN").html();
                if($userN){
                    if($flag){
                        $flag = false;
                        if($(this).text()=="一等奖"){
                            if($(this).index()==8){
                                exchange(2,this);
                            }else{
                                exchange(8,this);
                            }
                        }
                        function exchange(index,box) {
                            var $box = $gameBox.children(".box");
                            //取值 如果有多个文本也要写具体点
                            var text = $box.eq(index).text();
                            //赋值一定要写具体节点对象
                            $box.eq(index).children(".front").text($(box).text());
                            $(box).children(".front").text(text);
                        }
                        var that = $(this);
                        //reversal(1,$(this));
                        //放在里面是为了不让你没点一下都发送一次请求
                        $.get("http://datainfo.duapp.com/lottery/fruitsubmit.php",{
                            "userID":$userN,
                            "fruit":data[i].id
                        },function (data) {
                            if(data==1){
                                console.log("数据提交成功");
                                reversal(1,that);
                            }else if(data==0){
                                alert("对不起，您已经抽过奖了");
                            }else if(data==2){
                                console.log("该用户可以抽奖");
                            }else {
                                console.log("数据提交失败");
                            }
                        });
                    }
                }else {
                    alert("亲，请先登录");
                }
            });
        })(i);
    }
}
//把中奖名单渲染到页面上
function lucky() {
    // $.getJSON("http://datainfo.duapp.com/lottery/getsuerfr.php?callback=?",function (data) {
    //     console.log(data);
    // });
    $.ajax({
        url:"http://datainfo.duapp.com/lottery/getsuerfr.php?callback=?",
        dataType:"jsonp",
        success:function (datas) {
            if(datas==0){
                $(".footer").append("<p>目前没有中奖名单</p>");
            }else {
                $.each(datas,function (i,o) {
                    (function (i) {
                        //console.log(1,data[o.fruit].name);
                        if(data[o.fruit].name=="一等奖"||data[o.fruit].name=="二等奖"||data[o.fruit].name=="三等奖"){
                            var $p = "<p>&nbsp;"+data[o.fruit].name+" "+"<span>"+o.userID+"</span>"+"&nbsp;<i>"+o.timer+"</i>"+"</p>";
                            $(".footer").append($p);
                        }
                    })(i);

                });
            }
        },
        error:function (data) {
            console.log(data);
        }
    });
}
//反转函数，支持参数，1为正面，0为反面,$el为要翻转的元素，JQ对象
function reversal(num,$el) {
    if(num){
        //正面
        $el.children(".front").css("transform","rotateY(0)").siblings().css("transform","rotateY(180deg)");
    }else {
        //反面
        $el.children(".front").css("transform","rotateY(180deg)").siblings().css("transform","rotateY(0deg)");
    }
}

//全反转背面
function toBack() {
    //获取box盒子的节点对象
    var $box = $("#gameBox .box");
    //遍历$box，是每一个度翻转
    $box.each(function (i,o) {
        reversal(0,$(o));
    });
    //翻转后，打乱顺序
    chaotic($box);
}
function chaotic(box) {
    box.sort(function () {
        return Math.floor(Math.random()*3)-1;
    });
    $("#gameBox").append(box);
}
