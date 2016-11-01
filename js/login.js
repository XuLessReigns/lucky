$(function () {
    $("#btn1").on("click",function () {
        if($("#user").val()==""||$("#user").val()==" "||$("#pwd").val()==""||$("#pwd").val()==" "){
            alert("用户名或密码不能为空!");
        }else{
            $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
                "status":"login",
                "userID":$("#user").val(),
                "password":$("#pwd").val()
            },function (data) {
                var $str = data.substr(0,1);
                if($str=="{"){
                    console.log("登陆成功");
                    var $obj = {
                        "userID":$("#user").val(),
                        "password":$("#pwd").val()
                    };
                    $obj = JSON.stringify($obj);
                    console.log($obj);
                    if($("#autoPlay").get(0).checked){
                        window.localStorage.setItem("user",$obj);
                    }else {
                        window.localStorage.removeItem("user");
                    }
                    window.sessionStorage.setItem("user",$obj);
                    window.location.href = "index.html";
                }else if(data==0){
                    console.log("用户名不存在");
                }else if(data==2){
                    console.log("用户名密码不符");
                }
            });
        }
    });
    $("#check").on("click",function () {
        //$("#check").get(0).checked
        //$("#check").is(":checked")
        if($("#check").is(":checked")){//选中
           $("#pwd").attr("type","text");
        }else{//没选中
            $("#pwd").attr("type","password");
        }
    });

});