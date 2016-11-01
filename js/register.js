$(function () {
    //用户名验证
    var $userName = $("#userName");//获取用户名节点对象
    $userName.on("focus",function (e) {
        checkUserName(e);
    }).on("blur",function (e) {
        checkUserName(e);
    }).on("keyup",function (e) {
        checkUserName(e);
    });
    function checkUserName(e) {
        //兼容
        var _e = window.event || e;
        var $v = $userName.val();//用户名的内容
        var $box = $userName.parent();
        var $tip = $userName.next();//获取信息提示容器的节点对象
        var $span = $tip.children();//获取信xd息提示的span节点对象
        //判断触发的事件类型
        if (_e.type == "focus") {//获取焦点事件
            if ($v.length == 0) {//文本框的内容为空时
                $tip.addClass("default").show();
                $span.html("请输入用户名");
                return false;
            }
        }
        if (_e.type == "blur") {
            if ($v.length == 0) {
                $tip.hide();
                $box.removeClass().addClass("box");
                return false;
            }
        }
        //其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
        if ($v.length == 0) {//文本框的内容为空时
            $tip.removeClass().addClass("tip").show();
            $box.addClass("box error");
            $span.html("用户名不能为空");
            return false;
        } else {//文本框的内容不为空时
            if (regExpManger.userNameReg.test($v)) {//规则正确
                $tip.hide();
                $box.removeClass().addClass("box");
                return true;
            } else {
                $box.addClass("box error");
                $tip.removeClass().addClass("tip").show();
                $span.html("用户名为手机号");
                return false;
            }
        }
    }
    /*-------------------密码验证--------------------*/
    var $pwd = $("#pwd");//获取用户名节点对象
    $pwd.on("focus",function (e) {
        checkPwd(e);
    }).on("blur",function (e) {
        checkPwd(e);
    }).on("keyup",function (e) {
        checkPwd(e);
    });
    function checkPwd(e){
        //兼容
        var _e = window.event||e;
        var $v = $pwd.val();//用户名的内容
        var $box = $pwd.parent();
        var $tip = $pwd.next();//获取信息提示容器的节点对象
        var $span = $tip.children();//获取信息提示的span节点对象
        //判断触发的事件类型
        if(_e.type=="focus"){//获取焦点事件
            if($v.length==0){//文本框的内容为空时
                $tip.addClass("default").show();
                $box.addClass("default");
                $span.html("密码有字母数字组成");
                return false;
            }
        }
        if(_e.type=="blur"){
            if($v.length==0){
                $tip.hide();
                $box.removeClass().addClass("box");
                return false;
            }
        }
        //其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
        if($v.length==0){//文本框的内容为空时
            $tip.removeClass().addClass("tip").show();
            $box.removeClass().addClass("box error");
            $span.html("密码不能为空");
            return false;
        }else{//文本框的内容不为空时
            if(regExpManger.pwdReg.test($v)){//规则正确
                if($v.length>=6&&$v.length<=16){//判断长度是否为6-20
                    $tip.hide();
                    $box.removeClass().addClass("box");
                    return true;
                }else{
                    $tip.removeClass().addClass("tip").show();
                    $box.removeClass().addClass("box error");
                    $span.html("长度只能在6-16个字符之间");
                    return false;
                }
            }else{//规则不正确
                $tip.removeClass().addClass("tip").show();
                $box.removeClass().addClass("box error");
                $span.html("格式错误，不支持汉字，6-20个字符!!!");
                return false;
            }
        }
    }
    /*----------------------------------确认密码---------------------------------*/
    var $tpwd = $("#tpwd");//获取用户名节点对象
    $tpwd.on("focus",function (e) {
        checkTpwd(e);
    }).on("blur",function (e) {
        checkTpwd(e);
    }).on("keyup",function (e) {
        checkTpwd(e);
    });
    function checkTpwd(e){
        //兼容
        var _e = window.event||e;
        var $v = $tpwd.val();//用户名的内容
        var $box = $tpwd.parent();
        var $tip = $tpwd.next();//获取信息提示容器的节点对象
        var $span = $tip.children();//获取信息提示的span节点对象
        //判断触发的事件类型
        if(_e.type=="focus"){//获取焦点事件
            if($v.length==0){//文本框的内容为空时
                $tip.addClass("default").show();
                $box.addClass("default");
                $span.innerHTML = "请再次输入密码";
                return false;
            }
        }
        if(_e.type=="blur"){
            if($v.length==0){
                $tip.hide();
                $box.removeClass().addClass("box");
                return false;
            }
        }
        //其他情况（用户点击按钮btn.onclick和输入onkeyup的时候）
        if($v.length==0){//文本框的内容为空时
            $tip.removeClass().addClass("tip").show();
            $box.removeClass().addClass("box error");
            $span.html("确认密码不能为空");
            return false;
        }else{//文本框的内容不为空时
            if($pwd.val()==$v){//密码一致
                $box.removeClass().addClass("box");
                $tip.hide();
                return true;
            }else{//密码不一致
                $tip.removeClass().addClass("tip").show();
                $box.removeClass().addClass("box error");
                $span.html("两次输入的密码不一致");
                return false;
            }
        }
    }
    /*------------------------------------获取注册按钮--------------------------------*/
    var $btn = $("#btn");
    $btn.on("click",function () {
        if(checkUserName()&&checkPwd()&&checkTpwd()) {//利用&&的短路实现追踪
           $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
               "status":"register",
               "userID":$("#userName").val(),
               "password":$("#pwd").val()
           },function (data) {
               if(data==0){
                   console.log("用户名重名");
               }else if(data==1){
                   console.log("注册成功");
                   window.location.href = "login.html";
               }else{
                   console.log("注册失败");
               }
           });
        }
    });
});