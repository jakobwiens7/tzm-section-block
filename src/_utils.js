/**
 * External dependencies
 */
import { isEmpty, isObject, identity, mapValues, pickBy } from 'lodash';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import { FastAverageColor } from 'fast-average-color';
import memoize from 'memize';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';


/**
 * Adds a fallback unit to a numeric or string value if it doesn't already have one.
 * 
 * @param {string|number} value - The value to which a unit should be appended. It can be a number, string, or an empty value.
 * @param {string} defaultUnit - The unit to append to the value if it doesn't already have a unit. Defaults to 'px'.
 * 
 * @return {string|number} - Returns the value with the default unit appended if the value is a number or a numeric string. 
 */
export function addFallbackUnit(value, defaultUnit = 'px') {
	if (value === '' || isNaN(parseFloat(value))) return null;
	else if (typeof value === 'number') return value + defaultUnit;
	else if (typeof value === 'string' && !isNaN(value)) return value.trim() + defaultUnit;
	
	return value;
}


/**
 * Splits a shorthand CSS value into individual values for top, right, bottom, and left.
 * 
 * @param {string|object} value 	The shorthand value to split, typically a string (e.g., '10px'). 
 * 									If it is already an object or an undefined value, it is returned as-is.
 *
 * @return {object|string} 			Returns an object with `top`, `right`, `bottom`, and `left` properties if the input is a string.
 */
export function splitStyleValue( value ) {
	if ( value && typeof value === 'string' ) {
		return {
			top: value,
			right: value,
			bottom: value,
			left: value,
		};
	}
	return value;
}


/**
 * Validates and ensures that box-related values (e.g., padding or margin) have appropriate fallback units.
 *
 * @param {string|number|object} value	The box value to validate.
 * 
 * @return {string|object|undefined} 	Returns the validated value with fallback units added or `undefined` if the object has no valid sides with values.
 */
export function validateBoxValue( value ) {       
	// Handle object with top, right, bottom, left or a single value
	if ( typeof value === 'object' && value !== null ) {
		const paddedVal = {};

		// Ensure that each side has a fallback unit
		for (let side in value) {
			paddedVal[side] = addFallbackUnit(value[side]);
		}

		// Check if any of the box sides have values, otherwise set to undefined
		return Object.values(paddedVal).some(val => val !== undefined) ? paddedVal : undefined;

	} else {
		// Ensure that the single padding/margin value has a fallback unit
		return addFallbackUnit(value);
	}
}


/**
 * Utility function to check if an object has any nested value.
 * 
 * @param {object} 	obj		The object to check.
 * 
 * @return {boolean}		True if any child value is truthy, otherwise false.
 */
export function hasNestedValue( object ) {
    if (!object || typeof object !== "object") return false; // Return false for null, undefined, or non-objects

    return Object.values(object).some(value => {
        if (typeof value === "object" && value !== null) {
            // Recursive call for nested objects
            return hasNestedValue(value);
        }
        return !!value; // Check if the value is truthy
    });
}


/**
 * Removed empty nodes from nested objects.
 *
 * @param {Object} object
 * @return {Object} Object cleaned from empty nodes.
 */
export const cleanEmptyObject = ( object ) => {
	if ( ! isObject( object ) || Array.isArray( object ) ) return object;
	
    // Custom filter function to exclude only null, undefined, false and empty string values
    const isNotEmptyValue = (value) => value !== null && value !== undefined && value !== '' && value !== false;
	
	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		//identity
		isNotEmptyValue
	);
	return isEmpty( cleanedNestedObjects ) ? undefined : cleanedNestedObjects;
};


/**
 * @typedef {import('colord').RgbaColor} RgbaColor
 */

extend( [ namesPlugin ] );

/**
 * Fallback color when the average color can't be computed. The image may be
 * rendering as transparent, and most sites have a light color background.
 */
export const DEFAULT_BACKGROUND_COLOR = '#FFF';

/**
 * Default dim color specified in style.css.
 */
export const DEFAULT_OVERLAY_COLOR = '#000';


/**
 * Performs a Porter Duff composite source over operation on two rgba colors.
 *
 * @see {@link https://www.w3.org/TR/compositing-1/#porterduffcompositingoperators_srcover}
 *
 * @param {RgbaColor} source Source color.
 * @param {RgbaColor} dest   Destination color.
 *
 * @return {RgbaColor} Composite color.
 */
export function compositeSourceOver( source, dest ) {
	return {
		r: source.r * source.a + dest.r * dest.a * ( 1 - source.a ),
		g: source.g * source.a + dest.g * dest.a * ( 1 - source.a ),
		b: source.b * source.a + dest.b * dest.a * ( 1 - source.a ),
		a: source.a + dest.a * ( 1 - source.a ),
	};
}


/**
 * Retrieves the FastAverageColor singleton.
 *
 * @return {FastAverageColor} The FastAverageColor singleton.
 */
export function retrieveFastAverageColor() {
	if ( ! retrieveFastAverageColor.fastAverageColor ) {
		retrieveFastAverageColor.fastAverageColor = new FastAverageColor();
	}
	return retrieveFastAverageColor.fastAverageColor;
}


/**
 * Computes the average color of an image.
 *
 * @param {string} url The url of the image.
 *
 * @return {Promise<string>} Promise of an average color as a hex string.
 */
export const getMediaColor = memoize( async ( url ) => {
	if ( ! url ) {
		return DEFAULT_BACKGROUND_COLOR;
	}

	// making the default color rgb for compat with FAC
	const { r, g, b, a } = colord( DEFAULT_BACKGROUND_COLOR ).toRgb();

	try {
		const imgCrossOrigin = applyFilters(
			'media.crossOrigin',
			undefined,
			url
		);
		const color = await retrieveFastAverageColor().getColorAsync( url, {
			// The default color is white, which is the color
			// that is returned if there's an error.
			// colord returns alpga 0-1, FAC needs 0-255
			defaultColor: [ r, g, b, a * 255 ],
			// Errors that come up don't reject the promise,
			// so error logging has to be silenced
			// with this option.
			silent: process.env.NODE_ENV === 'production',
			crossOrigin: imgCrossOrigin,
		} );
		return color.hex;
	} catch ( error ) {
		// If there's an error return the fallback color.
		return DEFAULT_BACKGROUND_COLOR;
	}
} );


/**
 * Computes if the color combination of the overlay and background color is dark.
 *
 * @param {number} dimRatio        Opacity of the overlay between 0 and 100.
 * @param {string} overlayColor    CSS color string for the overlay.
 * @param {string} backgroundColor CSS color string for the background.
 *
 * @return {boolean} true if the color combination composite result is dark.
 */
export function compositeIsDark( dimRatio, overlayColor, backgroundColor ) {
	// Opacity doesn't matter if you're overlaying the same color on top of itself.
	// And background doesn't matter when overlay is fully opaque.
	if ( overlayColor === backgroundColor || dimRatio === 100 ) {
		return colord( overlayColor ).isDark();
	}
	const overlay = colord( overlayColor )
		.alpha( dimRatio / 100 )
		.toRgb();
	const background = colord( backgroundColor ).toRgb();
	const composite = compositeSourceOver( overlay, background );
	return colord( composite ).isDark();
}
