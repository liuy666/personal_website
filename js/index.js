
$(function(){
	// 新闻列表鼠标滑过切换
	$("ul.classify").on("mouseenter",".title",function(e){
		e.preventDefault();
		$(this).addClass("active")
			   .siblings()
			   .removeClass("active");
		$(this).find("div")
			   .removeClass("hidden")
			   .parent()
			   .siblings()
			   .find("div")
			   .addClass("hidden");
	});

	// banner轮播图
	$("div.banner").carousel({
		width : 842,
		height : 403,
		duration : 2000,
		aImg : [
			{src : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522318269188&di=193b87446c5799225f738e5500eff2a5&imgtype=0&src=http%3A%2F%2Fpic.yesky.com%2FuploadImages%2F2015%2F215%2F45%2F04L5VRR21C5W.jpg"},
			{src : "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1522308275&di=98a03b5cb1516cf4bd3f19b710942baf&src=http://image.game.uc.cn/2014/9/4/9896021.jpg"},
			{src : "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1522308275&di=a4dff55aec2f235879bcb98cb183c8b8&src=http://dynamic-image.yesky.com/740x-/uploadImages/2015/131/33/D472XQ25C7H2.jpg"},
			{src : "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1522308337&di=f5a71d3803597b4de184b4082b9cf3db&src=http://img01.taopic.com/160729/318762-160H910533660.jpg"},
			{src : "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=201805277,1561914395&fm=27&gp=0.jpg"}

		],
		type : "slide"
	});

	
	// 搜索条拉伸
	$(".search input").hover(function(e){
		e.preventDefault();
		$(this).animate({
			width : "250px"
		},900);
	},function(e){
		e.preventDefault();
		$(this).animate({
			width : "120px"
		},900);
	});

	// 显示实时时间
	let timer = setInterval(function(){
		let date = new Date(),
			day = date.getDate(),
			week = date.getDay(),
			month = ("0" + (date.getMonth() + 1)).slice(-2),
			hour = ("0" + date.getHours()).slice(-2),
			minute = ("0" + date.getMinutes()).slice(-2),
			second = ("0" + date.getSeconds()).slice(-2),
			year = date.getFullYear(),
			time = null,
			interval = null;

		// 处理周数
		let weeks = ["日","一","二","三","四","五","六"];

		// 处理小时
		if(hour >= 0 && hour < 6)
			interval = "凌晨";
		if(hour >= 6 && hour <12)
			interval = "上午";
		if(hour >= 12 && hour < 18)
			interval = "下午";
		if(hour >= 18 && hour < 24)
			interval = "晚上";
		time = `现在是 ${year}-${month}-${day} 星期${weeks[week]} ${interval} ${hour}:${minute}:${second}`;
		$(".timeNow span").text(time);
	},1000);

	// 运行天数
	let days = setInterval(function(){
		let nowTime = Date.now(),
			oldTime = Date.parse("2018-02-01T01:01:01"),
			diff = nowTime - oldTime,
			nowDay = Math.floor(diff / 1000 / 3600 / 24);
			$("span#days").text(nowDay);	
	})
});