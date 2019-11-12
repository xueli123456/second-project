 export function login(){
	$(".loginTitle-left").click(function(){
		$(".xl_loginAcc").show();
		$(".xl_loginEr").hide();
		$(".loginTitle-left").css({color:"#b40707"});
		$(".loginTitle-right").css({color:"#333" });
	})
	$(".loginTitle-right").click(function(){
		$(".xl_loginAcc").hide();
		$(".xl_loginEr").show();
		$(".loginTitle-left").css({color:"#333"});
		$(".loginTitle-right").css({color:"#b40707" });
		
	})
	$(".qrCode-main").hover(function(){
	   $("#qrcodeImg").hover(function(){
			$(this).css({left:"20px"});
			$(".qrCode-help").css({ opacity: 1});
		})	
	},function(){
		$("#qrcodeImg").css({left:"112px"});
		$(".qrCode-help").css({ opacity: 0});
	})
	$(".remember_name").hover(function(){
		$(".remeberTip").show();
	},function(){
		$(".remeberTip").hide();
	})
	let i=0;
	$(".remember_name").click(function(){
		i++;
		if(i%2 == 1){
			$(".checkBox-icon").css({ backgroundImage: "url(./login-img/tick-on-18.png)"})
		}else{
			$(".checkBox-icon").css({ backgroundImage: "url(./login-img/tick-off-18.png)"})
		}
	})
	let a=0;
	$(".btn-more").click(function(evt){
		var e = evt || event;
		e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
		a++;
		if(a%2 ==1 ){
			$(".set-more").show();
		}else{
			$(".set-more").hide();
		}
	})
	$(document).click(function(){
		a++;
	   $(".set-more").hide();
	})
	
	$("#login_userName").on('blur',function(){
		var thisVal=$(this).val();
		if(thisVal !=""){
			var str =  $("#login_userName").val();
		    $(this).prev("label").hide();
		    var reg = /^.{4,50}$/;
			if(reg.test(str)){
				flagName = true;
				$(".xl_loginAcc_err").hide();
			}else{
				$(".xl_loginAcc_err").show();
				$(".xl_loginAcc_errc").html("华为帐号限制在4~50 个字符");
			}
		  }else{
		  	  $(".xl_loginAcc_err").hide();
		  	  $(this).prev("label").show();
		  }
	})
	let flagName = false;
	$(".user-input-tr").children("input").on('input',function(){
		$(".xl_loginAcc_err").hide();
		var thisVal=$(this).val();
		if(thisVal !=""){
			var str =  $("#login_userName").val();
		    $(this).prev("label").hide();
		  }else{
		  	$(".xl_loginAcc_err").hide();
		  	  $(this).prev("label").show();
		  }
	})
	$(".button-login").click(function(){
		if($("#login_userName").val() ==""){
			$(".xl_loginAcc_err").show();
			$(".xl_loginAcc_errc").html("请输入您的账号");
		}else{
			flagName = true;
		}
	})
    $(".button-login").click(function(){
    	let name = $("#login_userName").val();
		let pwd = $("#login_password").val();
		$.ajax('',{
				url:"login.php",
				data:{
					username:name,
					password:pwd
				},
				type:'post',
				success:function(data){
	//				前后端分离
					if(data == 0){
						$(".xl_loginAcc_err").show();
				        $(".xl_loginAcc_errc").html("账号或者密码错误");
					}else{
						window.sessionStorage.setItem("username",name);
                        window.sessionStorage.setItem("password",pwd);
                        $(".xl_loginBox").hide();
						$(".ol_box_mask").show();
						$(".log-sucess").show();
						setTimeout(function(){
						   location.href ="index.html";
						},1000);
				}
                console.log(data);
			  }
	      });	
     }) 
 
}
  