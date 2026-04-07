$(function () {
	APP.init();
	lozadInit();
	fancyboxInit();
	countUpInit();
	loadMoreItem();

	AOS.init({
		duration: 800,
		easing: 'ease-out-cubic',
		once: true,
		offset: 100,
	});

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

	infrastructureItemToggle();
	// honeycombAnimation(); // Replaced with AOS
	locationTabToggle();
	section5ServiceTabs();
	section5ServicePopups();
	khoPhuyWarehouseAccordion();
	khoPhuyServicesSlider();
});



function infrastructureItemToggle() {
	if ($('.general-infrastructure .infrastructure-item').length) {
		$('.general-infrastructure .infrastructure-item').on('click', function (e) {
			// Only work on mobile and tablet (< 1024px)
			if ($(window).width() < 1024) {
				const $item = $(this);
				const isActive = $item.hasClass('active');
				
				// Remove active from all items
				$('.general-infrastructure .infrastructure-item').removeClass('active');
				
				// Toggle active on clicked item
				if (!isActive) {
					$item.addClass('active');
					
					// Optional: smooth scroll to item if needed
					const infrastructureTop = $('.general-infrastructure').offset().top;
					const navHeight = $('.general-nav').outerHeight() + ($('header').outerHeight() || 80);
					const scrollTarget = $item.offset().top - navHeight - 20;
					
					// Only scroll if item is not in viewport
					if (scrollTarget < $(window).scrollTop()) {
						$('html, body').animate({
							scrollTop: scrollTarget
						}, 400);
					}
				}
			}
		});
		
		// Remove active class on window resize to desktop
		$(window).on('resize', function () {
			if ($(window).width() >= 1024) {
				$('.general-infrastructure .infrastructure-item').removeClass('active');
			}
		});
	}
}

// Honeycomb Animation - COMMENTED OUT (using AOS instead)
// function honeycombAnimation() {
// 	if ($('.honeycomb-cluster').length) {
// 		const hexItems = $('.honeycomb-cluster .hex-item');
// 		
// 		// Check if element is in viewport
// 		function isInViewport(element) {
// 			const rect = element.getBoundingClientRect();
// 			return (
// 				rect.top >= 0 &&
// 				rect.left >= 0 &&
// 				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
// 				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
// 			);
// 		}
// 		
// 		// Animate hexagons when in viewport
// 		function animateHexagons() {
// 			const cluster = $('.honeycomb-cluster')[0];
// 			if (cluster && isInViewport(cluster)) {
// 				hexItems.each(function(index) {
// 					const $hex = $(this);
// 					setTimeout(function() {
// 						$hex.addClass('hex-visible');
// 					}, index * 100); // Stagger animation
// 				});
// 				// Remove scroll listener after animation
// 				$(window).off('scroll', animateHexagons);
// 			}
// 		}
// 		
// 		// Initial check
// 		animateHexagons();
// 		
// 		// Check on scroll
// 		$(window).on('scroll', animateHexagons);
// 		
// 		// Add continuous floating animation
// 		hexItems.each(function(index) {
// 			const $hex = $(this);
// 			const delay = index * 0.2;
// 			$hex.css({
// 				'animation-delay': delay + 's'
// 			});
// 		});
// 	}
// }

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
			$('.backdrop-mobile').fadeToggle();
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
	rewind: true,
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
			1400: {
				slidesPerView: 4,
				spaceBetween: 40,
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
				spaceBetween: 40,
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

		const waypointEl = document.getElementsByClassName('section-count-up')[0] || this;
		var waypoint = new Waypoint({
			element: waypointEl,
			handler: function (direction) {
				if (direction == "up") {
					countUp.reset();
				} else {
					countUp.start();
				}
			},
			offset: '50%'
		});
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

function loadMoreItem() {
	$('.load-more-wrap').each(function () {
		let $this = $(this);
		let loadMore = $this.data('load-more')
		let loadMoreItem = $this.find('.load-more-item');
		let loadMoreButton = $this.find('.load-more-button');
		$(loadMoreItem).slice(0, loadMore).show();

		$(loadMoreButton).on('click', function (e) {
			e.preventDefault();
			let loadMoreItemHidden = $this.find('.load-more-item:hidden');
			$(loadMoreItemHidden).slice(0, loadMore).slideDown();
			let loadMoreItemHiddenLength = $this.find('.load-more-item:hidden').length;
			if ($(loadMoreItemHiddenLength).length == 0) {
				$(loadMoreButton).fadeOut('slow');
			}
		});
	})
}
const height = $("header").height();
document.documentElement.style.setProperty(
	"--header-height",
	`${height}px`,
);

function updateHeaderHeight() {
	const header = document.querySelector('header');
	if (!header) return;
	const height = header.offsetHeight;
	document.documentElement.style.setProperty('--header-height', height + 'px');
}
window.addEventListener('load', updateHeaderHeight);
window.addEventListener('resize', updateHeaderHeight);

function locationTabToggle() {
	if ($('.general-location .tabs-container').length) {
		$('.general-location .tabs-container .btn').on('click', function () {
			const $this = $(this);
			const target = $this.data('target');
			
			if (!$this.hasClass('active')) {
				// Remove active from all tabs
				$('.general-location .tabs-container .btn').removeClass('active');
				// Add active to clicked tab
				$this.addClass('active');
				
				// Hide all panes
				$('.general-location .map-wrapper .map-pane').removeClass('active');
				// Show target pane
				if (target && $(target).length) {
					$(target).addClass('active');
				}
			}
		});
	}
}

function section5ServiceTabs() {
	if (!$('.section-cangcanphumy-services').length) {
		return;
	}

	$('.section-cangcanphumy-services .service-tab-item').on('click', function () {
		const $this = $(this);
		const $section = $this.closest('.section-cangcanphumy-services');
		const target = $this.data('target');

		if ($this.hasClass('active')) {
			return;
		}

		$section.find('.service-tab-item').removeClass('active').attr('aria-selected', 'false');
		$this.addClass('active').attr('aria-selected', 'true');

		$section.find('.service-pane').removeClass('active');
		if (target && $section.find(target).length) {
			$section.find(target).addClass('active');
		}
	});
}

function section5ServicePopups() {
	const $section = $('.section-cangcanphumy-services');
	if (!$section.length) {
		return;
	}

	const $body = $('body');

	function closeSection5Popup() {
		$section.find('.service-popup').removeClass('active').attr('aria-hidden', 'true');
		$body.removeClass('service-popup-open');
	}

	function openSection5Popup(targetId) {
		const $popup = $section.find(`#${targetId}`);
		if (!$popup.length) {
			return;
		}

		closeSection5Popup();
		$popup.addClass('active').attr('aria-hidden', 'false');
		$body.addClass('service-popup-open');

		window.requestAnimationFrame(function () {
			initSection5PopupSlider($popup);
		});
	}

	$section.on('click', '.service-more-btn', function () {
		openSection5Popup($(this).data('popupTarget'));
	});

	$section.on('click', '[data-popup-close="true"]', function () {
		closeSection5Popup();
	});

	$(document).on('keydown.section5Popup', function (event) {
		if (event.key === 'Escape') {
			closeSection5Popup();
		}
	});
}

function khoPhuyWarehouseAccordion() {
	const $section = $('.section-khophumy-warehouse');
	if (!$section.length) return;

	// Initialise swiper for a gallery panel (lazy, once only)
	function initWarehouseSwiper($gallery) {
		if ($gallery.data('swiperInit')) return;
		$gallery.data('swiperInit', true);

		const swiperEl = $gallery.find('.swiper')[0];
		const prevEl = $gallery.find('.button-prev')[0];
		const nextEl = $gallery.find('.button-next')[0];

		if (!swiperEl) return;

		new Swiper(swiperEl, {
			preventInteractionOnTransition: true,
			observer: true,
			observeParents: true,
			loop: true,
			speed: 700,
			spaceBetween: 0,
			navigation: {
				prevEl: prevEl,
				nextEl: nextEl,
			},
		});
	}

	// Activate the first gallery on page load
	const $firstGallery = $section.find('.warehouse-gallery.active');
	if ($firstGallery.length) {
		initWarehouseSwiper($firstGallery);
	}

	$section.find('.warehouse-tab-item').on('click', function () {
		const $item = $(this);
		if ($item.hasClass('active')) return;

		const target = $item.data('target');

		// Deactivate all
		$section.find('.warehouse-tab-item').removeClass('active')
			.find('.warehouse-tab-btn').attr('aria-expanded', 'false');
		$section.find('.warehouse-gallery').removeClass('active').attr('aria-hidden', 'true');

		// Activate clicked
		$item.addClass('active')
			.find('.warehouse-tab-btn').attr('aria-expanded', 'true');

		if (target) {
			const $gallery = $section.find(target);
			$gallery.addClass('active').attr('aria-hidden', 'false');
			initWarehouseSwiper($gallery);
		}
	});
}

function khoPhuyServicesSlider() {
    if (!$('.section-khophumy-services').length) return;

    new Swiper('.section-khophumy-services .swiper', {
        preventInteractionOnTransition: true,
        observer: true,
        observeParents: true,
        loop: true,
        speed: 800,
        spaceBetween: 24,
        centeredSlides: false, 
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        slidesPerView: 1.2, 
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2.5,
				slidesOffsetBefore: 80,
                slidesOffsetAfter: 80,
            },
            768: {
                slidesPerView: 3.5,
				slidesOffsetBefore: 80,
                slidesOffsetAfter: 80,
            },
            1024: {
                slidesPerView: 4.5, 
				slidesOffsetBefore: 60,
                slidesOffsetAfter: 60,
            },
            1440: {
                slidesPerView: 4.5, 
				slidesOffsetBefore: 80,
                slidesOffsetAfter: 80,
            },
        },
    });
}

function initSection5PopupSlider($popup) {
	const $slider = $popup.find('.service-popup-slider');
	if (!$slider.length) {
		return;
	}

	const swiperInstances = $slider.data('swiperInstances');
	if (swiperInstances) {
		swiperInstances.thumbs.update();
		swiperInstances.top.update();
		return;
	}

	const thumbsElement = $slider.find('.service-popup-thumbs')[0];
	const topElement = $slider.find('.service-popup-top')[0];
	const prevElement = $slider.find('.button-prev')[0];
	const nextElement = $slider.find('.button-next')[0];

	if (!thumbsElement || !topElement || !prevElement || !nextElement) {
		return;
	}

	const thumbsSwiper = new Swiper(thumbsElement, {
		spaceBetween: 16,
		slidesPerView: 2.2,
		watchSlidesProgress: true,
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
		},
	});

	const topSwiper = new Swiper(topElement, {
		...defaultSettingSwiper,
		effect: 'fade',
		spaceBetween: 0,
		navigation: {
			nextEl: nextElement,
			prevEl: prevElement,
		},
		thumbs: {
			swiper: thumbsSwiper,
		},
	});

	$slider.data('swiperInstances', {
		thumbs: thumbsSwiper,
		top: topSwiper,
	});
}