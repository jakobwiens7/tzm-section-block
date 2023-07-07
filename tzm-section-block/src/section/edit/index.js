/**
 * External dependencies
 */
import classnames from 'classnames';
import { extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

/**
 * WordPress dependencies
 */
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { compose, useResizeObserver } from '@wordpress/compose';
import {
	withColors,
	useBlockProps,
	useSetting,
	useInnerBlocksProps,
	__experimentalUseGradient,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { isBlobURL } from '@wordpress/blob';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import {
	attributesFromMedia,
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	dimRatioToClass,
	mediaPosition,
	SvgDivider,
} from '../shared';

import useSectionIsDark from './use-section-is-dark';
import SectionInspectorControls from './inspector-controls';
import SectionBlockControls from './block-controls';
import ResizableSection from './resizable-section';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import '../editor.scss';

extend([namesPlugin]);

function getInnerBlocksTemplate(attributes) {
	return [
		[
			'core/paragraph',
			{
				align: 'center',
				placeholder: __('Write title…'),
				...attributes,
			},
		],
	];
}

/**
 * Is the URL a temporary blob URL? A blob URL is one that is used temporarily while
 * the media (image or video) is being uploaded and will not have an id allocated yet.
 *
 * @param {number} id  The id of the media.
 * @param {string} url The url of the media.
 *
 * @return {boolean} Is the URL a Blob URL.
 */
const isTemporaryMedia = (id, url) => !id && isBlobURL(url);

function SectionEdit({
	attributes,
	clientId,
	isSelected,
	overlayColor,
	setAttributes,
	setOverlayColor,
	toggleSelection,
	context: { postId, postType },
}) {
	const {
		tagName: Tag,
		verticalAlignment,
		id,
		useFeaturedImage,
		dimRatio,
		focalPoint,
		parallaxMode,
		isDark,
		isRepeated,
		minHeight,
		minHeightUnit,
		//minHeightSelector,
		alt,
		dividerTop,
		dividerBottom,
		dividerHeight,
		allowedBlocks,
		templateLock,
	} = attributes;


	const [featuredImage] = useEntityProp(
		'postType',
		postType,
		'featured_media',
		postId
	);

	const media = useSelect(
		(select) =>
			featuredImage &&
			select(coreStore).getMedia(featuredImage, { context: 'view' }),
		[featuredImage]
	);
	const mediaUrl = media?.source_url;

	// instead of destructuring the attributes
	// we define the url and background type
	// depending on the value of the useFeaturedImage flag
	// to preview in edit the dynamic featured image
	const url = useFeaturedImage ? mediaUrl : attributes.url;
	const backgroundType = useFeaturedImage
		? IMAGE_BACKGROUND_TYPE
		: attributes.backgroundType;

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);
	const { createErrorNotice } = useDispatch( noticesStore );
	
	const { gradientClass, gradientValue } = __experimentalUseGradient();
	const onSelectMedia = attributesFromMedia(setAttributes, dimRatio);
	const isUploadingMedia = isTemporaryMedia(id, url);
	
	const onUploadError = ( message ) => {
		createErrorNotice( message, { type: 'snackbar' } );
	};
	
	const isSectionDark = useSectionIsDark(
		url,
		dimRatio,
		overlayColor.color
	);

	useEffect(() => {
		// This side-effect should not create an undo level.
		__unstableMarkNextChangeAsNotPersistent();
		setAttributes({ isDark: isSectionDark });
	}, [isSectionDark]);

	const isImageBackground = IMAGE_BACKGROUND_TYPE === backgroundType;
	const isVideoBackground = VIDEO_BACKGROUND_TYPE === backgroundType;

	const [ resizeListener, { height, width } ] = useResizeObserver();
	const resizableBoxDimensions = useMemo( () => {
		return {
			height: minHeightUnit === 'px' ? minHeight : 'auto',
			width: 'auto',
		};
	}, [ minHeight, minHeightUnit ] );

	const minHeightWithUnit =
		minHeight && minHeightUnit ? `${minHeight}${minHeightUnit}` : minHeight;

	const isImgElement = ! isRepeated;

	const style = {
		minHeight: minHeightWithUnit || undefined
	};

	const backgroundImage = url ? `url(${url})` : undefined;
	const backgroundPosition = mediaPosition(focalPoint);

	const bgStyle = { backgroundColor: overlayColor.color };
	const mediaStyle = {
		objectPosition:
			focalPoint && isImgElement ? mediaPosition(focalPoint) : undefined,
	};

	const hasInnerBlocks = useSelect(
		(select) =>
			select(blockEditorStore).getBlock(clientId).innerBlocks.length > 0,
		[clientId]
	);

	const ref = useRef();
	const blockProps = useBlockProps({ ref });

	// Check for fontSize support before we pass a fontSize attribute to the innerBlocks.
	const hasFontSizes = !!useSetting('typography.fontSizes')?.length;
	const innerBlocksTemplate = getInnerBlocksTemplate({
		fontSize: hasFontSizes ? 'large' : undefined,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-tzm-section__inner-container',
		},
		{
			// Avoid template sync when the `templateLock` value is `all` or `contentOnly`.
			// See: https://github.com/WordPress/gutenberg/pull/45632
			template: ! hasInnerBlocks ? innerBlocksTemplate : undefined,
			templateInsertUpdatesSelection: true,
			allowedBlocks,
			templateLock,
		}
	);
	
	const mediaElement = useRef();
	const currentSettings = {
		isVideoBackground,
		isImageBackground,
		mediaElement,
		hasInnerBlocks,
		url,
		isImgElement,
		overlayColor,
	};
	
	const toggleUseFeaturedImage = () => {
		setAttributes( {
			id: undefined,
			url: undefined,
			useFeaturedImage: ! useFeaturedImage,
			dimRatio: dimRatio === 100 ? 50 : dimRatio,
			backgroundType: useFeaturedImage
				? IMAGE_BACKGROUND_TYPE
				: undefined,
		} );
	};

	const classes = classnames({
		'is-dark-theme': isDark,
		'is-light': !isDark,
		'is-transient': isUploadingMedia,
		'is-repeated': isRepeated,
		[`has-parallax-${parallaxMode}`]:
			parallaxMode && (isVideoBackground || isImgElement),
		[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
	});

	const imgClasses = classnames('wp-block-tzm-section__image-background', {
		'jarallax-img': parallaxMode && isImageBackground && isImgElement,
		[`has-parallax-${parallaxMode}`]:
			parallaxMode && isImageBackground && !isImgElement,
	});

	return (
		<>
			<SectionBlockControls
				attributes={attributes}
				setAttributes={setAttributes}
				onSelectMedia={onSelectMedia}
				currentSettings={currentSettings}
				toggleUseFeaturedImage={ toggleUseFeaturedImage }
			/>
			<SectionInspectorControls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
				setOverlayColor={setOverlayColor}
				sectionRef={ref}
				currentSettings={currentSettings}
				toggleUseFeaturedImage={ toggleUseFeaturedImage }
			/>
			<Tag
				{...blockProps}
				className={classnames(classes, blockProps.className)}
				style={{ ...style, ...blockProps.style }}
				data-url={url}
			>
				<ResizableSection
					className="tzm-section__resize-container"
					onResizeStart={() => {
						setAttributes({ minHeightUnit: 'px' });
						toggleSelection(false);
					}}
					onResize={(value) => {
						setAttributes({ minHeight: value });
					}}
					onResizeStop={(newMinHeight) => {
						toggleSelection(true);
						setAttributes({ minHeight: newMinHeight });
					}}
					showHandle={isSelected}
				/>
				{ resizeListener }
				<span
					aria-hidden="true"
					className={classnames(
						'wp-block-tzm-section__background',
						dimRatioToClass(dimRatio),
						{
							[overlayColor.class]: overlayColor.class,
							'has-background-dim': dimRatio !== undefined,
							'has-background-gradient': gradientValue,
							[gradientClass]: gradientClass,
						}
					)}
					style={{ backgroundImage: gradientValue, ...bgStyle }}
				/>
				{url &&
					isImageBackground &&
					(isImgElement ? (
						<img
							ref={mediaElement}
							className={imgClasses}
							alt={alt}
							src={url}
							style={mediaStyle}
						/>
					) : (
						<div
							ref={mediaElement}
							role="img"
							className={classnames(
								classes,
								'wp-block-tzm-section__image-background'
							)}
							style={{ backgroundImage, backgroundPosition }}
						/>
					))}
				{url && isVideoBackground && (
					<video
						ref={mediaElement}
						className="wp-block-tzm-section__video-background"
						autoPlay
						muted
						loop
						src={url}
						style={mediaStyle}
					/>
				)}
				{isUploadingMedia && <Spinner />}

				{!!dividerTop.shape && (
					<SvgDivider
						divider={dividerTop}
						position="top"
						height={dividerHeight}
					/>
				)}
				<div {...innerBlocksProps} />
				{!!dividerBottom.shape && (
					<SvgDivider
						divider={dividerBottom}
						position="bottom"
						height={dividerHeight}
					/>
				)}
			</Tag>
		</>
	);
}

export default compose([withColors({ overlayColor: 'background-color' })])(
	SectionEdit
);
