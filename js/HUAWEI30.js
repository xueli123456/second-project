class Magnifier{
		constructor(newSamllBox,newBigBox,newMask) {
		    this.oSmallBox = newSamllBox;
			this.oBigBox = newBigBox;
			this.oMask = newMask;
		}
		onmouseover(){
			let that = this;
			this.oSmallBox.onmouseover = function(){
				that.oMask.style.display = "block";
				that.oBigBox.style.display = "block";
			}
		}
		
		onmouseout(){
			let that = this;
			this.oSmallBox.onmouseout = function(){
				that.oMask.style.display = "none";
				that.oBigBox.style.display = "none";
			}
		}
		
		onmousemove(){
			let that = this;
			this.oSmallBox.onmousemove = function(evt){
				let e = evt || event;
				let left = e.pageX - this.offsetLeft - that.oMask.offsetWidth;
				let top = e.pageY - this.offsetTop - that.oMask.offsetHeight;
				if(left < 0){
					left = 0;
				}
				let maxLeft = this.offsetWidth - that.oMask.offsetWidth;
				if(left > maxLeft){
					left = maxLeft;
				}
				
				if(top < 0){
					top = 0;
				}
				
				let maxTop= this.offsetHeight - that.oMask.offsetHeight;
				
				if(top > maxTop){
					top = maxTop;
				}
				that.oMask.style.left = left + "px";
				that.oMask.style.top = top + "px";		
				let x = that.oBigBox.offsetWidth*left/that.oMask.offsetWidth;
				let y = that.oBigBox.offsetHeight*top/that.oMask.offsetHeight;	
				that.oBigBox.style.backgroundPositionX = -x + "px";
				that.oBigBox.style.backgroundPositionY = -y + "px";
			}
		}
	}
$(".det_proinfProm").hover(function(){
	setTimeout(function(){
		$(".det_proinfProm").css({ maxHeight: "1000px"});
		$("#promBtn").hide();
		$(".det_proinfPartsHid").show();
	},200)
},function(){
	$("#promBtn").show();
	$(".det_proinfPartsHid").hide();
})
$(".del_proPulTop").hover(function(){
	$(".del_kong").show();
},function(){
	$(".del_kong").hide();
})
$(".box-cancel").click(function(){
	$(".ol_box_mask").hide();
	$(".del-boxct").hide();
})
$(".product-button01").click(function(){
	$(".del-boxct").show();
	$(".ol_box_mask").show();
})
$(".del-box-close").click(function(){
	$(".ol_box_mask").hide();
	$(".del-boxct").hide();
})

class Cart{
        constructor(){

        }
        //增加货物:改变小计和数量
        goodsAdd(){
           //商品数量
            let oGoodsNum = document.getElementById("goods-num2"); 
            //修改数量
            oGoodsNum.value =  +oGoodsNum.value + 1;
            if(oGoodsNum.value>1){
            	$("#pro-quantity-minus").css({ cursor:"pointer",color: "#777"});
            } 

            if (oGoodsNum.value == 1) {
                $("#pro-quantity-minus").css({ cursor:"not-allowed"});
            }
        }
       
        //减少货物:改变小计和数量
        goodsSub(){
        	//商品数量
             let oGoodsNum = document.getElementById("goods-num2"); 
            //商品名称
            if(oGoodsNum.value>1){
            	$("#pro-quantity-minus").css({ cursor:"pointer", color: "#777"});
                oGoodsNum.value = +oGoodsNum.value - 1;   
            } 
            if (oGoodsNum.value == 1) {
                $("#pro-quantity-minus").css({ cursor:"not-allowed",color:"#c4c4c4"});
            }
        }
        //点击按钮添加到购物车中
        addGoods(name,num){
        	//获取需要添加商品名称
	        let oGoodsName = document.getElementById("goods2");
	        //商品数量
            let oGoodsNum = document.getElementById("goods-num2").value;
             if(oGoodsNum >1){
            	$("#pro-quantity-minus").css({ cursor:"pointer", color: "#777"});
            }
            let ls = localStorage; 
            for(let i = 0; i < ls.length; i++){
                    let name = ls.key(i);
                    let arr = ls.getItem(ls.key(i)).split(",");
                    let num = arr[0]; 
	                if(name == oGoodsName.innerHTML){
		        	   oGoodsNum =  +oGoodsNum + Number(num) ;
		            }
            }
        	//获取需要添加商品单价
	        let oGoodsPrice = document.getElementById("pro-price2");
	        let oGoodsSave = document.getElementById("save-price").innerHTML; 
	        let goodsSave = +oGoodsSave *oGoodsNum;
	        let goodsSubTotal = oGoodsNum* Number(oGoodsPrice.innerHTML);
	        let url = $("#del2-img").attr("src");
            this.setItem(oGoodsName, oGoodsNum,oGoodsPrice,goodsSave,goodsSubTotal,url);
            if (oGoodsNum == 1){
                $("#pro-quantity-minus").css({ cursor:"not-allowed",color:"#c4c4c4"});
            }
        }  
        //绑定事件
        eventBind(){
            let oProplus = document.getElementById("pro-quantity-plus");
            let oProminus = document.getElementById("pro-quantity-minus");
            let oAddgoods1 = document.getElementById("add-goods2");
            let that = this;
            oProminus.onclick = function(){
                        that.goodsSub();
                    }
            oProplus.onclick = function(){
                        that.goodsAdd();
                    }
            oAddgoods1.onclick = function(){
            	let ls = localStorage; 	
            	 that.addGoods();
            }
        }
          //存储localStorage
        setItem(name,num,price,discount,subtotal,url){
            let goodsArr = [num,price.innerHTML,discount,subtotal,url];
            let ls = localStorage;
            ls.setItem(name.innerHTML,goodsArr);
            if(num.value == 0) {
                ls.removeItem(name.innerHTML);
            }
        }
    }
// let ls = localStorage;
//  ls.clear();
//  详情页滚动条
    $(function (){
	    var topHeight = $("header").height();
	    var navHeight = $(".xl_honorNav").height();
	    var smaHeight = $(".xl_smallNav").height();
	    var rigHeight = $('.det_proRigCon').height();
        var fheight = topHeight + navHeight + smaHeight ; // 获取底部及底部上方边距的总高度
        var boxfixed = $(".det_proLeftImg"); // 获取固定容器的jquery对象
        $(window).scroll(function (){
            var scrollTop = $(window).scrollTop(); // 获取滚动条滚动的高度
            var contLeftTop = $('.det_proRigCon').offset().top; // 右侧列表相对于文档的高度
            var scrollBottom = fheight + rigHeight  - $(window).scrollTop() - boxfixed.height();
            if(scrollTop >= contLeftTop){
                if(scrollBottom < fheight) { // 滚动条距离底部的距离大于fheight,添加tab_fix类,否则添加tab_fix_bottom类
                    boxfixed.addClass('tab_fix');
                } else{
                    boxfixed.removeClass('tab_fix');
                }
            }else{
                boxfixed.removeClass('tab_fix');
            }
        });
    });
    

