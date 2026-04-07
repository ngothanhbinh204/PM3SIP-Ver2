const initCoreValuesInteraction = () => {
    const svgSegments = document.querySelectorAll('.core-values-image svg [class*="segment-"]');
    const valueItems = document.querySelectorAll('.core-values-list .core-values-item');

    if (svgSegments.length && valueItems.length) {
        svgSegments.forEach((segment) => {
            // Find class starting with "segment-"
            const className = Array.from(segment.classList || []).find(cls => cls.startsWith('segment-') && cls !== 'segment-item' && cls !== 'segment-group');
            if (className) {
                const index = className.split('-')[1];
                const targetItem = document.querySelector(`.core-values-list .core-values-item.item-${index}`);

                if (targetItem) {
                    const activate = () => {
                        // Remove active class from all
                        valueItems.forEach(item => item.classList.remove('active'));
                        svgSegments.forEach(s => s.classList.remove('active'));
                        // Add to current
                        targetItem.classList.add('active');
                        segment.classList.add('active');
                    };

                    segment.addEventListener('mouseenter', activate);
                    segment.addEventListener('click', activate);
                }
            }
        });

        // Hovering over items directly also activates them and the corresponding segment
        valueItems.forEach((item) => {
            const className = Array.from(item.classList || []).find(cls => cls.startsWith('item-'));
            if (className) {
                const index = className.split('-')[1];
                const targetSegment = document.querySelector(`.core-values-image svg .segment-${index}`);
                
                if (targetSegment) {
                    const activate = () => {
                        valueItems.forEach(i => i.classList.remove('active'));
                        svgSegments.forEach(s => s.classList.remove('active'));
                        
                        item.classList.add('active');
                        targetSegment.classList.add('active');
                    };
                    
                    item.addEventListener('mouseenter', activate);
                    item.addEventListener('click', activate);
                }
            }
        });

        // Remove active states when leaving the section entirely
        const section = document.querySelector('.section-core-values');
        if (section) {
            section.addEventListener('mouseleave', () => {
                valueItems.forEach(item => item.classList.remove('active'));
                svgSegments.forEach(s => s.classList.remove('active'));
            });
        }
    }
};

const initInfrastructureInteraction = () => {
    const infraItems = document.querySelectorAll('.infrastructure-item');
    const bgItems = document.querySelectorAll('.infrastructure-list .bg-item');

    if (infraItems.length && bgItems.length) {
        infraItems.forEach((item, index) => {
            const activate = () => {
                // activate bg
                bgItems.forEach(bg => bg.classList.remove('active'));
                if (bgItems[index]) {
                    bgItems[index].classList.add('active');
                }
            };

            item.addEventListener('mouseenter', activate);
            item.addEventListener('click', activate);
        });
    }
};

const initCoreValuesSwiper = () => {
    if (document.querySelector('.core-values-swiper') && window.Swiper) {
        new Swiper('.core-values-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
            },
            loop: true,
            pagination: {
                el: '.core-values-swiper .swiper-pagination',
                clickable: true,
            },
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initCoreValuesInteraction();
    initInfrastructureInteraction();
    initCoreValuesSwiper();
});


function generalNavScrollSpy() {
	if ($('.general-nav').length) {
		const navHeight = $('.general-nav').outerHeight() + ($('header').outerHeight() || 80);
		
		$('.general-nav .nav-link').on('click', function (e) {
			e.preventDefault();
			const target = $(this).attr('href');
			if (target && target !== '#' && $(target).length) {
				$('html, body').animate({
					scrollTop: $(target).offset().top - navHeight + 20
				}, 600);
			}
		});

		$(window).on('scroll', function () {
			let scrollPosition = $(window).scrollTop() + navHeight + 20;
			$('.general-nav .nav-link').each(function () {
				const currentLink = $(this);
				const targetId = currentLink.attr("href");
				if (targetId && targetId !== '#' && $(targetId).length) {
					const refElement = $(targetId);
					if (refElement.offset().top <= scrollPosition && refElement.offset().top + refElement.outerHeight() > scrollPosition) {
						if (!currentLink.parent().hasClass("active")) {
							$('.general-nav .nav-item').removeClass("active");
							currentLink.parent().addClass("active");
							
							const container = $('.general-nav .nav-list');
							if(container.length) {
								const scrollLeft = currentLink.parent().position().left + container.scrollLeft() - (container.width() / 2) + (currentLink.parent().width() / 2);
								container.stop().animate({ scrollLeft: scrollLeft }, 300);
							}
						}
					}
				}
			});
		});
	}
}

generalNavScrollSpy();



const generalBannerThumbs = new Swiper(".general-banner .banner-thumbs", {
	spaceBetween: 20,
	slidesPerView: 2,
	freeMode: true,
	watchSlidesProgress: true,
});
const generalBannerTop = new Swiper(".general-banner .banner-top", {
	...defaultSettingSwiper,
	effect: "fade",
	spaceBetween: 0,
	rewind: true,
	navigation: {
		nextEl: ".general-banner .button-next",
		prevEl: ".general-banner .button-prev",
	},
	thumbs: {
		swiper: generalBannerThumbs,
	},
});

