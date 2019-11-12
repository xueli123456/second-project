 //top
 export function acc(){
 	 $(".xl_topConLeftBlock").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    $(".xl_topConRightBlock").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    $(".xl_topConRightBlock2").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
      $(".xl_topConRightBlock3").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    
//nav
   $(".xl_navMidImg").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    $(".xl_navRightSearch").hover(function(){
        $(this).css({borderColor:"#c9c9c9"});
    },function(){
       $(this).css({border:"1px solid #f0f0f0"});
    });
    //轮播图
    $(function(){
		let i = 0;
		$(".btn ul li").hover(function(){
		    $(this).addClass("one").siblings().removeClass("one");
		    i=$(this).index();
		    $(".oimg ul li").eq(i).stop().fadeIn().show().siblings().stop().fadeOut().hide();
       });
		//  用来选择图片
		function autoplay(){
		    $(".btn ul li").eq(i).addClass("one").siblings().removeClass("one");       
		//      获取标签.eq匹配图片和原点.停止动画.加淡入特效.让匹配上的图片显示.筛选是否正确.停止动画.淡出.隐藏
		    $(".oimg ul li").eq(i).stop().fadeIn(1000).show().siblings().stop().fadeOut(1000).hide();
		}
		let t;
		function showTime(){
			t = setInterval(function() {  //间隔3秒，图片实现自动轮播
					i++;
					if(i == 6) {
						i = 0;
					}
					autoplay();
				}, 3000);
		}
		t = setInterval(autoplay(),3000);
		//对我的鼠标是否悬停在父标签的状态做一个判断
		$(".box").hover(function(){
		    clearInterval(t);
		},function(){
		    showTime();
		});
		// 1、点击右箭头：让当前图片的下一张图片淡入，其他图片淡出。
		$("#btn-next").click(function(){
			clearInterval(t);
			i++;
			if(i > 5) {
				i = 0;
			}
			autoplay();
		});
		// 2、单击左箭头：让当前图片的上一张图片淡入，其他图片淡出。
		$("#btn-previous").click(function(){
			clearInterval(t);
			i--;
			if(i == -1) {
				i = 5;
			}
			autoplay();
		});
		showTime();
	});	
	///侧边栏
	$(".xl_sortListc").each(function(){
		$(this).hover(function(){
			$(this).addClass("hover");
			$(this).children().eq(0).addClass("active");
			$(this).css({backgroundColor:"#FFF !important"});
			$(this).children().eq(0).children().eq(0).css({borderBottom:0});
			$(this).children().eq(0).children().eq(1).show();
		},function(){
			$(this).remove("hover");
			$(this).children().eq(0).children().eq(1).hide();
			$(this).children().eq(0).children().eq(0).css({borderBottom:"1px solid rgba(0, 0, 0, 0.06)"});
		});
	});
    //精品推荐结束开始
         function tabPage(tabPage){
            var pageMain = $(tabPage.pageMain);
            /*获取内容列表*/
            var pagePrev = $(tabPage.pagePrev);
            /*上一页*/
            var pageNext = $(tabPage.pageNext);
            /*下一页*/
            var curNum = tabPage.curNum;
            /*每页显示数*/
            var len = Math.ceil(pageMain.find("li").length / curNum);
            /*计算总页数*/
            console.log(len);
            let iNum = 0;
            /*当前的索引值*/
            /*下一页*/
            let vleft;
            if(pageMain.width()<=470 && pageMain.width()>0 ){
            	 pagePrev.css({cursor:"not-allowed"});
            	 pageNext.click(function (){
            	 	pageNext.css({cursor:"pointer",color:"#333"});
            	    pagePrev.css({cursor:"pointer",color:"#333"});
            	 	iNum++;
            	 	for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++){
	                	vleft = -154* iNum;
	                	pageMain.css( "transform","translate3d(" + vleft + "px,0,0)");
                    }
            	 	if(iNum == len - 1){
	            	   pageNext.css({cursor:"not-allowed",color:"#969696"});
	            	   return false;
                    }
            	});
            	pagePrev.click(function (){
	                pageNext.css({cursor:"pointer",color:"#333"});
	                iNum--;
	                for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
	                	if(iNum == 1){
	                		vleft = -154;
	                	}else{
	                		vleft = 154* iNum;
	                	}
	                	pageMain.css( "transform","translate3d(" + vleft + "px,0,0)");
	                }
	                if (iNum == 0) {
	                    pagePrev.css({cursor:"not-allowed",color:"#969696"});
	            	    return false;
	                }
	                
	            });
            	
            }else{
            	pagePrev.hide();
                pageNext.click(function (){
		                pagePrev.show();
		                pageNext.show();
		                iNum++;
		                for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++){
		                	vleft = -1215* iNum;
		                	pageMain.css( "transform","translate3d(" + vleft + "px,0,0)");
		                }
		                if(iNum == len - 1){
		            	   pageNext.hide();
		            	   return false;
		                }    
                });
	            if(iNum>0) {
	                pagePrev.show();
	            }
             /*上一页*/
	            pagePrev.click(function (){
	                pageNext.show();
	                iNum--;
	                for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
	                	if(iNum == 1){
	                		vleft = -1215;
	                	}else{
	                		vleft = 1210* iNum;
	                	}
	                	pageMain.css( "transform","translate3d(" + vleft + "px,0,0)");
	                }
	                if (iNum == 0) {
	                    pagePrev.hide();
	                   return false;
	                }
	                
	            });
            }
           
       }
        tabPage({
            pageMain: '.xl_recFootConUl',
            pagePrev: '.xl_rec-btn-prev',
            pageNext: '.xl_rec-btn-next',
            curNum: 5, /*每页显示的条数*/
            ini: 0/*初始化显示的页面*/
        });
       //智能穿戴分页开始
        tabPage({
            pageMain: '.xl_smtSortConUl',
            pagePrev: '.xl_smt-btn-prev',
            pageNext: '.xl_smt-btn-next',
            curNum: 6, /*每页显示的条数*/
            ini: 0/*初始化显示的页面*/
        });
        //智能家居
         tabPage({
            pageMain: '.xl_smartHomeConUl',
            pagePrev: '.xl_home-btn-prev',
            pageNext: '.xl_home-btn-next',
            curNum: 6, /*每页显示的条数*/
            ini: 0/*初始化显示的页面*/
        });
        //热销配件
         tabPage({
            pageMain: '.xl_hotSellConUl',
            pagePrev: '.xl_hot-btn-prev',
            pageNext: '.xl_hot-btn-next',
            curNum: 6, /*每页显示的条数*/
            ini: 0/*初始化显示的页面*/
        });
        //生态精品
         tabPage({
            pageMain: '.xl_qualityConUl',
            pagePrev: '.xl_quality-btn-prev',
            pageNext: '.xl_quality-btn-next',
            curNum: 6, /*每页显示的条数*/
            ini: 0/*初始化显示的页面*/
        });
//      友情链接
        tabPage({
            pageMain: '.friendLinkUl',
            pagePrev: '.friendLink-prev',
            pageNext: '.friendLink-next',
            curNum: 1, /*每页显示的条数*/
            ini: 0/*初始化显示的页面*/
        });
  
 //小轮播图开始
    $(function(){
		let i = 0;
		$(".small-btn ul li").hover(function(){
		    $(this).addClass("small-one").siblings().removeClass("small-one");
		    i=$(this).index();
		    $(".small-banner-ul li").eq(i).stop().fadeIn().show().siblings().stop().fadeOut().hide();
       });
		//  用来选择图片
		function autoplay(){
		    $(".small-btn ul li").eq(i).addClass("small-one").siblings().removeClass("small-one");       
		//      获取标签.eq匹配图片和原点.停止动画.加淡入特效.让匹配上的图片显示.筛选是否正确.停止动画.淡出.隐藏
		    $(".small-banner-ul li").eq(i).stop().fadeIn(1000).show().siblings().stop().fadeOut(1000).hide();
		}
		let t;
		function showTime(){
			t = setInterval(function() {  //间隔3秒，图片实现自动轮播
					i++;
					if(i == 9) {
						i = 0;
					}
					autoplay();
				}, 3000);
		}
		t = setInterval(autoplay(),3000);
		//对我的鼠标是否悬停在父标签的状态做一个判断
		$(".box").hover(function(){
		    clearInterval(t);
		},function(){
		    showTime();
		});
		showTime();
	});		
	//服务
	$(".xl_serviceConbotR").children().each(function(index){
		$(this).hover(function(){
			$(this).css({opacity: 0.8});
		},function(){
			$(this).css({opacity: 1});
		});
		if(index == 0){
			$(this).hover(function(){
				$(".xl_serviceConboimg").show();
			},function(){
				$(".xl_serviceConboimg").hide();
			});
		}
	
	});
    //悬浮工具开始
    (function fun(){
    	 if($(window).scrollTop()>350){
    	 	$("#xl_fixedCon-a4").css({display:"block"});
    	 }else{
    	 	$("#xl_fixedCon-a4").css({display:"none"});
    	 }
         $(document).scroll(function(){
	    	if($(window).scrollTop()>350){
	    		$("#xl_fixedCon-a4").css({display:"block"});
	    			$("#xl_fixedCon-a4").click(function(){
	    			   scrollTop = 0;
	    		   });
	    	}
    	else{
    		$("#xl_fixedCon-a4").css({display:"none"});
    	}
      });
    }());  
    $(".xl_fixedCon").children().each(function(index){
    	$(this).hover(function(){
    		$(this).children().eq(0).show();
    		$(this).addClass("hover")
    	},function(){
    		$(this).children().eq(0).hide();
    	});
    });
//  弹出框
	$(function(){
		$(".xl_pleaseLogin").click(function(){
			  var name = window.sessionStorage.getItem("username");
    		  var pass = window.sessionStorage.getItem("password");
		      if(name !=null && pass!=null){
		      	     $(".log-sucess").html("您已登录,不能重复登录!");
			      	 $(".log-sucess").show();
	                 $(".ol_box_mask").show();  
	                setTimeout(function(){
						$(".log-sucess").hide();
	                    $(".ol_box_mask").hide();
					},1000);  
		      }
              else{
		      	  $(".xl_olBox").show();
                  $(".ol_box_mask").show();
		      }
        });
        $(".box-close").click(function(){
        	 $(".xl_olBox").hide();
        	 $(".ol_box_mask").hide();
        })
        
	});
 
 
 }
