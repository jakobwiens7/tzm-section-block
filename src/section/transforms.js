/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { IMAGE_BACKGROUND_TYPE, VIDEO_BACKGROUND_TYPE } from './shared';
import cleanEmptyObject from '../utils/clean-empty-object';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['core/cover'],
			transform: (
				{
					url,
					alt,
					align,
					id,
					anchor,
					style,
					isRepeated,
					hasParallax,
					dimRatio,
					overlayColor,
					customOverlayColor,
					backgroundType,
					focalPoint,
					minHeight,
					minHeightUnit,
					gradient,
					customGradient,
					contentPosition,
				},
				innerBlocks
			) => {
				// Vertical Alignment
				let newVerticalAlignment = 'center';
				if (contentPosition) {
					if (contentPosition.includes('top')) {
						newVerticalAlignment = 'top';
					} else if (contentPosition.includes('bottom')) {
						newVerticalAlignment = 'bottom';
					}
				}

				return createBlock(
					'tzm/section',
					{
						verticalAlignment: newVerticalAlignment,
						minHeight,
						minHeightUnit,
						overlayColor,
						customOverlayColor,
						parallaxMode: hasParallax ? 'fixed' : null,
						isRepeated,
						gradient,
						customGradient,
						focalPoint,
						dimRatio,
						url,
						alt,
						align,
						id,
						anchor,
						style,
						backgroundType,
					},
					innerBlocks
				);
			},
		},
		{
			type: 'block',
			blocks: ['core/image'],
			transform: ({ caption, url, alt, align, id, anchor, style }) =>
				createBlock(
					'tzm/section',
					{
						dimRatio: 50,
						url,
						alt,
						align,
						id,
						anchor,
						style: {
							color: {
								duotone: style?.color?.duotone,
							},
						},
					},
					[
						createBlock('core/paragraph', {
							content: caption,
							fontSize: 'large',
							align: 'center',
						}),
					]
				),
		},
		{
			type: 'block',
			blocks: ['core/video'],
			transform: ({ caption, src, align, id, anchor }) =>
				createBlock(
					'tzm/section',
					{
						dimRatio: 50,
						url: src,
						align,
						id,
						backgroundType: VIDEO_BACKGROUND_TYPE,
						anchor,
					},
					[
						createBlock('core/paragraph', {
							content: caption,
							fontSize: 'large',
							align: 'center',
						}),
					]
				),
		},
		{
			type: 'block',
			blocks: ['core/group'],
			transform: (attributes, innerBlocks) => {
				const { align, anchor, backgroundColor, gradient, style } =
					attributes;

				// If the Group block being transformed has a Section block as its
				// only child return that Section block.
				if (
					innerBlocks?.length === 1 &&
					innerBlocks[0]?.name === 'tzm/section'
				) {
					return createBlock(
						'tzm/section',
						innerBlocks[0].attributes,
						innerBlocks[0].innerBlocks
					);
				}

				// If no background or gradient color is provided, default to 50% opacity.
				// This matches the styling of a Section block with a background image,
				// in the state where a background image has been removed.
				const dimRatio =
					backgroundColor ||
					gradient ||
					style?.color?.background ||
					style?.color?.gradient
						? undefined
						: 50;

				// Move the background or gradient color to the parent Section block.
				const parentAttributes = {
					align,
					anchor,
					dimRatio,
					overlayColor: backgroundColor,
					customOverlayColor: style?.color?.background,
					gradient,
					customGradient: style?.color?.gradient,
				};

				const attributesWithoutBackgroundColors = {
					...attributes,
					backgroundColor: undefined,
					gradient: undefined,
					style: cleanEmptyObject({
						...attributes?.style,
						color: style?.color
							? {
									...style?.color,
									background: undefined,
									gradient: undefined,
							  }
							: undefined,
					}),
				};

				// Preserve the block by nesting it within the Section block,
				// instead of converting the Group block directly to the Section block.
				return createBlock('tzm/section', parentAttributes, [
					createBlock(
						'core/group',
						attributesWithoutBackgroundColors,
						innerBlocks
					),
				]);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/cover'],
			transform: (
				{
					url,
					alt,
					align,
					id,
					anchor,
					style,
					verticalAlignment,
					minHeight,
					minHeightUnit,
					overlayColor,
					customOverlayColor,
					gradient,
					customGradient,
					isRepeated,
					parallaxMode,
					dimRatio,
					useFeaturedImage,
					backgroundType,
				},
				innerBlocks
			) => {
				return createBlock(
					'core/cover',
					{
						url,
						alt,
						align,
						id,
						anchor,
						style,
						minHeight,
						minHeightUnit,
						contentPosition: verticalAlignment + ' center',
						overlayColor,
						customOverlayColor,
						gradient,
						customGradient,
						hasParallax: parallaxMode,
						dimRatio,
						isRepeated,
						useFeaturedImage,
						backgroundType,
					},
					innerBlocks
				);
			},
		},
		{
			type: 'block',
			blocks: ['core/image'],
			isMatch: ({
				backgroundType,
				url,
				overlayColor,
				customOverlayColor,
				gradient,
				customGradient,
			}) => {
				if (url) {
					// If a url exists the transform could happen if that URL represents an image background.
					return backgroundType === IMAGE_BACKGROUND_TYPE;
				}
				// If a url is not set the transform could happen if the section has no background color or gradient;
				return (
					!overlayColor &&
					!customOverlayColor &&
					!gradient &&
					!customGradient
				);
			},
			transform: ({ title, url, alt, align, id, anchor, style }) =>
				createBlock('core/image', {
					caption: title,
					url,
					alt,
					align,
					id,
					anchor,
					style: {
						color: {
							duotone: style?.color?.duotone,
						},
					},
				}),
		},
		{
			type: 'block',
			blocks: ['core/video'],
			isMatch: ({
				backgroundType,
				url,
				overlayColor,
				customOverlayColor,
				gradient,
				customGradient,
			}) => {
				if (url) {
					// If a url exists the transform could happen if that URL represents a video background.
					return backgroundType === VIDEO_BACKGROUND_TYPE;
				}
				// If a url is not set the transform could happen if the section has no background color or gradient;
				return (
					!overlayColor &&
					!customOverlayColor &&
					!gradient &&
					!customGradient
				);
			},
			transform: ({ title, url, align, id, anchor }) =>
				createBlock('core/video', {
					caption: title,
					src: url,
					id,
					align,
					anchor,
				}),
		},
		{
			type: 'block',
			blocks: ['core/group'],
			isMatch: ({ url }) => {
				// If the Section block uses background media, skip this transform,
				// and instead use the Group block's default transform.
				if (url) {
					return false;
				}
				return true;
			},
			transform: (attributes, innerBlocks) => {
				// Convert Section overlay colors to comparable Group background colors.
				const transformedColorAttributes = {
					backgroundColor: attributes?.overlayColor,
					gradient: attributes?.gradient,
					style: cleanEmptyObject({
						...attributes?.style,
						color:
							attributes?.customOverlayColor ||
							attributes?.customGradient ||
							attributes?.style?.color
								? {
										background:
											attributes?.customOverlayColor,
										gradient: attributes?.customGradient,
										...attributes?.style?.color,
								  }
								: undefined,
					}),
				};

				// If the Section block contains only a single Group block as a direct child,
				// then attempt to merge the Section's background colors with the child Group block,
				// and remove the Section block as the wrapper.
				if (
					innerBlocks?.length === 1 &&
					innerBlocks[0]?.name === 'core/group'
				) {
					const groupAttributes = cleanEmptyObject(
						innerBlocks[0].attributes || {}
					);

					// If the Group block contains any kind of background color or gradient,
					// skip merging Section background colors, and preserve the Group block's colors.
					if (
						groupAttributes?.backgroundColor ||
						groupAttributes?.gradient ||
						groupAttributes?.style?.color?.background ||
						groupAttributes?.style?.color?.gradient
					) {
						return createBlock(
							'core/group',
							groupAttributes,
							innerBlocks[0]?.innerBlocks
						);
					}

					return createBlock(
						'core/group',
						{
							...transformedColorAttributes,
							...groupAttributes,
							style: cleanEmptyObject({
								...groupAttributes?.style,
								color:
									transformedColorAttributes?.style?.color ||
									groupAttributes?.style?.color
										? {
												...transformedColorAttributes
													?.style?.color,
												...groupAttributes?.style
													?.color,
										  }
										: undefined,
							}),
						},
						innerBlocks[0]?.innerBlocks
					);
				}

				// In all other cases, transform the Section block directly to a Group block.
				return createBlock(
					'core/group',
					{ ...attributes, ...transformedColorAttributes },
					innerBlocks
				);
			},
		},
	],
};

export default transforms;
