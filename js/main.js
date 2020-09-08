

//トリガーボタン
$(function(){
	var triggerBtn = $('.header__trigger');
	triggerBtn.on('click', function(){
		$('.header__trigger').toggleClass('open');
		$('.header__smenu').toggleClass('open');
	});
});


//スクロールで表示領域に入ったらonクラス追加
$(function(){
	$(window).on('load scroll', function() {
		var scrolled = $(window).scrollTop();
		var windowHeight = $(window).height();
		$(".mf, .mfu, .ef").each(function(){
			var imgPos = $(this).offset().top;    
			if (scrolled > imgPos - windowHeight + windowHeight/8){
				$(this).addClass("on");
			}
		});
		$(".mmr, .mmrl, .mfd, .mfl, .mfr, .mful").each(function(){
			var imgPos = $(this).offset().top;    
			if (scrolled > imgPos - windowHeight + windowHeight/4){
				$(this).addClass("on");
			}
		});
		$(".msk, .mskl").each(function(){
			var imgPos = $(this).offset().top;    
			if (scrolled > imgPos - windowHeight + windowHeight/3){
				$(this).addClass("on");
			}
		});
	});
});


//slick(slider)
$(function() {
	$('.works__slider').slick({
		dots: false,
		arrows: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 600,
		centerMode: false,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: false,
		responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				arrows: false,
			}
		}
		]
	});
	$('.works-slider__list').slick({
		dots: true,
		arrows: true,
		fade: true,
		autoplay: true,
		speed: 600,
		pauseOnHover: false,
		responsive: [
		{
			breakpoint: 767,
			settings: {
				dots: false,
				arrows: false,
			}
		}
		]
	});
	$('.gallery-slider').slick({
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 500,
		centerMode: true,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: false,
	});
});



//spの個別ページタイトル高さ調整
$(function(){
	var windowWidth = $(window).width();
	var windowSm = 767;
	if (windowWidth <= windowSm) {
		$(function () {
			//var hsize = $(window).height();
			var hsize = window.innerHeight;
			$(".loader, .single-title").css("height", hsize + "px");
		});
	}
});



//背景画像をスクロールに合わせて移動
$(function () {
	$(".scrollMove").each(function(){
		var bg1_top = $(this).offset().top;
			var win_h = $(window).height();
			var start_bg1 = bg1_top - win_h;
			var windowWidth = $(window).width();
			var windowSm = 767;
		$(window).on('load scroll', function() {
			var y = $(this).scrollTop();
			if (windowWidth <= windowSm) {
				if (y >= start_bg1 - 280) {
					$('.scrollMove').css('background-position-y', (y - bg1_top) * 0.2 + 'px');
				}
			} else {
				if (y >= start_bg1) {
					$('.scrollMove').css('background-position-y', -(y - bg1_top) * 0.2 + 'px');
				}
			} 
		});
	});
});


//SERVICEページ work flowのリスト展開
$(function() {
	$(".service-fl__item").click(function () {
		$(".service-fl__item").not(this).removeClass("open");
		$(".service-fl__item").not(this).children(".service-fl__exp").slideUp(300);
		$(this).toggleClass("open");
		$(this).children(".service-fl__exp").slideToggle(300);
	});
});



//サイト起動時 loader
$(function() {
	var loadCount = 0,
			imgLength = $("img").size();
	$("img").each(function() {
			var src = $(this).attr("src");
			$("<img>").attr("src", src)
					.load(function() {
							loadCount++; 
					});
	});
var webStorage = function(){
	var $loading = $('.loader');
	
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
			sessionStorage.setItem('access', 0);
		} 
	};
	if(sessionStorage.getItem('access')){
		var timer = setInterval(function() {
			$(".loader__bar").css('width', (loadCount / imgLength) * 100 + "%");
			if((loadCount / imgLength) * 100 == 100){
				clearInterval(timer);
				$(".loader__bar").animate({"opacity": 0}, 100);
				$("body").addClass('motion');
				$('.loader__logo').css('display', 'none');
				setTimeout(function(){$(".loader").fadeOut();},750);
			}
		}, 5);
	} else {
		$('.loader__logo').css('display', 'block');
		var mySvg = new Vivus('move', {type: 'oneByOne', duration: 135, forceRender: false, animTimingFunction: Vivus.EASE, start: 'autostart' },() => {
			$(".loader__bar").delay(200).animate({"opacity": 0}, 200);
			$("body").addClass('motion');
			setTimeout(function(){$(".loader").fadeOut();},750);
		});
		var timer = setInterval(function() {
			$(".loader__bar").css('width', (loadCount / imgLength) * 100 + "%");
			if((loadCount / imgLength) * 100 == 100){
				clearInterval(timer);
			}
		}, 5);
		sessionStorage.setItem('access', 0);
	}
}
webStorage();

	$('nav a, .link').click(function(){
			var url = $(this).attr("href");
			$('.loader').show();
	$('.loader__logo').css('display', 'none');
	$("body").addClass('off');
	setTimeout(function(){
		location.href = url;
	},750);
			return false;
	});
});




//カーソル追従(TweenMax)
$(function() {
	var cursor = $(".cursor"), follower = $(".follower"), cWidth = 8, fWidth = 40, delay = 10, mouseX = 0, mouseY = 0, posX = 0, posY = 0;
	TweenMax.to({}, .001, {
		repeat: -1,
		onRepeat: function () {
			posX += (mouseX - posX) / delay;
			posY += (mouseY - posY) / delay;
			TweenMax.set(follower, {
				css: {
					left: posX - fWidth / 2,
					top: posY - fWidth / 2 }
				});
			TweenMax.set(cursor, {
				css: {
					left: mouseX - cWidth / 2,
					top: mouseY - cWidth / 2 } });
			}
		}
	);
	$(document).on("mousemove", function (e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});
	$("a, .header__trigger").on({
		"mouseenter": function () {
			cursor.addClass("is-active");
			follower.addClass("is-active");
		},
		"mouseleave": function () {
			cursor.removeClass("is-active");
			follower.removeClass("is-active");
		}
	});
});
