'use strict';

import './parallax-bg.js';

function initSectionHeight() {
	const sections = document.querySelectorAll( '[data-height-selector]' );

	if ( sections && sections.length > 0 ) {
		sections.forEach( ( section ) => {
			const selector = section.dataset.heightSelector;
			const selectorEl = document.querySelector( selector );

			if ( selectorEl ) {
				const selectorHeight = selectorEl.offsetHeight;
				section.style.setProperty(
					'--subtract-height',
					selectorHeight + 'px'
				);
			}
		} );
	}
}

document.addEventListener( 'DOMContentLoaded', ( event ) => {
	initSectionHeight();
} );
