$(function () {
	APP.init();
	lozadInit();
	fancyboxInit();
	countUpInit();

	accordionCollapse();

	$('.marquee').marquee({
		//duration in milliseconds of the marquee
		duration: 20000,
		//gap in pixels between the tickers
		gap: 0,
		//time in milliseconds before the marquee will start animating
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true,
		pauseOnHover: true,
	});
	$('.brand-marquee').marquee({
		//duration in milliseconds of the marquee
		duration: 15000,
		//gap in pixels between the tickers
		gap: 0,
		//time in milliseconds before the marquee will start animating
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true,
		pauseOnHover: false,
	});
});

$(window).on('scroll', function () {
	APP.fixed();
});

// variable
var header = $("header"),
	body = $("body"),
	backToTop = $(".back-to-top"),
	buttonMenu = $("#buttonMenu"),
	mobileWrap = $(".mobile-wrap"),
	buttonSearch = $("header .button-search"),
	searchWrap = $(".search-wrap"),
	heightHeader = $("header").height(),
	heightWindow = $(window).height(),
	widthWindow = $(window).width(),
	outerHeightWindow = $(window).outerHeight();

// toggleText
$.fn.extend({
	toggleText: function (a, b) {
		return this.text(this.text() == b ? a : b);
	},
});

var APP = {
	fixed: () => {
		// header
		$(window).scrollTop() > heightHeader
			? header.addClass("active")
			: header.removeClass("active");
		$(window).scrollTop() > (outerHeightWindow - heightHeader)
			? backToTop.addClass("active")
			: backToTop.removeClass("active");
	},
	backToTop: () => {
		backToTop.on('click', function () {
			$('html, body').animate({ scrollTop: 0 }, 500);
		})
	},
	mapping: () => {
		let mainMenu = $("header .navbar-nav").mapping({
			mobileWrapper: ".mobile-wrap .navbar-nav-list",
			mobileMethod: "prependTo",
			desktopWrapper: "header .header-right",
			desktopMethod: "prependTo",
			breakpoint: 1199.98,
		});
		let buttonEmail = $("header .button-email").mapping({
			mobileWrapper: ".mobile-wrap .button-flex",
			mobileMethod: "appendTo",
			desktopWrapper: "header .button-flex",
			desktopMethod: "appendTo",
			breakpoint: 767.98,
		});
		let buttonPhone = $("header .button-phone").mapping({
			mobileWrapper: ".mobile-wrap .button-flex",
			mobileMethod: "appendTo",
			desktopWrapper: "header .button-flex",
			desktopMethod: "appendTo",
			breakpoint: 767.98,
		});
	},
	toggleMenuMobile: () => {
		$(buttonMenu).on('click', function () {
			mobileWrap.slideDown().toggleClass('active');
			$('.backdrop-mobile').fadeIn();
		});

		$(mobileWrap).find('.close-mobile').on('click', function () {
			mobileWrap.fadeOut().removeClass('active');
			$('.backdrop-mobile').fadeOut();
		});

		$(document).on('click', function (e) {
			if (!$(e.target).closest(mobileWrap).length && !$(e.target).closest(buttonMenu).length) {
				mobileWrap.fadeOut().removeClass('active');
				$('.backdrop-mobile').fadeOut();
			}
		});
		$('.main-menu .menu-item-has-children > .sub-menu').each(function () {
			var toggleSubmenu = $('<span class="toggle-submenu"></span>');
			$(this).before(toggleSubmenu);
		});
		$('.main-menu .menu-item-has-children > .mega-menu').each(function () {
			var toggleMegaMenu = $('<span class="toggle-mega"></span>');
			$(this).before(toggleMegaMenu);
		});
		$('.main-menu .menu-item-has-children > .mega-wrap').each(function () {
			var toggleMegaWrap = $('<span class="toggle-wrap"></span>');
			$(this).before(toggleMegaWrap);
		});
		$('.main-menu .toggle-submenu, .main-menu .toggle-mega, .main-menu .toggle-wrap').on('click', function () {
			if (widthWindow < 1200) {
				$(this).toggleClass('active');
				$(this).next().slideToggle();
			}
		});
	},
	toggleSearch: () => {
		buttonSearch.on('click', function () {
			searchWrap.fadeToggle();
			searchWrap.find('input').trigger('focus');
			$('.backdrop-search').fadeToggle('fast');
		});

		$(document).on('click', function (e) {
			if (!$(e.target).closest(searchWrap).length && !$(e.target).closest(buttonSearch).length) {
				searchWrap.fadeOut('fast')
				$('.backdrop-search').fadeOut('fast');
			}
		});
	},
	init: () => {
		APP.backToTop();
		APP.mapping();
		APP.toggleMenuMobile();
		APP.toggleSearch();
	}
}

var defaultSettingSwiper = {
	preventInteractionOnTransition: true,
	observer: true,
	observeParents: true,
	lazy: {
		loadPrevNext: true,
	},
}

const homeBannerThumbs = new Swiper(".home-banner .banner-thumbs", {
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
});
const homeBannerTop = new Swiper(".home-banner .banner-top", {
	...defaultSettingSwiper,
	effect: "fade",
	spaceBetween: 0,
	navigation: {
		nextEl: ".home-banner .button-next",
		prevEl: ".home-banner .button-prev",
	},
	thumbs: {
		swiper: homeBannerThumbs,
	},
});

const homeBannerSwiper = new Swiper(".banner-slider .swiper", {
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	// effect: "fade",
	speed: 1000,
	...defaultSettingSwiper,
	navigation: {
		nextEl: ".banner-slider .button-next",
		prevEl: ".banner-slider .button-prev",
	},
	pagination: {
		el: ".banner-slider .swiper-pagination",
		clickable: true,
	},
});

$('.one-slider').each(function (index) {
	var loopDefault = {
		loop: true,
	};
	var autoplayDefault = {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};
	var centeredSlidesDefault = {};
	var effectDefault = {};
	var verticalDefault = {};
	if ($(this).hasClass('no-loop')) {
		loopDefault = {
			loop: false,
		};
	}
	if ($(this).hasClass('no-autoplay')) {
		autoplayDefault = {
			autoplay: false,
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	if ($(this).hasClass('effect-fade')) {
		effectDefault = {
			effect: 'fade',
		};
	}
	if ($(this).hasClass('is-vertical')) {
		verticalDefault = {
			direction: 'vertical',
		};
	}
	$(this).find('.swiper').addClass(`swiper-one-${index}`);
	$(this).find('.swiper-pagination').addClass(`pagination-one-${index}`);
	$(this).find('.button-prev').addClass(`prev-one-${index}`);
	$(this).find('.button-next').addClass(`next-one-${index}`);
	const oneSlider = new Swiper(`.swiper-one-${index}`, {
		...defaultSettingSwiper,
		...loopDefault,
		...autoplayDefault,
		...centeredSlidesDefault,
		// ...effectDefault,
		...verticalDefault,
		speed: 1000,
		spaceBetween: 20,
		slidesPerView: 1,
		slideToClickedSlide: true,
		loopAdditionalSlides: 1,
		navigation: {
			prevEl: `.one-slider .prev-one-${index}`,
			nextEl: `.one-slider .next-one-${index}`,
		},
		pagination: {
			el: `.one-slider .pagination-one-${index}`,
			clickable: true,
			dynamicBullets: true,
		},
		breakpoints: {
			1200: {
				spaceBetween: 40,
			},
		},
	});
});

$('.two-slider').each(function (index) {
	var loopDefault = {
		loop: true,
	};
	var autoplayDefault = {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};
	var centeredSlidesDefault = {};
	if ($(this).hasClass('no-loop')) {
		loopDefault = {
			loop: false,
		};
	}
	if ($(this).hasClass('no-autoplay')) {
		autoplayDefault = {
			autoplay: false,
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	$(this).find('.swiper').addClass(`swiper-two-${index}`);
	$(this).find('.swiper-pagination').addClass(`pagination-two-${index}`);
	$(this).find('.button-prev').addClass(`prev-two-${index}`);
	$(this).find('.button-next').addClass(`next-two-${index}`);
	const twoSlider = new Swiper(`.swiper-two-${index}`, {
		...defaultSettingSwiper,
		...loopDefault,
		...autoplayDefault,
		speed: 1000,
		spaceBetween: 16,
		slidesPerView: 1,
		navigation: {
			prevEl: `.two-slider .prev-two-${index}`,
			nextEl: `.two-slider .next-two-${index}`,
		},
		pagination: {
			el: `.two-slider .pagination-two-${index}`,
			clickable: true,
			dynamicBullets: true,
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 32,
			},
			1200: {
				slidesPerView: 2,
				spaceBetween: 32,
			},
		},
	});
});

$('.three-slider').each(function (index) {
	var loopDefault = {
		loop: true,
	};
	var autoplayDefault = {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};
	var centeredSlidesDefault = {};
	if ($(this).hasClass('no-loop')) {
		loopDefault = {
			loop: false,
		};
	}
	if ($(this).hasClass('no-autoplay')) {
		autoplayDefault = {
			autoplay: false,
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	$(this).find('.swiper').addClass(`swiper-three-${index}`);
	$(this).find('.swiper-pagination').addClass(`pagination-three-${index}`);
	$(this).find('.button-prev').addClass(`prev-three-${index}`);
	$(this).find('.button-next').addClass(`next-three-${index}`);
	const threeSlider = new Swiper(`.swiper-three-${index}`, {
		...defaultSettingSwiper,
		...loopDefault,
		...autoplayDefault,
		speed: 1000,
		spaceBetween: 16,
		slidesPerView: 1,
		navigation: {
			prevEl: `.three-slider .prev-three-${index}`,
			nextEl: `.three-slider .next-three-${index}`,
		},
		pagination: {
			el: `.three-slider .pagination-three-${index}`,
			clickable: true,
			dynamicBullets: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	});
});

$('.four-slider').each(function (index) {
	var loopDefault = {
		loop: true,
	};
	var autoplayDefault = {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};
	var centeredSlidesDefault = {};
	if ($(this).hasClass('no-loop')) {
		loopDefault = {
			loop: false,
		};
	}
	if ($(this).hasClass('no-autoplay')) {
		autoplayDefault = {
			autoplay: false,
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	$(this).find('.swiper').addClass(`swiper-four-${index}`);
	$(this).find('.swiper-pagination').addClass(`pagination-four-${index}`);
	$(this).find('.swiper-scrollbar').addClass(`scrollbar-four-${index}`);
	$(this).find('.button-prev').addClass(`prev-four-${index}`);
	$(this).find('.button-next').addClass(`next-four-${index}`);
	const fourSlider = new Swiper(`.swiper-four-${index}`, {
		...defaultSettingSwiper,
		...loopDefault,
		...autoplayDefault,
		speed: 1000,
		spaceBetween: 16,
		slidesPerView: 1,
		navigation: {
			prevEl: `.four-slider .prev-four-${index}`,
			nextEl: `.four-slider .next-four-${index}`,
		},
		pagination: {
			el: `.four-slider .pagination-four-${index}`,
			clickable: true,
			dynamicBullets: true,
		},
		scrollbar: {
			el: `.four-slider .scrollbar-four-${index}`,
			hide: false,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 32,
			},
		},
	});
});

$('.five-slider').each(function (index) {
	var loopDefault = {
		loop: true,
	};
	var autoplayDefault = {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};
	var centeredSlidesDefault = {};
	if ($(this).hasClass('no-loop')) {
		loopDefault = {
			loop: false,
		};
	}
	if ($(this).hasClass('no-autoplay')) {
		autoplayDefault = {
			autoplay: false,
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	$(this).find('.swiper').addClass(`swiper-five-${index}`);
	$(this).find('.swiper-pagination').addClass(`pagination-five-${index}`);
	$(this).find('.button-prev').addClass(`prev-five-${index}`);
	$(this).find('.button-next').addClass(`next-five-${index}`);
	const fiveSlider = new Swiper(`.swiper-five-${index}`, {
		...defaultSettingSwiper,
		...loopDefault,
		...autoplayDefault,
		speed: 1000,
		spaceBetween: 16,
		slidesPerView: 1,
		navigation: {
			prevEl: `.five-slider .prev-five-${index}`,
			nextEl: `.five-slider .next-five-${index}`,
		},
		pagination: {
			el: `.five-slider .pagination-five-${index}`,
			clickable: true,
			dynamicBullets: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
			1400: {
				slidesPerView: 5,
				spaceBetween: 24,
			},
		},
	});
});

$('.six-slider').each(function (index) {
	var loopDefault = {
		loop: true,
	};
	var autoplayDefault = {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};
	var centeredSlidesDefault = {};
	if ($(this).hasClass('no-loop')) {
		loopDefault = {
			loop: false,
		};
	}
	if ($(this).hasClass('no-autoplay')) {
		autoplayDefault = {
			autoplay: false,
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	$(this).find('.swiper').addClass(`swiper-six-${index}`);
	$(this).find('.swiper-pagination').addClass(`pagination-six-${index}`);
	$(this).find('.button-prev').addClass(`prev-six-${index}`);
	$(this).find('.button-next').addClass(`next-six-${index}`);
	const sixSlider = new Swiper(`.swiper-six-${index}`, {
		...defaultSettingSwiper,
		...loopDefault,
		...autoplayDefault,
		speed: 1000,
		spaceBetween: 16,
		slidesPerView: 2,
		navigation: {
			prevEl: `.six-slider .prev-six-${index}`,
			nextEl: `.six-slider .next-six-${index}`,
		},
		pagination: {
			el: `.six-slider .pagination-six-${index}`,
			clickable: true,
			dynamicBullets: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			576: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 5,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 6,
				spaceBetween: 32,
			},
		},
	});
});

$('.auto-slider').each(function (index) {
	var loopDefault = {
		loop: true,
	};
	var autoplayDefault = {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};
	var centeredSlidesDefault = {};
	var freeModeDefault = {}
	if ($(this).hasClass('no-loop')) {
		loopDefault = {
			loop: false,
		};
	}
	if ($(this).hasClass('no-autoplay')) {
		autoplayDefault = {
			autoplay: false,
		};
	}
	if ($(this).hasClass('one-autoplay')) {
		autoplayDefault = {
			autoplay: {
				delay: 1,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	if ($(this).hasClass('centered-slides')) {
		centeredSlidesDefault = {
			centeredSlides: true,
			centeredSlidesBounds: true,
		};
	}
	if ($(this).hasClass('is-free-mode')) {
		freeModeDefault = {
			freeMode: true
		}
	}
	$(this).find('.swiper').addClass(`swiper-auto-${index}`);
	$(this).find('.swiper-pagination').addClass(`pagination-auto-${index}`);
	$(this).find('.button-prev').addClass(`prev-auto-${index}`);
	$(this).find('.button-next').addClass(`next-auto-${index}`);
	const autoSlider = new Swiper(`.swiper-auto-${index}`, {
		...defaultSettingSwiper,
		...loopDefault,
		...autoplayDefault,
		...freeModeDefault,
		speed: 3000,
		spaceBetween: 16,
		slidesPerView: 'auto',
		navigation: {
			prevEl: `.auto-slider .prev-auto-${index}`,
			nextEl: `.auto-slider .next-auto-${index}`,
		},
		pagination: {
			el: `.auto-slider .pagination-auto-${index}`,
			clickable: true,
		},
		breakpoints: {
			1200: {
				spaceBetween: 32,
			},
			1400: {
				spaceBetween: 40,
			},
		},
	});
});

const serviceDetailThumbs = new Swiper(".service-dt-slider .service-thumbs", {
	spaceBetween: 15,
	slidesPerView: 4,
	// freeMode: true,
	watchSlidesProgress: true,
	breakpoints: {
		1200: {
			slidesPerView: 5,
		},
	},
});
const serviceDetailTop = new Swiper(".service-dt-slider .service-top", {
	...defaultSettingSwiper,
	// effect: "fade",
	spaceBetween: 0,
	navigation: {
		nextEl: ".service-dt-slider .button-next",
		prevEl: ".service-dt-slider .button-prev",
	},
	thumbs: {
		swiper: serviceDetailThumbs,
	},
});

function lozadInit() {
	// Initialize library to lazy load images
	const observer = lozad('.lozad', {
		threshold: 0.1,
		enableAutoReload: true,
	});
	// data-background-image="image.png"
	const backgroundObserver = lozad('.lozad-bg', {
		threshold: 0.1,
	});
	observer.observe();
	backgroundObserver.observe();
}

function fancyboxInit() {
	Fancybox.bind("[data-fancybox]", {
		showLoading: true,
		preload: true,
		infinite: false,
		// parentEl: document.forms[0], // Element containing main structure
		mainClass: "fancybox-wrapper", // Custom class name or multiple space-separated class names for the container
	});

	Fancybox.bind("a.popup-link", {
		showLoading: true,
		type: "iframe",
		preload: true,
	});

	Fancybox.bind('[data-fancybox="single"]', {
		groupAttr: false,
	});

	$(".btn-close-fancybox").on("click", function () {
		Fancybox.close();
	});
}

function countUpInit() {
	$('.count-up').each(function (index) {
		$(this).attr('id', `countUp-${index}`)
		const endVal = $(this).data('count');

		const options = {
			separator: '',
			enableScrollSpy: true,
			scrollSpyDelay: 1000,
			scrollSpyOnce: true,
			useEasing: true,
			useGrouping: true,
		};

		const countUp = new CountUp(`countUp-${index}`, endVal, options);

		// if (!countUp.error) {
		// 	countUp.start();
		// } else {
		// 	console.error(countUp.error);
		// }

		var waypoint = new Waypoint({
			element: document.getElementsByClassName('section-count-up')[0],
			handler: function (direction) {

				if (direction == "up") {
					countUp.reset();
				} else {
					countUp.start();
				}

			},
			offset: '50%'
		});

		// countUp.handleScroll();
	});
}

function accordionCollapse() {
	$('.accordion-item .accordion-head').on('click', function () {
		$(this)
			.parent()
			.toggleClass('active')
			.siblings().removeClass('active')
		$(this)
			.next().slideToggle()
			.parent()
			.siblings().find('.accordion-content').slideUp()
	});
}
