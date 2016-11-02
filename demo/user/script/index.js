/*
 * 抽奖程序数据逻辑要求，要求用户提交前验证，用户名及密码不能为空，用户名必须是手机号码，注册时：密码必须由字母加数字组成并且6-16位，如果密码过于简单，请提示用户，从新数据密码。
 * 用户登录之后：要求记录用户登录状态，再次进入程序无需登录，除非用户推出当前登录。
 */
$(function(){
	//注册按钮添加事件
	$("#rigs").on("click",function(){
		//调用自定义用户数据交互接口函数，参数，（接口功能，回掉函数）
		userInfo("register",function(data){
			//console.log(data);
			if(data==1){
				console.log("注册成功！");
			}else if(data==0){
				console.log("用户重名，请重新输入！");
			}else{
				console.log("注册失败！");
			}
		})
	})
	//登录按钮添加事件
	$("#login").on("click",function(){
		userInfo("login",function(data){
			var text=data.substr(0,1);
			if(text=="{"){
				console.log("登录成功！");
			}else if(data==0){
				console.log("用户不存在！");
			}else if(data==2){
				console.log("用户名与密码不符！");
			}
		})
		
		
	})
	//定义用户数据交互接口函数，定义给window ,是为了将函数定义成全局的。
	window.userInfo=function(status,callback){
		//调用自定义验证函数，返回值，user对象
		var user=userValidate();
		console.log(user);
		//判断，验证函数是否有返回值，如验证成功才向服务器发送请求
		if(user){
			$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
			status:status,
			userID:user.userID,
			password:user.password
			},function(data){
				//console.log(typeof(callback));
				//console.log(JSON.parse(data));
				if(typeof(callback)=="function"){
					callback(data);
				}
			})
		}
		
	}
	//自定义验证函数
	window.userValidate=function(){
		var user={
			userID:$("#userID").val(),
			password:$("#password").val()
		}
		if(user.userID==""||user.userID==" "){
			alert("用户名不能为空！");
		}else{
			return user;
		}
	}

//	document.getElementById("rigs").onclick=function(){
//		console.log(this);
//	}

//事件委托机制，通过给父级元素添加事件，利用事件的冒泡机制，从而使所有的子元素都能响应到该事件，在通过判断，选择特定的元素来相应事件，并做相应处理，应用场景：想要给某一元素下的不定数量元素绑定事件时使用。
//	document.onclick=function(){
//		
//		 if(event.target.nodeName=="BUTTON"){
//		 	 console.log(event.target.nodeName);
//		 }
//	}
})
