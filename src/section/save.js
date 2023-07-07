/**
 * External dependencies
 */
import classnames from 'classnames';

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
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	dimRatioToClass,
	mediaPosition,
	SvgDivider,
} from './shared';

export default function save({ attributes }) {
	const {
		tagName: Tag,
		backgroundType,
		gradient,
		verticalAlignment,
		customGradient,
		customOverlayColor,
		dimRatio,
		focalPoint,
		useFeaturedImage,
		parallaxMode,
		isDark,
		isRepeated,
		overlayColor,
		url,
		alt,
		id,
		minHeight: minHeightProp,
		minHeightUnit,
		minHeightSelector,
		dividerTop,
		dividerBottom,
		dividerHeight,
	} = attributes;

	const overlayColorClass = getColorClassName(
		'background-color',
		overlayColor
	);
	const gradientClass = __experimentalGetGradientClass(gradient);

	const minHeight =
		minHeightProp && minHeightUnit
			? `${minHeightProp}${minHeightUnit}`
			: minHeightProp;

	const isImageBackground = IMAGE_BACKGROUND_TYPE === backgroundType;
	const isVideoBackground = VIDEO_BACKGROUND_TYPE === backgroundType;

	const isImgElement = !isRepeated;

	const style = {
		minHeight: (!minHeightSelector && minHeight) || undefined
	};

	const bgStyle = {
		backgroundColor: !overlayColorClass ? customOverlayColor : undefined,
		background: customGradient ? customGradient : undefined,
	};

	const objectPosition =
		// prettier-ignore
		focalPoint && isImgElement
			  ? mediaPosition(focalPoint)
			  : undefined;

	const backgroundImage = url ? `url(${url})` : undefined;

	const backgroundPosition = mediaPosition(focalPoint);

	const classes = classnames({
		'is-light': !isDark,
		'is-repeated': isRepeated,
		[`has-parallax-${parallaxMode}`]:
			parallaxMode && (isVideoBackground || isImgElement),
		[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
	});

	const imgClasses = classnames(
		'wp-block-tzm-section__image-background',
		id ? `wp-image-${id}` : null,
		{
			'is-repeated': isRepeated,
			'jarallax-img': parallaxMode && isImageBackground && isImgElement,
			[`has-parallax-${parallaxMode}`]:
				parallaxMode && isImageBackground && !isImgElement,
		}
	);

	const gradientValue = gradient || customGradient;

	const urlExt = url?.split(/[#?]/)[0].split('.').pop().trim();

	return (
		<Tag
			{...useBlockProps.save({ className: classes, style })}
			data-height-selector={
				minHeight === '100vh' && minHeightSelector
					? minHeightSelector
					: undefined
			}
			data-video-src={
				parallaxMode && isVideoBackground && url
					? urlExt + ':' + url
					: undefined
			}
		>
			<span
				aria-hidden="true"
				className={classnames(
					'wp-block-tzm-section__background',
					overlayColorClass,
					dimRatioToClass(dimRatio),
					{
						'has-background-dim': dimRatio !== undefined,
						// For backwards compatibility. Former versions of the Section Block applied
						// `.wp-block-cover__gradient-background` in the presence of
						// media, a gradient and a dim.
						'wp-block-tzm-section__gradient-background':
							url && gradientValue && dimRatio !== 0,
						'has-background-gradient': gradientValue,
						[gradientClass]: gradientClass,
					}
				)}
				style={bgStyle}
			/>

			{!useFeaturedImage &&
				isImageBackground &&
				url &&
				(isImgElement ? (
					<img
						className={imgClasses}
						alt={alt}
						src={url}
						style={{ objectPosition }}
						data-object-fit="cover"
						data-object-position={objectPosition}
					/>
				) : (
					<div
						role="img"
						className={imgClasses}
						style={{ backgroundPosition, backgroundImage }}
						data-img-size={
							parallaxMode && isRepeated ? 'auto' : undefined
						}
						data-img-repeat={
							parallaxMode && isRepeated ? 'repeat' : undefined
						}
					/>
				))}
			{isVideoBackground && url && !parallaxMode && (
				<video
					className={classnames(
						'wp-block-tzm-section__video-background',
						'intrinsic-ignore'
					)}
					autoPlay
					muted
					loop
					playsInline
					src={url}
					style={{ objectPosition }}
					data-object-fit="cover"
					data-object-position={objectPosition}
				/>
			)}

			{!!dividerTop.shape && (
				<SvgDivider
					divider={dividerTop}
					position="top"
					height={dividerHeight}
				/>
			)}

			<div
				{...useInnerBlocksProps.save({
					className: 'wp-block-tzm-section__inner-container',
				})}
			/>

			{!!dividerBottom.shape && (
				<SvgDivider
					divider={dividerBottom}
					position="bottom"
					height={dividerHeight}
				/>
			)}
		</Tag>
	);
}
