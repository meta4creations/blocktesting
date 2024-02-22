// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './front.scss';

const block = 'wp-block-block-testing-swiper-slider';

jQuery(function($) {
	// Setup strict mode
	(function() {
		// init Swiper:
		function initSwiper($el) {
			const swiper = new Swiper($el.find('.swiper')[0], {
				slidesPerView: 1,
				loop: true,
				spaceBetween: 0,
				modules: [Navigation, Pagination],
				pagination: {
					el: $el.find('.swiper-pagination')[0],
					clickable: true,
				},
				navigation: {
					nextEl: $el.find('.swiper-button-next')[0],
					prevEl: $el.find('.swiper-button-prev')[0],
					clickable: true,
				},
			});
		}

		$(`.${block}`).each(function() {
			const $innerBlocks = $(this)
				.find('.swiper-wrapper')
				.children();
			$innerBlocks.each(function() {
				$(this).wrap('<div class="swiper-slide"></div>');
			});
			initSwiper($(this));
		});
	})();
});
