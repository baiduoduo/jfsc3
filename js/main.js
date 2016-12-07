(function(){
	var Index = {

		dataList:data.awards,

		init:function(){
			var self = this;
			this.render();
			this.carous();
			this.bindEvent();
		},

		/**
		 * 首页渲染
		 * @return {[type]} [description]
		 */
		render:function(){
			var self = this,
				html = '',html2='',html3='',html4='',html5='',html6='',html7='',
				temp = '';
			html = template('tpl-nav', data);
    		$('.nav').append(html);
    		// 根据nav显示对应的list  ??? 怎么做
    		// this.dataList = this.dataList.filter(function(x,index){
    		// 	return x.typeId ===1;
    		// })
    		// console.log(this.dataList)

    		html2 = template('tpl-list', data);
    		$('.inner').html(html2);
    		html3 = template('tpl-list-qb', data);
    		$('.inner').append(html3);
    		html4 = template('tpl-list-yb', data);
    		$('.inner').append(html4);
    		html5 = template('tpl-list-package', data);
    		$('.inner').append(html5);
    		html6 = template('tpl-list-award', data);
    		$('.inner').append(html6);
    		html7 = template('tpl-list-ka', data);
    		$('.inner').append(html7);
		},
		/**
		 * 实物奖励图片轮播 渲染
		 * @return {[type]} [description]
		 */
		carous:function(){
			var self = this,
				html='',n = 0;
			for(var i=0;i<rAdata.length;i++){
                n = i+1;
                html += '<li class="car_pic page_guide_item">\
                            <img id="car_0'+n+'" src="img/'+rAdata[i].img+'.png">\
                         </li>';
            }
                
            $(".carrous").append(html);
		},

		bindEvent:function(){
			var self = this,
				el = $(document);

			// 导航栏切换显示
			el.on("tap",".nav li",function(){
				var n = $(this).index()+1;
				$(this).parent().find(".on").removeClass('on');
				$(this).addClass('on');
				console.log(n);
				$(".list").hide();
				$("#list"+n).show();
			})

			// 点击 内容列表 调到详情页
			el.on("tap",".list li",function(){
				var w_score = $(this).attr("data-price");
				w_score = w_score/1000;
				if ($(this).attr("data-prop") == "5") {
					$("#pic_scroll").show();
					$("#kama").hide();
				}else{
					$("#pic_scroll").hide();
					$("#kama").show();
				}
				$("#page2 #award_pic").attr("src","img/"+$(this).attr("data-img")+".png");
				$("#page2 #desc_price").html($(this).attr("data-price"));
				$("#page2 #desc_tit").html($(this).attr("data-tit"));
				$("#page2 #score").html($(this).attr("data-price"));
				$("#page2 .bar_on").width(w_score*100+"%");

				$(".btn_convert").attr("data-id",$(this).attr("data-id"))
								 .attr("data-prop",$(this).attr("data-prop"))
								 .attr("data-img",$(this).attr("data-img"))
								 .attr("data-tit",$(this).attr("data-tit"))
								 .attr("data-price",$(this).attr("data-price"))
								 .attr("data-desc",$(this).attr("data-desc"));
				$("#page1").hide();
				$("#page2").show();
			})

			// 点击"返回" TODO 但是这里只返回到首页，首页不能返回？？？
			el.on("tap","#page2 .back",function(){
				$("#page2,#page3").hide();
				$("#page1").show();
			})
			el.on("tap","#page3 .back",function(){
				$("#page1,#page3").hide();
				$("#page2").show();
			})
			
			// 详情 页 点击“兑换”
			el.on("tap",".btn_convert",function(){
				var id,prop;
				id = $(this).attr("data-id");
				prop = $(this).attr("data-prop");//奖品属性

				if (prop === "5") {//如果是实物奖励
					$("#page2,#page3 .pay").hide();
					$("#page3,#page3 .item,#page3 #address").show();
					$("#page3 #kf").width("50%");
				}else{
					$("#page3 #address").hide();
					$("#page3 #kf").width("100%");
					$("#page3 .item,#page2").hide();
					$("#page3 .item1,#page3,#page3 .pay").show();
				}
				

				$("#page3 .award img").attr("src","img/"+$(this).attr("data-img")+".png");
				$("#page3 .desc h3").html($(this).attr("data-tit"));
				$("#page3 .desc em").html($(this).attr("data-price"));
				$("#page3 .desc p").html($(this).attr("data-desc"));
			})

			// $(".nav li").click(function(){
			// 	alert('click'+$(this).attr("id"))
			// }).tap(function(){
			// 	alert('tap'+$(this).attr("id"))
			// })
			
		}
	}

	Index.init();
})();