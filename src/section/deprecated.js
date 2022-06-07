/**
 * External dependencies
 */
import { omit } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import {
	RichText,
	getColorClassName,
	InnerBlocks,
	__experimentalGetGradientClass,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	dimRatioToClass,
} from './shared';

function backgroundImageStyles(url) {
	return url ? { backgroundImage: `url(${url})` } : {};
}

/**
 * Original function to determine the background opacity classname
 *
 * Used in deprecations: v1-7.
 *
 * @param {number} ratio ratio to use for opacity.
 * @return {string}       background opacity class   .
 */
function dimRatioToClassV1(ratio) {
	return ratio === 0 || ratio === 50 || !ratio
		? null
		: 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

function migrateDimRatio(attributes) {
	return {
		...attributes,
		dimRatio: !attributes.url ? 100 : attributes.dimRatio,
	};
}

const blockAttributes = {
	url: {
		type: 'string',
	},
	id: {
		type: 'number',
	},
	parallaxMode: {
		type: 'string',
	},
	dimRatio: {
		type: 'number',
		default: 50,
	},
	overlayColor: {
		type: 'string',
	},
	customOverlayColor: {
		type: 'string',
	},
	backgroundType: {
		type: 'string',
		default: 'image',
	},
	focalPoint: {
		type: 'object',
	},
};

const v1 = {
	attributes: {
		...blockAttributes,
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		align: {
			type: 'string',
		},
		contentAlign: {
			type: 'string',
			default: 'center',
		},
	},
	supports: {
		className: false,
	},
	save({ attributes }) {
		const { url, title, parallaxMode, dimRatio, align } = attributes;
		const style = backgroundImageStyles(url);
		const classes = classnames(
			'wp-block-tzm-section-image',
			dimRatioToClassV1(dimRatio),
			{
				'has-background-dim': dimRatio !== 0,
				[`has-parallax-${parallaxMode}`]: parallaxMode,
			},
			align ? `align${align}` : null
		);

		return (
			<section className={classes} style={style}>
				<RichText.Content tagName="h2" value={title} />
			</section>
		);
	},
	migrate(attributes) {
		const newAttribs = {
			...attributes,
			dimRatio: !attributes.url ? 100 : attributes.dimRatio,
		};
		return [
			omit(newAttribs, ['title', 'contentAlign', 'align']),
			[
				createBlock('core/paragraph', {
					content: attributes.title,
					align: attributes.contentAlign,
					fontSize: 'large',
					placeholder: __('Write title…'),
				}),
			],
		];
	},
};

export default [v1];
