/**
 * External dependencies
 */
import clsx from 'clsx';

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
	useSettings,
	useInnerBlocksProps,
	__experimentalUseGradient,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { isBlobURL } from '@wordpress/blob';
//import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import {
	attributesFromMedia,
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	dimRatioToClass,
	//mediaPosition
} from '../_shared';

import {
	getMediaColor,
	compositeIsDark,
	DEFAULT_BACKGROUND_COLOR,
	DEFAULT_OVERLAY_COLOR,
} from '../_utils';

import { 
	SvgDivider
} from '../_dividers';

import MediaBackground from '../media-background';
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

function getInnerBlocksTemplate( attributes ) {
	return [
		[
			'core/paragraph',
			{
				align: 'center',
				placeholder: __( 'Write title…' ),
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
const isTemporaryMedia = ( id, url ) => ! id && isBlobURL( url );

function SectionEdit( {
	attributes,
	clientId,
	isSelected,
	overlayColor,
	setAttributes,
	setOverlayColor,
	toggleSelection,
	context: { postId, postType },
} ) {
	const {
		verticalAlignment,
		id,
		url: originalUrl,
		backgroundType: originalBackgroundType,
		useFeaturedImage,
		dimRatio,
		parallaxMode,
		isDark,
		minHeight,
		minHeightUnit,
		dividerTop,
		dividerBottom,
		verticalClip,
		allowedBlocks,
		templateLock,
		tagName: Tag,
		isUserOverlayColor,
	} = attributes;

	const [ featuredImage ] = useEntityProp(
		'postType',
		postType,
		'featured_media',
		postId
	);

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch( blockEditorStore );

	const media = useSelect(
		( select ) =>
			featuredImage &&
			select( coreStore ).getMedia( featuredImage, { context: 'view' } ),
		[ featuredImage ]
	);
	const mediaUrl = media?.source_url;

	// User can change the featured image outside of the block, but we still
	// need to update the block when that happens. This effect should only
	// run when the featured image changes in that case. All other cases are
	// handled in their respective callbacks.
	useEffect( () => {
		( async () => {
			if ( ! useFeaturedImage ) {
				return;
			}

			const averageBackgroundColor = await getMediaColor( mediaUrl );

			let newOverlayColor = overlayColor.color;
			if ( ! isUserOverlayColor ) {
				newOverlayColor = averageBackgroundColor;
				__unstableMarkNextChangeAsNotPersistent();
				setOverlayColor( newOverlayColor );
			}

			const newIsDark = compositeIsDark(
				dimRatio,
				newOverlayColor,
				averageBackgroundColor
			);
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( {
				isDark: newIsDark,
				isUserOverlayColor: isUserOverlayColor || false,
			} );
		} )();
		// Disable reason: Update the block only when the featured image changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ mediaUrl ] );

	// instead of destructuring the attributes
	// we define the url and background type
	// depending on the value of the useFeaturedImage flag
	// to preview in edit the dynamic featured image
	const url = useFeaturedImage
		? mediaUrl
		: // Ensure the url is not malformed due to sanitization through `wp_kses`.
		  originalUrl?.replaceAll( '&amp;', '&' );

	const backgroundType = useFeaturedImage
		? IMAGE_BACKGROUND_TYPE
		: originalBackgroundType;

	const isVideo = VIDEO_BACKGROUND_TYPE === backgroundType;

	//const { createErrorNotice } = useDispatch( noticesStore );
	const { gradientClass, gradientValue } = __experimentalUseGradient();

	const onSelectMedia = async ( newMedia ) => {
		const mediaAttributes = attributesFromMedia( newMedia );
		const isImage = [ newMedia?.type, newMedia?.media_type ].includes(
			IMAGE_BACKGROUND_TYPE
		);

		const averageBackgroundColor = await getMediaColor(
			isImage ? newMedia?.url : undefined
		);

		let newOverlayColor = overlayColor.color;
		if ( ! isUserOverlayColor ) {
			newOverlayColor = averageBackgroundColor;
			setOverlayColor( newOverlayColor );

			// Make undo revert the next setAttributes and the previous setOverlayColor.
			__unstableMarkNextChangeAsNotPersistent();
		}

		// Only set a new dimRatio if there was no previous media selected
		// to avoid resetting to 50 if it has been explicitly set to 100.
		// See issue #52835 for context.
		const newDimRatio =
			originalUrl === undefined && dimRatio === 100 ? 50 : dimRatio;

		const newIsDark = compositeIsDark(
			newDimRatio,
			newOverlayColor,
			averageBackgroundColor
		);

		setAttributes( {
			...mediaAttributes,
			focalPoint: undefined,
			useFeaturedImage: undefined,
			dimRatio: newDimRatio,
			isDark: newIsDark,
			isUserOverlayColor: isUserOverlayColor || false,
		} );
	};

	const onClearMedia = () => {
		let newOverlayColor = overlayColor.color;
		if ( ! isUserOverlayColor ) {
			newOverlayColor = DEFAULT_OVERLAY_COLOR;
			setOverlayColor( undefined );

			// Make undo revert the next setAttributes and the previous setOverlayColor.
			__unstableMarkNextChangeAsNotPersistent();
		}

		const newIsDark = compositeIsDark(
			dimRatio,
			newOverlayColor,
			DEFAULT_BACKGROUND_COLOR
		);

		setAttributes( {
			url: undefined,
			id: undefined,
			backgroundType: undefined,
			focalPoint: undefined,
			parallaxMode: undefined,
			isRepeated: undefined,
			useFeaturedImage: undefined,
			isDark: newIsDark,
		} );
	};

	const onSetOverlayColor = async ( newOverlayColor ) => {
		const averageBackgroundColor = await getMediaColor( url );
		const newIsDark = compositeIsDark(
			dimRatio,
			newOverlayColor,
			averageBackgroundColor
		);

		setOverlayColor( newOverlayColor );

		// Make undo revert the next setAttributes and the previous setOverlayColor.
		__unstableMarkNextChangeAsNotPersistent();

		setAttributes( {
			isUserOverlayColor: true,
			isDark: newIsDark,
		} );
	};

	const onUpdateDimRatio = async ( newDimRatio ) => {
		const averageBackgroundColor = await getMediaColor( url );
		const newIsDark = compositeIsDark(
			newDimRatio,
			overlayColor.color,
			averageBackgroundColor
		);

		setAttributes( {
			dimRatio: newDimRatio,
			isDark: newIsDark,
		} );
	};

	/*const onUploadError = ( message ) => {
		createErrorNotice( message, { type: 'snackbar' } );
	};*/

	const isUploadingMedia = isTemporaryMedia( id, url );

	const isImageBackground = IMAGE_BACKGROUND_TYPE === backgroundType;
	const isVideoBackground = VIDEO_BACKGROUND_TYPE === backgroundType;

	const [ resizeListener, /*{ height, width }*/ ] = useResizeObserver();
	/*
	const resizableBoxDimensions = useMemo( () => {
		return {
			height: minHeightUnit === 'px' ? minHeight : 'auto',
			width: 'auto',
		};
	}, [ minHeight, minHeightUnit ] );
	*/

	const minHeightWithUnit =
		minHeight && minHeightUnit
			? `${ minHeight }${ minHeightUnit }`
			: minHeight;

	const style = {
		minHeight: minHeightWithUnit || undefined,
		overflow: ! verticalClip ? "clip visible" : undefined
	};

	const bgStyle = { backgroundColor: overlayColor.color };


	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlock( clientId ).innerBlocks.length >
			0,
		[ clientId ]
	);

	const ref = useRef();
	const blockProps = useBlockProps( { ref } );

	// Check for fontSize support before we pass a fontSize attribute to the innerBlocks
	const [ fontSizes ] = useSettings( 'typography.fontSizes' );
	const hasFontSizes = fontSizes?.length > 0;

	const innerBlocksTemplate = getInnerBlocksTemplate( {
		fontSize: hasFontSizes ? 'large' : undefined,
	} );

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
		//isImgElement,
		overlayColor,
	};

	const toggleUseFeaturedImage = async () => {
		const newUseFeaturedImage = ! useFeaturedImage;

		const averageBackgroundColor = newUseFeaturedImage
			? await getMediaColor( mediaUrl )
			: DEFAULT_BACKGROUND_COLOR;

		const newOverlayColor = ! isUserOverlayColor
			? averageBackgroundColor
			: overlayColor.color;

		if ( ! isUserOverlayColor ) {
			if ( newUseFeaturedImage ) {
				setOverlayColor( newOverlayColor );
			} else {
				setOverlayColor( undefined );
			}

			// Make undo revert the next setAttributes and the previous setOverlayColor.
			__unstableMarkNextChangeAsNotPersistent();
		}

		const newDimRatio = dimRatio === 100 ? 50 : dimRatio;
		const newIsDark = compositeIsDark(
			newDimRatio,
			newOverlayColor,
			averageBackgroundColor
		);

		setAttributes( {
			id: undefined,
			url: undefined,
			useFeaturedImage: newUseFeaturedImage,
			dimRatio: newDimRatio,
			backgroundType: useFeaturedImage
				? IMAGE_BACKGROUND_TYPE
				: undefined,
			isDark: newIsDark,
		} );
	};

	const blockControls = (
		<SectionBlockControls
			attributes={ attributes }
			setAttributes={ setAttributes }
			onSelectMedia={ onSelectMedia }
			currentSettings={ currentSettings }
			toggleUseFeaturedImage={ toggleUseFeaturedImage }
			onClearMedia={ onClearMedia }
		/>
	);

	const inspectorControls = (
		<SectionInspectorControls
			attributes={ attributes }
			setAttributes={ setAttributes }
			clientId={ clientId }
			setOverlayColor={ onSetOverlayColor }
			sectionRef={ ref }
			currentSettings={ currentSettings }
			toggleUseFeaturedImage={ toggleUseFeaturedImage }
			updateDimRatio={ onUpdateDimRatio }
			onClearMedia={ onClearMedia }
		/>
	);

	const resizableSectionProps = {
		className: 'tzm-section__resize-container',
		//minHeight: minHeightWithUnit,
		onResizeStart: () => {
			setAttributes( { minHeightUnit: 'px' } );
			toggleSelection( false );
		},
		onResize: ( value ) => {
			setAttributes( { minHeight: value } );
		},
		onResizeStop: ( newMinHeight ) => {
			toggleSelection( true );
			setAttributes( { minHeight: newMinHeight } );
		},
		showHandle: true,
		//size: resizableBoxDimensions
	};

	const classes = clsx( {
		'is-dark-theme': isDark,
		'is-light': ! isDark,
		'is-transient': isUploadingMedia,
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );


	return (
		<>
			{ blockControls }
			{ inspectorControls }
			<Tag
				{ ...blockProps }
				className={ clsx( classes, blockProps.className ) }
				style={ { ...style, ...blockProps.style } }
				data-url={ url }
			>
				{ isSelected && <ResizableSection { ...resizableSectionProps } /> }
				{ resizeListener }
				<span
					aria-hidden="true"
					className={ clsx(
						'wp-block-tzm-section__background',
						dimRatioToClass( dimRatio ),
						{
							[ overlayColor.class ]: overlayColor.class,
							'has-background-dim': dimRatio !== undefined,
							'has-background-gradient': gradientValue,
							[ gradientClass ]: gradientClass,
						}
					) }
					style={ { backgroundImage: gradientValue, ...bgStyle } }
				/>

				{ !! url && (
					!! parallaxMode && ( 
						isVideo || 
						( !isVideo && parallaxMode !== 'fixed' ) 
					) ? (
						<parallax-wrapper className={ `has-parallax-${ parallaxMode }` }>
							<MediaBackground atts={ attributes } url={ url }/>
						</parallax-wrapper>
					) : ( 
						<MediaBackground atts={ attributes } url={ url }/>
					)
				) }
				{ isUploadingMedia && <Spinner /> }

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
				<div { ...innerBlocksProps } />
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
		</>
	);
}

export default compose( [
	withColors( { overlayColor: 'background-color' } ),
] )( SectionEdit );
