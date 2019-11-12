	//2.localStorage模拟购物车	
class Cart{
        constructor(){

        }
        //计算购物车中货物的数量
        getGoodsNum(){
            let oGoodsNum = document.getElementsByClassName("goods-num");
            let oGoodsTotalNum = document.getElementById("goods-total-num");
            let goodsTotalNum = 0;
            for(let i=0; i<oGoodsNum.length; i++){
                goodsTotalNum += +(oGoodsNum[i].value);
            }
            oGoodsTotalNum.innerHTML = goodsTotalNum;
        }
        //计算购物车中的货物的总计花费
        getGoodsPrice(){
        	//小计
            let oGoodsPrice = document.getElementsByClassName("goods-price");
            let oGoodsTotalPrice = document.getElementById("goods-total-price");
            let goodsTotalPrice = 0;
            for(let i=0; i<oGoodsPrice.length; i++){
                goodsTotalPrice += +(oGoodsPrice[i].innerHTML);
            }
            oGoodsTotalPrice.innerHTML = goodsTotalPrice;
        }
        //计算小计
        goodsSubTotal(num,price){
        	let subTotal = num*price
        	let s = Number(subTotal).toFixed(2);
//          let dis = Number(discount).toFixed(2);
            return s;
        }
        //获取url
//      计算折扣
        goodsDiscount(num,discount){
        	let d = num * 200;
            return Number(d).toFixed(2);
        }
        
        //计算总折扣
        goodsTotalDiscount(){	
            let oGoodsSave = document.getElementsByClassName("p-price-save");
            let oGoodsTotalSave = document.getElementById("goods-total-discount");
            let goodsTotalSave = 0;
            for(let i=0; i<oGoodsSave.length; i++){
                goodsTotalSave += +(oGoodsSave[i].innerHTML);
            }
            oGoodsTotalSave.innerHTML = goodsTotalSave;
        }
        //存储localStorage
        setItem(name,num,price,discount,subtotal,url){
	        let goodsArr = [num.value,price.innerHTML,discount.innerHTML,subtotal.innerHTML,url];
	        let ls = localStorage;
	        ls.setItem(name.innerHTML,goodsArr);
	        if(num.value == 0) {
	            ls.removeItem(name.innerHTML);
	        }
        }
        //增加货物:改变小计和数量
        goodsAdd(btn){ 
        	//商品数量
            let oGoodsNum =btn.parentNode.previousElementSibling;
            //商品名称
            let oGoodsName = oGoodsNum.parentNode.parentNode.parentNode.parentNode.children[0].children[0];  
           //修改数量
            if(oGoodsNum.value>1){
            	$(btn).css({ cursor:"pointer",color: "#777"});
            }
            oGoodsNum.value =  +oGoodsNum.value + 1;
            if(oGoodsNum.value>1){
            	$(btn).css({ cursor:"pointer",color: "#777"});
            }
            //修改小计
            //单价
            let oGoodsPrice = oGoodsName.parentNode.nextElementSibling.children[0].children[1];
            //小计
            let oGoodsSubTotal = btn.parentNode.parentNode.parentNode.parentNode.nextElementSibling.children[1];
            oGoodsSubTotal.innerHTML= this.goodsSubTotal( oGoodsNum.value,oGoodsPrice.innerHTML);
             
			//计算折扣
			let oGoodsSave = oGoodsSubTotal.nextElementSibling.nextElementSibling;
            oGoodsSave.innerHTML= this.goodsDiscount(oGoodsNum.value,oGoodsSave.innerHTML);
            this.getGoodsPrice();
            this.getGoodsNum();
            this.goodsTotalDiscount();
            if (oGoodsNum.value == 1) {
                $(btn).css({ cursor:"not-allowed"});
            }
            //存储
            let oImg = btn.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.children[0];
            let url = $(oImg).attr("src");
            this.setItem(oGoodsName,oGoodsNum,oGoodsPrice,oGoodsSave,oGoodsSubTotal,url);
        }
        //减少货物:改变小计和数量	
        goodsSub(btn){
        	//商品数量
            let oGoodsNum = btn.parentNode.previousElementSibling; 
            //商品名称
            let oGoodsName = oGoodsNum.parentNode.parentNode.parentNode.parentNode.children[0].children[0];
            
            if(oGoodsNum.value>1){
            	$(btn).css({ cursor:"pointer", color: "#777"});
                oGoodsNum.value = +oGoodsNum.value - 1;   
            } 
            //修改小计
            //获取单价
            let oGoodsPrice = oGoodsName.parentNode.nextElementSibling.children[0].children[1];
//          获取小计
            let oGoodsSubTotal = btn.parentNode.parentNode.parentNode.parentNode.nextElementSibling.children[1];
            oGoodsSubTotal.innerHTML = this.goodsSubTotal( oGoodsNum.value,oGoodsPrice.innerHTML);
            //计算折扣
			let oGoodsSave = oGoodsSubTotal.nextElementSibling.nextElementSibling;
            oGoodsSave.innerHTML= this.goodsDiscount(oGoodsNum.value,oGoodsSave.innerHTML);
            this.getGoodsPrice();
            this.getGoodsNum(); 
            this.goodsTotalDiscount();
            let oImg = btn.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.children[0];
            let url = $(oImg).attr("src");
            this.setItem(oGoodsName,oGoodsNum,oGoodsPrice,oGoodsSave,oGoodsSubTotal,url);
            if (oGoodsNum.value == 0){
                oGoodsName.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
            }
            if (oGoodsNum.value == 1){
                $(btn).css({ cursor:"not-allowed",color:"#c4c4c4"});
            }
        }
        //删除货物
        goodsDel(btn){
            let div = btn.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            let sub = btn.parentNode.parentNode.children[2].children[0].children[0].children[1].children[0];
            let num = btn.parentNode.parentNode.children[2].children[0].children[0].children[0];
            num.value = 0;
            this.goodsSub(sub);
            div.remove();
            this.getGoodsPrice();
            this.getGoodsNum(); 
            let ls = localStorage; 
            if(ls.length<=0){
            	$(".cart-list").hide();
                $(".cart-empty").show();
            }

        }
       
        //绑定事件
        eventBind(){
        	let oSubBtn =document.getElementsByClassName("sub-btn"); 
            let oAddBtn =document.getElementsByClassName("add-btn"); 
            let that = this;
            for(let i=0; i<oSubBtn.length; i++){
                oSubBtn[i].onclick = function(){
                    that.goodsSub(this);
                }
            }
             for(let i=0; i<oAddBtn.length; i++){
                oAddBtn[i].onclick = function(){
                    that.goodsAdd(this);
                }
            }
            let oInput = document.getElementsByClassName("del-input");
            for(let i=0; i<oInput.length; i++){
                oInput[i].onclick = function(){
//                  that.goodsDel(this);
                    let t = this; 
                    let oPopupDel = this.nextElementSibling;
                    $(oPopupDel).show();
                    let yes = this.nextElementSibling.children[0].children[1].children[0];
                    let no = this.nextElementSibling.children[0].children[1].children[1];
                    yes.onclick = function(){
                    	that.goodsDel(t);
                    }
                    no.onclick = function(){
                    	$(oPopupDel).hide();
                    }       
                }
            }
        }    
        
        makeEle(name,num,price,discount,subtotal,url){
            var oCartList = document.getElementById("cart-list");
            var oCartformCon = document.getElementById("cart-formCon");
            var nextNode = oCartformCon.lastElementChild; 
            $(".cart-list").show();
            $(".cart-empty").hide();
            var sub = Number(subtotal).toFixed(2);
            var dis = Number(discount).toFixed(2);
            var oDiv = document.createElement("div");    
            oDiv.innerHTML = `<div class="cart-pro-list ">
			<label class="cart-checkbox">
	           <input readonly="readonly" class="vam checked"> 全选
	        </label>
            <div class="cart-pro-area">
	        	<div class="cart-pro-main">
	        		<a href="#" target="_blank" class="goods-img" href="DetailPages.html">
	        			<img src="${url}" class="goods1-img">
	        		</a>
	        		<ul>
	        			<li> 
	        				<a href="DetailPages.html" target="_blank" class="goods-name" title="">${name}</a> 
	        			</li> 
	        			<li>
	        				<div class="p-price">
	        					<span>¥</span><span>${price}</span> 
	        					<s>¥&nbsp;2699.00</s>
	        				</div>
	        			</li> 
	        			<li>
	        				<div class="cart-stock">
	        					<div class="cart-stock-area">
		        					<input type="text" value="${num}" class="goods-num">
		        					<p class="p-stock-btn">
		        						<a href="javascript:;" class="sub-btn" >−</a>
		        						<a href="javascript:;" class="add-btn">+</a>
		        					</p>
	        				    </div>
	        				</div>
	        			</li>
	        			<li class="p-price-total">
	        				<span>¥&nbsp;</span>
	                        <span class="goods-price">${Number(subtotal).toFixed(2)}</span>
	                        <span>&nbsp;&nbsp;&nbsp;省¥</span>
	                        <span class="p-price-save">${Number(discount).toFixed(2)}</span>
	        			</li> 
	        			<li>
	        				<a href="javascript:;" class="del-input">删除</a>
							<div class="popup-del">
								<div class="popup-delb">
									<p>您确认要删除该商品吗？ </p>
									<div class="popup-button-area">
										<a href="javascript:;" class="button-action-yes">
											<span>是</span>
										</a>
										<a href="javascript:;" class="button-action-no">
											<span>否</span>
										</a>
									</div>
								</div>
						    </div>
	        			</li>
	        		</ul>
	        		<div class="clear"></div>
	        	</div>
                <div class="cart-service">
            	<div class="cart-ser-area">
            		<h2>服务</h2>
            		<div class="cart_proinfProm">
            		<div class="cart_proinfParts">
			 			<span class="cart_proinfPartsTag">无忧服务</span>
			 			<div class="cart_proPartsCon"> 
			 				<span>可选购无忧服务 </span>
			 			</div>
		 		    </div>
		 		    <div class="cart_proinfParts">
			 			<span class="cart_proinfPartsTag">碎屏服务保</span>
			 			<div class="cart_proPartsCon"> 
			 				<span>可选购碎屏服务宝 </span>
			 			</div>
		 		    </div>
		 		    <div class="cart_proinfParts">
			 			<span class="cart_proinfPartsTag">延长服务保</span>
			 			<div class="cart_proPartsCon"> 
			 				<span>可选购延长服务宝 </span>
			 			</div>
		 		    </div>
		 		    <div class="clear"></div>
		 		    </div>
            		<div class="clear"></div>
            	</div>
            	<div class="clear"></div>
             </div>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>	
                                    `; 
           oCartformCon.insertBefore(oDiv,nextNode);
            if(num>1){
            	$(".sub-btn").css({cursor:"pointer", color: "#777"});
            }

//          $(".goods-num").attr("value",num);
            this.getGoodsPrice();
            this.getGoodsNum();  
        }
        showGoods(){
            let ls = localStorage; 
            if(ls.length<=0){
            	$(".cart-list").hide();
                $(".cart-empty").show();
            }
            if (ls.length != 0) {
                for(let i = 0; i < ls.length; i++) {
                    let name = ls.key(i);
                    let arr = ls.getItem(ls.key(i)).split(",");
                    let num = arr[0];
                    let price = arr[1];
                    let discount = arr[2];
                    let subtotal = arr[3];
                    let url = arr[4];
                    this.makeEle(name,num,price,discount,subtotal,url); 
                }
            }
        }
    }
    let c = new Cart();
    c.showGoods();
    c.eventBind();
//  c.eventAddGoods();
//  let ls = localStorage;
//  ls.clear();

	var name = window.sessionStorage.getItem("username");
	var pass = window.sessionStorage.getItem("password");
	if(name !="" && pass!=""){
  	     $(".login-prompt").hide();
        
   }

