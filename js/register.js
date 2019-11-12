
	$(".geetest").hover(function(){
		$(this).css({backgroundImage:"linear-gradient(360deg, #ffffff 0%,#f3f3f3 100%)"});
	},function(){
		$(this).css({backgroundImage:"linear-gradient(180deg, #ffffff 0%,#f3f3f3 100%)"});
	});

//表单验证
     var flagName = false;
     var flagSec = false;
     var flagYz = false;
     var flagPwd = false;
     var flagQPwd = false;
     //点击按钮验证
     $(".geetest").click(function(){
		flagSec = true;
		$(".geeSeccess").show();
	});  
 //账号验证
    $("#username").on('blur',function(){
     	var str =  $(this).val();
     	if(str !=""){
		    $(this).prev("label").hide();
		    var reg = /^1\d{10}$/;
			if(reg.test(str)){
				flagName = true;
				$("#msg_phone").html("");
				$(".phoneInput").removeClass("input-error-EMUI5");
			}else{
				$("#msg_phone").html("手机号不正确");
				$(".phoneInput").addClass("input-error-EMUI5");
			}
		  }
	});
	
//短信验证码
	$("#message").on('blur',function(){
	     	var str =  $(this).val();
	     	if(str !=""){
			    $(this).prev("label").hide();
			    var reg = /^1\d{10}$/;
			    var str = this.value;
                var strOld =$("#sCode").html();
			    if(str == strOld){
			       flagYz = true;
					$("#msg_message").html("");
					$(".message").removeClass("input-error-EMUI5");
			    }else{
			       $("#msg_message").html("验证码错误");
				   $(".message").addClass("input-error-EMUI5");
			       flagYz = false;
			    }
			}
	 });
	//验证码验证
	$(".get-code").click(function(){
		let code = yzm();
		$("#sCode").show();
		$("#randomCode").show();
	    $(".get-code").hide()
		$("#sCode").html(code);
	});
    function yzm(){
	     var str = "";
	     for(var i= 1;i<=4;i++){
	      var code = parseInt( Math.random()*122);
	      if(code>=58&&code<=64 || code>=91&&code<=96 || code>=0&&code<=47){
	        i--;
	      }else{
	        str += String.fromCharCode(code);
	      }
	     }
	     return str;
    }
    $("#randomCode").click(function(){
    	let zcode = yzm();
    	$("#sCode").html(zcode);
    });
    //密码验证
    $("#password").on('blur',function(){
    	var str = $(this).val();
    	if(str !=""){
	    	//纯数字 字母 特殊符号
		     var regNum = /^\d+$/;
		     var regLetter = /^[a-z]+$/i;
		     var regChar = /^[^0-9a-z]+$/i;
		     //包含空格 
		     var regKong = /\s+/;
		     //包含 数字 字母 特殊符号
		     var _regNum = /\d+/;
		     var _regLetter = /[a-z]+/i;
		     var _regChar = /[^0-9a-z]+/i;
	        if( str.length < 8 ){
		         $("#msg_pwd").html("至少包含8个字符");
		         $(".password").addClass("input-error-EMUI5");
		         return;
	        }else if(str.length >=8 && regNum.test(str) == true || str.length >=8 && regLetter.test(str) == true || str.length >=8 && regKong.test(str) == true ){
	        	 $("#msg_pwd").html("至少含字母和数字，不能包含空格");
	        	  $(".password").addClass("input-error-EMUI5");
		         return;
	        }else{
	        	 flagPwd = true;
	        	 $("#msg_pwd").html("");
				 $(".password").removeClass("input-error-EMUI5");
	        }
	    }	
    })
    //确认密码验证
    $("#qpassword").on('blur',function(){
    	 var strQpwd = $(this).val();
    	 var strPwd = $("#password").val();
    	 if( strQpwd != "" ){
    	 	if( strPwd == strQpwd ){
                flagQPwd = true;
                 $(".qpassword").removeClass("input-error-EMUI5");
                $("#msg_qpwd").html("");
	       }else{
	       	    $("#msg_qpwd").html("密码与确认密码不一致");
	       	    $(".qpassword").addClass("input-error-EMUI5");
	       }
	    }
    })
     
    //
    $(".input-content").children("input").on('input',function(){
		$(this).prev("label").hide();
		var thisVal=$(this).val();
		if(thisVal !=""){
			var str =  $("#username").val();
		    $(this).prev("label").hide();
		  }
          else{
		  	  $(this).prev("label").show();
		  	  $(this).parent().parent().removeClass("input-error-EMUI5");
		  	   $(this).parent().parent().next().html("");
		  }
	})
   
//	$("#username").on('blur',function(){
		
	
