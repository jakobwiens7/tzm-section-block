'use strict';

import { jarallax, jarallaxVideo } from 'jarallax';
jarallaxVideo(); // Optional video extension

function initSectionParallax() {
	jarallax(document.querySelectorAll('.has-parallax-fixed'), {
		speed: 0,
	});
	jarallax(document.querySelectorAll('.has-parallax-slow'), {
		speed: 0.15,
	});
	jarallax(document.querySelectorAll('.has-parallax-medium'), {
		speed: 0.4,
	});
	jarallax(document.querySelectorAll('.has-parallax-fast'), {
		speed: 1.2,
	});
}

function initSectionHeight() {
	var sections = document.querySelectorAll('[data-height-selector]');

	if (sections && sections.length > 0) {
		sections.forEach((section) => {
			var selector = section.dataset.heightSelector;
			var selectorEl = document.querySelector(selector);

			if (selectorEl) {
				var selectorHeight = selectorEl.offsetHeight;
				section.style.setProperty(
					'--subtract-height',
					selectorHeight + 'px'
				);
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', (event) => {
	initSectionHeight();
	initSectionParallax();
});
