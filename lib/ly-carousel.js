;
(function($){
	function Carousel({width,height,aImg,duration,speed,type,isAutoPlay}){
		this.width = width;  // 轮播图宽度
		this.height = height;  // 轮播图高度
		this.aImg = aImg;  // 存放轮播图片的数组 [{src:img1,href:url1},{src:img2,href:url2}]
		this.len = aImg.length;  // 轮播图片数量
		this.duration = duration || 1000;  // 轮播图切换频率  默认1000ms
		this.animateSpeed = speed || 500;  // 轮播动画的速度 默认500ms
		this.type = type || "fade";  // 轮播图类型（滑动、淡入淡出） 默认为淡入淡出
		this.isAutoPlay = isAutoPlay || true;  // 默认自动轮播
		this.timer = null;  // 轮播定时器
		this.currIndex = null;  // 当前轮播图片索引
		this.nextIndex = null;  // 下一张轮播图片索引
		this.lis = null;  // 所有的轮播图片盒子
		this.ul = null;  // 轮播图盒子的父元素
		this.circles = null;  // 所有的轮播标识小圆点
		this.circleNextIndex = null;  // 下一格小圆点索引
		this.carousel = null;  // 轮播图容器 ul的父元素
		this.left = null;  // 向左翻页
		this.right = null;  // 向右翻页
	}
	Carousel.prototype = {
		constructor : Carousel,
		init : function(container){
			let liHtml = "",
				iHtml = "",
				_html = "";
			for(let i = 0; i < this.len; i++){
				this.aImg[i].href = this.aImg[i].href || "#";
				liHtml += `
					<li>
						<a href="${this.aImg[i].href}">
							<img src="${this.aImg[i].src}" alt="加载失败" />
						</a>
					</li>
				`;
				iHtml += `<i></i>`;
			}
			_html = `
				<div class="carousel">
					<ul class="imgs">
						${liHtml}
					</ul>
					<div class="pages">${iHtml}</div>
					<div class="toLeft common"></div>
					<div class="toRight common"></div>
				</div>
			`;
			$(container).html(_html);
			this.carousel = $(".carousel",container).css({
				width : this.width,
				height : this.height,
				overflow : (this.type === "fade" ? "visible" : "hidden"),
				position : "relative"
			});
			this.ul = $(".imgs",container).css({
				width : (this.type === "fade" ? this.width : this.width * this.len),
				height : this.height,
				position : (this.type === "fade" ? "static" : "absolute")
			});
			this.lis = $(".imgs li",container).css({
				width : this.width,
				height : this.height
			});
			this.lis.find("a").css({
				width : this.width,
				height : this.height,
				overflow : "hidden",
				display : "block"
			});
			if(this.type === "fade"){
				this.lis.css({
					position : "absolute",
					left : 0,
					top : 0,
					display : "none"
				}).first().show();
				this.currIndex = 0;
				this.nextIndex = 1;
			} else {
				this.lis.css("float","left");
				this.ul.append(this.lis.first().clone())
					   .prepend(this.lis.last().clone());
				this.len += 2;
				this.ul.css({
					width : this.width * this.len,
					left : -1 * this.width
				});
				this.currIndex = 1;
				this.nextIndex = 2;
			}
			this.circles = $(".pages",container).children("i");
			let marginleft = parseInt(this.circles.css("margin-left")),
				circlewidth = parseInt(this.circles.css("width")),
				paddingvalue = (this.width - (marginleft * 2 + circlewidth) * this.len) / 2;
			$(".pages",container).css({
				width : this.width,
				paddingLeft : paddingvalue
			});
			this.circles.first().addClass("current");
			this.left = $(".toLeft",container);
			this.right = $(".toRight",container);
			if(this.isAutoPlay)
				this.autoPlay();
			this.registerEventListener();
		},
		autoPlay : function(){
			this.timer = setInterval(() => {
				this.move()
			},this.duration);
		},
		move : function(){
			if(this.type === "fade")
				this.fade();
			else
				this.slide();
		},
		fade : function(){
			// 当前图片淡出
			this.lis.eq(this.currIndex).stop().fadeOut(this.speed);
			// 下一张图片淡入
			this.lis.eq(this.nextIndex).stop().fadeIn(this.speed);
			// 当前图片对应小圆点重置
			this.circles.eq(this.currIndex).removeClass("current");
			this.circles.eq(this.nextIndex).addClass("current");
			// 更新待操作图片索引
			this.currIndex = this.nextIndex;
			this.nextIndex++;
			// 如果轮播到最后一张图片，则重置下一张图片的索引为0，即下一张显示第一张图片
			if(this.nextIndex >= this.len )
				this.nextIndex = 0;
		},
		slide : function(){
			// 计算轮播定位终值
			if(this.nextIndex >= this.len){
				this.ul.css("left",-1 * this.width);
				this.currIndex = 1;
				this.nextIndex = 2;
			}
			if(this.currIndex < 0){
				this.ul.css("left",-1 * this.width * (this.len - 2));
				this.currIndex = this.len - 2;
				this.nextIndex = this.len - 1;
			}
			var _left = -1 * this.width * this.nextIndex;
			this.ul.stop().animate({
				left : _left
			},this.speed,() => {
				if(this.nextIndex === this.len){
					this.ul.css("left",-1 * this.width);
					this.currIndex = 1;
					this.nextIndex = 2;
				}
				if(this.currIndex === 0){
					this.ul.css("left",-1 * this.width * (this.len - 2));
					this.currIndex = this.len - 2;
					this.nextIndex = this.len - 1;
				}
			});
			// 当前图片对应小圆点重置
			// 计算小圆点的索引
			this.circleNextIndex = this.nextIndex - 1;
			if(this.circleNextIndex === this.len - 2)
				this.circleNextIndex = 0;
			if(this.circleNextIndex === -1)
				this.circleNextIndex = this.len - 3;
			this.circles.removeClass("current");
			this.circles.eq(this.circleNextIndex).addClass("current");
			// 更新待操作图片索引
			this.currIndex = this.nextIndex;
			this.nextIndex ++;
		},
		registerEventListener : function(){
			let that = this;
			this.circles.mouseenter(function(){
				let index = $(this).index();
				if(that.type === "fade"){
					if(that.currIndex === index)
						return;
					else
						that.nextIndex = index;
				}
				else{
					if(that.currIndex === (index + 1))
						return;
					else
						that.nextIndex = index + 1;
				}
				that.move();
			});

			// 轮播翻页按钮滑入显示
			$(".carousel").mouseenter((e) => {
				e.preventDefault();
					clearInterval(this.timer);
					this.left.show();
					this.right.show();
			});

			$(".carousel").mouseleave((e) => {
				e.preventDefault();
					this.autoPlay();
					this.left.hide();
					this.right.hide();
			});

			this.left.click(() => {
				if(this.type === "fade"){
					this.nextIndex = this.currIndex - 1;
					if(this.nextIndex === -1)
						this.nextIndex = this.len - 1;
				} else
					this.nextIndex = this.currIndex - 1;
				this.move();
			});

			this.right.click(() => {
					this.move();
			});
		}
	};
	$.fn.extend({
		carousel : function(options){
			this.each(function(index,currEle){
				new Carousel(options).init($(currEle));
			});
		}
	});
})(jQuery);
