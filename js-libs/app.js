jQuery(document).ready(function ($) {

	$('body').addClass('ready');

	//animations
	if (window.innerWidth > 767 && $('body').hasClass('home')) {
		new WOW().init();
	}


	$(window).scroll(function () {
		if ($(document).scrollTop() > vh(70)) {
			$('.header__panel').addClass('after-header-fixed-menu');
			$('.header').addClass('compensator');
		} else {
			$('.header').removeClass('compensator');
			$('.header__panel').removeClass('after-header-fixed-menu');
		}
	});

	//scrolling nav implementation
	$(".nav-menu li a").click(function (e) {
		var section = $(this).attr("href");
		$('#nav-icon').toggleClass('open');
		$('.nav').toggleClass('nav-mobile_open');
		if (section.indexOf("#") >= 0) {
			e.preventDefault();
			var id = section.split('#');
			animateScrollTop('#' + id[1]);
		}

	});

	//scrolling animation
	function animateScrollTop(section) {
		$("html, body").animate({
			scrollTop: $(section).offset().top - 200 + "px"
		}, 2000);
	}

	// mobile nav
	$('#nav-icon').click(function () {
		$(this).toggleClass('open');
		$('.nav').toggleClass('nav-mobile_open');
	});

	// intro section timer
	try {
		if ($('body').hasClass('home')){
			var daysEl = $('.osmi-days'),
				hoursEl = $('.osmi-hours'),
				minutesEl = $('.osmi-minutes'),
				secondsEl = $('.osmi-seconds');
			osmiTimer(daysEl, hoursEl, minutesEl, secondsEl);
		}
	}
	catch (e) {
		console.log(e);
	}

	// intro section static progress bar animation
	$('.indicator').animate({'left': '34%'}, 3000);

	// about section slider
	$('.logo-slider').slick({
		nextArrow: '<div class="nextArr Arr"><i class="fa fa-angle-right"></i></div>',
		prevArrow: '<div class="prevArr Arr"><i class="fa fa-angle-left"></i></div>',
		dots: false,
		infinite: true,
		arrows: true,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1350,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 2,
					infinite: true
				}
			},
			{
				breakpoint: 1050,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});


	// video in about section
	var videoEl = $('#videoInsert');
	var btn = $('.play-btn');
	btn.click(function () {
		//	btn.hide();
		videoEl[0].controls = true;
		videoEl[0].play();
		$('.pop-up').addClass('zIndexHigh');
		$('.pop-up').animate({'opacity': '1'}, 300);
	});
	$('.pop-up-close').click(function () {
		videoEl[0].pause();
		$('.pop-up').animate({'opacity': '0'}, 300);
		setTimeout(function () {
			$('.pop-up').removeClass('zIndexHigh');
		}, 600);

	});

	// team pop up
	$('.people-to-click').click(function () {
		var popUpElm = $(this).siblings(".full-description");
		setTimeout(function () {
			popUpElm.addClass('open');
		}, 10)
	});
	$(".close").click(function () {
		var popUpElm = $(".open");
		popUpElm.removeClass('open');
	});
	//roadmap slider
	$('.roadmap-slider').slick({
		nextArrow: '<div class="nextArr Arr"><i class="fa fa-angle-right"></i></div>',
		prevArrow: '<div class="prevArr Arr"><i class="fa fa-angle-left"></i></div>',
		dots: false,
		infinite: false,
		arrows: true,
		speed: 300,
		swipe: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}

		]
	});


	circleInRoadmapSliderSetter();
	// On before slide change
	$('.roadmap-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		circleInRoadmapSliderSetter();
	});


	// faq accordion
	var wrapper = $('.accordion ul li');
	var whatWillSlides = wrapper.find('p');
	osmiAccordion(wrapper, whatWillSlides);

	// footer scroll up button implementation
	$('.scroll-up-btn').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 2000);
	});


	//--------------> CUSTOM FUNCTIONS <---------------------


	/********************************************************
	 *                    OSMI TIMER                        *
	 *  This function implements countdown timer.           *
	 *  Parameters - jquery elements, which contain numbers *
	 * (days, hours, minutes, seconds correspondingly)      *
	 *  Function doesn't return any value                   *
	 ********************************************************/

	function osmiTimer(daysEl, hoursEl, minutesEl, secondsEl) {
		var timer = {};
		setInterval(function () {

			timer.days = parseInt(daysEl.text());
			timer.hours = parseInt(hoursEl.text());
			timer.minutes = parseInt(minutesEl.text());
			timer.seconds = parseInt(secondsEl.text());

			if (isNaN(timer.days) ||
				isNaN(timer.hours) ||
				isNaN(timer.minutes) ||
				isNaN(timer.seconds) ||
				timer.seconds > 60 ||
				timer.minutes > 60 ||
				timer.hours > 24) {
				throw "Timer data is wrong. Please check it.";
			}

			if (timer.seconds > 0) {
				timer.seconds--;
			} else {
				timer.seconds = 59;
				if (timer.minutes > 0) {
					timer.minutes--;
				}
				else {
					timer.minutes = 59;
					if (timer.hours > 0) {
						timer.hours--;
					} else {
						timer.hours = 23;
						if (timer.days > 0) {
							timer.days--;
						} else {
							alert('Time is out');
						}
					}
				}
			}

			// if value < 10 we need to write 0 before (for example 02)
			if (timer.days < 10)
				daysEl.text('0' + timer.days);
			else
				daysEl.text(timer.days);

			if (timer.hours < 10)
				hoursEl.text('0' + timer.hours);
			else
				hoursEl.text(timer.hours);

			if (timer.minutes < 10)
				minutesEl.text('0' + timer.minutes);
			else
				minutesEl.text(timer.minutes);

			if (timer.seconds < 10)
				secondsEl.text('0' + timer.seconds);
			else
				secondsEl.text(timer.seconds);

		}, 1000);
	}


	/********************************************************
	 *                    OSMI ACCORDION                    *
	 *  This function implements accordion.                 *
	 *  Parameters - jquery elements, which contain numbers *
	 * (days, hours, minutes, seconds correspondingly)      *
	 *  Function doesn't return any value                   *
	 ********************************************************/
	function osmiAccordion(_wrapper, whatWillSlides) {
		var wrapper = _wrapper;
		var elem = whatWillSlides;
		elem.slideUp();
		wrapper.click(function () {
			var wasOn = $(this).hasClass('on');
			$(this).addClass('on');
			$(this).find(elem).slideDown();
			if (wasOn) {
				$(this).find(elem).slideUp();
				$(this).removeClass('on');
			}
		});
	}


	/********************************************************
	 *            circleInRoadmapSliderSetter               *
	 *                                                      *
	 *  This function sets circles to roadmap slider        *
	 ********************************************************/
	function circleInRoadmapSliderSetter() {

		var elWithDots = $('.roadmap-slider .slick-active');
		elWithDots.find('.circle').removeClass('circle1');
		elWithDots.find('.circle').removeClass('circle2');
		elWithDots.find('.circle').removeClass('circle3');
		elWithDots.find('.circle').removeClass('circle4');

		if (window.innerWidth > 1300) { //4
			if (elWithDots[0] != undefined) {
				elWithDots[0].querySelector('.circle').classList.add('circle1');
			}
			if (elWithDots[1] != undefined) {
				elWithDots[1].querySelector('.circle').classList.add('circle2');
			}
			if (
				elWithDots[2] != undefined) {
				elWithDots[2].querySelector('.circle').classList.add('circle3');
			}
			if (elWithDots[3] != undefined) {
				elWithDots[3].querySelector('.circle').classList.add('circle4');
			}

		} else if (window.innerWidth > 1100 ||
			(window.innerWidth > 768 &&
				window.innerWidth < 980)) { //3
			if (elWithDots[0] != undefined) {
				elWithDots[0].querySelector('.circle').classList.add('circle1');
			}
			if (elWithDots[1] != undefined) {
				elWithDots[1].querySelector('.circle').classList.add('circle2');
			}
			if (
				elWithDots[2] != undefined) {
				elWithDots[2].querySelector('.circle').classList.add('circle3');
			}
		} else if (window.innerWidth > 980) { //2
			if (elWithDots[0] != undefined) {
				elWithDots[0].querySelector('.circle').classList.add('circle1');
			}
			if (elWithDots[1] != undefined) {
				elWithDots[1].querySelector('.circle').classList.add('circle3');
			}
		} else { //1
			if (elWithDots[0] != undefined) {
				elWithDots[0].querySelector('.circle').classList.add('circle2');
			}
		}
	}


	function vh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}

});

