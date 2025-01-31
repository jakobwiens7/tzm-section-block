/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	useInnerBlocksProps,
	getColorClassName,
	__experimentalGetGradientClass,
	useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	//IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	dimRatioToClass,
} from './_shared';

import { 
	SvgDivider
} from './_dividers';

import MediaBackground from './media-background';


export default function save( { attributes } ) {
	const {
		tagName: Tag,
		gradient,
		verticalAlignment,
		customGradient,
		customOverlayColor,
		dimRatio,
		backgroundType,
		useFeaturedImage,
		url,
		parallaxMode,
		isDark,
		overlayColor,
		minHeight: minHeightProp,
		minHeightUnit,
		minHeightSelector,
		dividerTop,
		dividerBottom,
		verticalClip,
	} = attributes;

	const isVideo = VIDEO_BACKGROUND_TYPE === backgroundType;

	const overlayColorClass = getColorClassName(
		'background-color',
		overlayColor
	);
	const gradientClass = __experimentalGetGradientClass( gradient );

	const minHeight =
		minHeightProp && minHeightUnit
			? `${ minHeightProp }${ minHeightUnit }`
			: minHeightProp;

	const style = {
		minHeight: ( ! minHeightSelector && minHeight ) || undefined,
		overflow: ! verticalClip ? "clip visible" : undefined
	};

	const bgStyle = {
		backgroundColor: ! overlayColorClass ? customOverlayColor : undefined,
		background: customGradient ? customGradient : undefined,
	};

	const classes = clsx( {
		'is-light': ! isDark,
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	const gradientValue = gradient || customGradient;

	return (
		<Tag { ...useBlockProps.save( { className: classes, style } ) }
			data-height-selector={
				minHeight === '100vh' && minHeightSelector
					? minHeightSelector
					: undefined
			}
		>
			<span
				aria-hidden="true"
				className={ clsx(
					'wp-block-tzm-section__background',
					overlayColorClass,
					dimRatioToClass( dimRatio ),
					{
						'has-background-dim': dimRatio !== undefined,
						'has-background-gradient': gradientValue,
						[ gradientClass ]: gradientClass,
					}
				) }
				style={ bgStyle }
			/>

			{ !useFeaturedImage && !! url && (
				parallaxMode && ( 
					isVideo || 
					( !isVideo && parallaxMode !== 'fixed' ) 
				) ? (
					<parallax-wrapper className={ `has-parallax-${ parallaxMode }` }>
						<MediaBackground atts={ attributes }/>
					</parallax-wrapper>
				) : ( 
					<MediaBackground atts={ attributes }/>
				)
			) }

			{ !! dividerTop?.shape && (
				<SvgDivider
					className={ clsx('wp-block-tzm-section__divider-shape',
						`has-top-position`,
						`has-${ dividerTop.shape }-shape`,
						{ 'is-flipped': dividerTop.flipped }
					) }
					shape={ dividerTop.shape }
					color={ dividerTop.color }
					height={ dividerTop.height + "vw" }
				/>
			) }

			<div
				{ ...useInnerBlocksProps.save( {
					className: 'wp-block-tzm-section__inner-container',
				} ) }
			/>

			{ !! dividerBottom?.shape && (
				<SvgDivider 
					className={ clsx('wp-block-tzm-section__divider-shape',
						`has-bottom-position`,
						`has-${ dividerBottom.shape }-shape`,
						{ 'is-flipped': dividerBottom.flipped }
					) }
					shape={ dividerBottom.shape }
					color={ dividerBottom.color }
					height={ dividerBottom.height + "vw" }
				/>
			) }
		</Tag>
	);
}
