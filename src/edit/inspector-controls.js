/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

import {
	//Icon,
	BaseControl,
	Button,
	ExternalLink,
	FocalPointPicker,
	PanelBody,
	PanelRow,
	TabPanel,
	RangeControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	//CustomSelectControl,
	ComboboxControl,
	__experimentalUseCustomUnits as useCustomUnits,
	//__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';

import { useInstanceId } from '@wordpress/compose';

import {
	InspectorControls,
	ColorPalette,
	useSettings,
	__experimentalUseGradient,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	SECTION_MIN_HEIGHT,
	mediaPosition
} from '../_shared';

import {
	cleanEmptyObject
 } from '../_utils';

import { 
	shapeData, 
	dividerShapeOptions,
	SvgDivider
} from '../_dividers';



const htmlElementMessages = {
	header: __("The <header> element should represent introductory content, typically a group of introductory or navigational aids."),
	main: __("The <main> element should be used for the primary content of your document only."),
	section: __("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
	article: __("The <article> element should represent a self contained, syndicatable portion of the document."),
	aside: __("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
	footer: __("The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.)."),
};

function SectionHeightInput( {
	onChange,
	onUnitChange,
	unit = 'px',
	value = '',
} ) {
	const instanceId = useInstanceId( UnitControl );
	const inputId = `block-section-height-input-${ instanceId }`;
	const isPx = unit === 'px';

	const [ availableUnits ] = useSettings( 'spacing.units' );
	const units = useCustomUnits( {
		availableUnits: availableUnits || [ 'px', 'em', 'rem', 'vw', 'vh' ],
		defaultValues: { px: 430, '%': 20, em: 20, rem: 20, vw: 20, vh: 50 },
	} );

	const handleOnChange = ( unprocessedValue ) => {
		const inputValue =
			unprocessedValue !== ''
				? parseFloat( unprocessedValue )
				: undefined;

		if ( isNaN( inputValue ) && inputValue !== undefined ) {
			return;
		}
		onChange( inputValue );
	};

	const computedValue = useMemo( () => {
		const [ parsedQuantity ] = parseQuantityAndUnitFromRawValue( value );
		return [ parsedQuantity, unit ].join( '' );
	}, [ unit, value ] );

	const min = isPx ? SECTION_MIN_HEIGHT : 0;

	return (
		<BaseControl label={ __( 'Minimum height of section' ) } id={ inputId }>
			<UnitControl __next40pxDefaultSize
				id={ inputId }
				isResetValueOnUnitChange
				min={ min }
				onChange={ handleOnChange }
				onUnitChange={ onUnitChange }
				style={ { maxWidth: 80 } }
				units={ units }
				value={ computedValue }
			/>
		</BaseControl>
	);
}
export default function SectionInspectorControls( {
	attributes,
	setAttributes,
	clientId,
	setOverlayColor,
	sectionRef,
	currentSettings,
	updateDimRatio,
} ) {
	const {
		tagName: TagName = 'section',
		useFeaturedImage,
		dimRatio,
		focalPoint,
		parallaxMode,
		isRepeated,
		minHeight,
		minHeightUnit,
		minHeightSelector,
		alt,
		dividerTop,
		dividerBottom,
		verticalClip
	} = attributes;

	const {
		//isVideoBackground,
		isImageBackground,
		mediaElement,
		url,
		isImgElement,
		overlayColor,
	} = currentSettings;

	const { gradientValue, setGradient } = __experimentalUseGradient();
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const [ prevMinHeightValue, setPrevMinHeightValue ] = useState( minHeight );
	const [ prevMinHeightUnit, setPrevMinHeightUnit ] =
		useState( minHeightUnit );
	const isMinFullHeight = minHeightUnit === 'vh' && minHeight === 100;

	const toggleMinFullHeight = () => {
		if ( isMinFullHeight ) {
			// If there aren't previous values, take the default ones.
			if ( prevMinHeightUnit === 'vh' && prevMinHeightValue === 100 ) {
				return setAttributes( {
					minHeight: undefined,
					minHeightUnit: undefined,
				} );
			}

			// Set the previous values of height.
			return setAttributes( {
				minHeight: prevMinHeightValue,
				minHeightUnit: prevMinHeightUnit,
			} );
		}

		setPrevMinHeightValue( minHeight );
		setPrevMinHeightUnit( minHeightUnit );

		// Set full height.
		return setAttributes( {
			minHeight: 100,
			minHeightUnit: 'vh',
		} );
	};


	const imperativeFocalPointPreview = ( value ) => {
		const [ styleOfRef, property ] = mediaElement.current
			? [ mediaElement.current.style, 'objectPosition' ]
			: [ sectionRef.current.style, 'backgroundPosition' ];
		styleOfRef[ property ] = mediaPosition( value );
	};

	/* Shape - Indicators */
	const DividerPanelHeader = (
		<span className="block-editor-panel-divider__panel-title">
			{ __( 'Shape Dividers', 'tzm-section-block' ) }
			<span
				aria-label={ dividerTop.shape 
					? __( 'Top shape:', 'tzm-section-block' ) + ' ' +	shapeData[dividerTop.shape]?.name 
					: __( 'No top shape selected', 'tzm-section-block' )
				}
				className={ clsx( 'component-color-indicator',
					'is-top-position', {
					'is-flipped': dividerTop?.flipped,
					}
				) }
			>
				<SvgDivider 
					//className={ 'combobox-control-option__divider-shape' }
					shape={ dividerTop.shape }
				/>
			</span>
			<span
				aria-label={ dividerBottom.shape 
					? __( 'Bottom shape:', 'tzm-section-block' ) + ' ' +	shapeData[dividerBottom.shape]?.name 
					: __( 'No bottom shape selected', 'tzm-section-block' )
				}
				className={ clsx( 'component-color-indicator',
					'is-bottom-position', {
					'is-flipped': dividerBottom?.flipped,
					}
				) }
			>
				<SvgDivider 
					//className={ 'combobox-control-option__divider-shape' }
					shape={ dividerBottom.shape }
				/>
			</span>
		</span>
	);

	/* Shape - Option item render function */
	const renderDividerPreview = ({item}) => {
		if (item.disabled) {
			return <div>{item.label}</div>
		}

		return (
			<div>
				<SvgDivider 
					className={ 'combobox-control-option__divider-shape' }
					shape={ item.value }
				/>
				<span>{item.label}</span>
			</div>
		);
	};


	const DividerTopSettings = () => {
		return (
			<fieldset>

				{ /* --- Shape Dividers: Top Shape --- */ }
				<ComboboxControl __next40pxDefaultSize
					className={ clsx( 'control-divider-shape', 
						'is-top-position', {
						'is-flipped': dividerTop?.flipped,
					} ) }
					__experimentalRenderItem={ renderDividerPreview }
					options={ dividerShapeOptions }
					placeholder={ dividerTop?.shape ? shapeData[dividerTop?.shape]?.name : __("- Disabled -", "tzm-section-block") }
					onChange={ (newValue) => setAttributes({
						dividerTop: {
							...dividerTop,
							shape: newValue,
						},
					}) }
					value={ dividerTop?.shape }
				/>
				{ /* --- Shape Dividers: Top Flipped --- */ }
				<ToggleControl
					className="control-divider-flipped"
					label={ __( 'Flip divider shape', 'tzm-section-block' ) }
					checked={ !! dividerTop.flipped }
					onChange={ ( newFlipped ) => setAttributes({
						dividerTop: {
							...dividerTop,
							flipped: newFlipped,
						},
					}) }
				/>
				{ /* --- Shape Dividers: Top Color --- */ }
				<ColorPalette __experimentalIsRenderedInSidebar
					className="control-divider-color"
					enableAlpha
					value={ dividerTop.color }
					onChange={ ( nextColor ) => setAttributes({
						dividerTop: {
							...dividerTop,
							color: nextColor,
						},
					}) }
				/>
				{ /* --- Shape Dividers: Top Height --- */ }
				<RangeControl __next40pxDefaultSize
					className="control-divider-height"
					label={ __( 'Divider height', 'tzm-section-block' ) }
					value={ dividerTop.height * 4 }
					onChange={ ( nextHeight ) => setAttributes({
						dividerTop: {
							...dividerTop,
							height: nextHeight / 4,
						}
					}) }
					step={ 5 }
					min={ 5 }
					max={ 100 }
				/>
			</fieldset>
		);
	};

	const DividerBottomSettings = () => {
		return (
			<fieldset>
				{ /* --- Shape Dividers: Bottom Shape --- */ }
				<ComboboxControl __next40pxDefaultSize
					className={ clsx( 'control-divider-shape', 
						'is-bottom-position', {
						'is-flipped': dividerBottom?.flipped,
					} ) }
					__experimentalRenderItem={ renderDividerPreview }
					options={ dividerShapeOptions }
					placeholder={ dividerBottom?.shape ? shapeData[dividerBottom?.shape]?.name : __("- Disabled -", "tzm-section-block") }
					onChange={ (newValue) => setAttributes({
						dividerBottom: {
							...dividerBottom,
							shape: newValue,
						},
					}) }
					value={ dividerBottom?.shape }
				/>
				{ /* --- Shape Dividers: Bottom Flipped --- */ }
				<ToggleControl
					className="control-divider-flipped"
					label={ __( 'Flip divider shape', 'tzm-section-block' ) }
					checked={ !! dividerBottom.flipped }
					onChange={ ( newFlipped ) => setAttributes({
						dividerBottom: {
							...dividerBottom,
							flipped: newFlipped,
						},
					}) }
				/>
				{ /* --- Shape Dividers: Bottom Color --- */ }
				<ColorPalette __experimentalIsRenderedInSidebar
					className="control-divider-color"
					enableAlpha
					value={ dividerBottom.color }
					onChange={ ( nextColor ) => setAttributes({
						dividerBottom: {
							...dividerBottom,
							color: nextColor,
						},
					}) }
				/>
				{ /* --- Shape Dividers: Bottom Height --- */ }
				<RangeControl __next40pxDefaultSize
					className="control-divider-height"
					label={ __( 'Divider height', 'tzm-section-block' ) }
					value={ dividerBottom.height * 4 }
					onChange={ ( nextHeight ) => setAttributes({
						dividerBottom: {
							...dividerBottom,
							height: nextHeight / 4,
						}
					}) }
					step={ 5 }
					min={ 5 }
					max={ 100 }
				/>
			</fieldset>
		);
	};

	return (
		<>
			<InspectorControls>
				{ !! ( url || useFeaturedImage ) && (
					<PanelBody title={ __( 'Media settings' ) }>
						{ /* --- Image Parallax --- */ }
						<SelectControl __next40pxDefaultSize
							className="block-editor-control-select image-parallax"
							label={ __('Image Parallax', 'tzm-section-block') }
							value={ parallaxMode }
							onChange={ ( next ) => setAttributes({ parallaxMode: next }) }
							options={ [
								{
									value: '',
									label: __(
										'- No parallax -',
										'tzm-section-block'
									),
								},
								{
									value: 'fixed',
									label: __( 'Fixed', 'tzm-section-block' ),
								},
								{
									value: 'slow',
									label: __(
										'Parallax (slow)',
										'tzm-section-block'
									),
								},
								{
									value: 'medium',
									label: __(
										'Parallax (medium)',
										'tzm-section-block'
									),
								},
								{
									value: 'fast',
									label: __(
										'Parallax (fast)',
										'tzm-section-block'
									),
								},
							] }
						/>

						{ /* --- Image Repeat --- */ }
						{ isImageBackground && (
							<ToggleControl
								className="block-editor-control-toggle image-repeat"
								label={ __( 'Repeated background' ) }
								checked={ isRepeated }
								onChange={ ( next ) => setAttributes({
									isRepeated: next,
								}) }
							/>
						) }
						<FocalPointPicker
							label={ __( 'Focal point picker' ) }
							url={ url }
							value={ focalPoint }
							onDragStart={ imperativeFocalPointPreview }
							onDrag={ imperativeFocalPointPreview }
							onChange={ ( newFocalPoint ) =>	setAttributes({
								focalPoint: newFocalPoint,
							}) }
						/>
						{ ! useFeaturedImage &&
							isImageBackground &&
							isImgElement && (
								<TextareaControl
									label={ __('Alt text (alternative text)') }
									value={ alt }
									onChange={ ( newAlt ) => setAttributes({ alt: newAlt }) }
									help={
										<>
											<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
												{ __('Describe the purpose of the image') }
											</ExternalLink>
											{ __('Leave empty if decorative.') }
										</>
									}
								/>
							) }
						<PanelRow>
							<Button
								className="tzm-section__reset-button"
								variant="secondary"
								size="small"
								onClick={ () =>	setAttributes({
										url: undefined,
										id: undefined,
										backgroundType: undefined,
										focalPoint: undefined,
										parallaxMode: undefined,
										isRepeated: undefined,
										useFeaturedImage: false,
								}) }
							>
								{ __( 'Clear Media' ) }
							</Button>
						</PanelRow>
					</PanelBody>
				) }
				{ /* --- Shape Dividers Panel --- */ }
				<PanelBody
					className={ 'block-editor-panel-divider' }
					title={ DividerPanelHeader }
					initialOpen={ false }
				>
					<TabPanel
						className="block-editor-control-tab-panel divider-settings"
						tabs={ [
							{
								name: 'top',
								title: __('Top', 'tzm-section-block'),
								className: 'tab-divider-top',
								content: DividerTopSettings(),
							},
							{
								name: 'bottom',
								title: __('Bottom', 'tzm-section-block'),
								className: 'tab-divider-bottom',
								content: DividerBottomSettings(),
							},
						] }
					>
						{ ( { content } ) => (
							<div
								className="block-editor-control-tab-content"
								style={ { marginTop: '15px' } }
							>
								{ content }
							</div>
						) }
					</TabPanel>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="dimensions">
				{ /* --- Dimensions: Minimum height --- */ }
				<ToolsPanelItem
					hasValue={ () => !! minHeight }
					label={ __( 'Minimum height' ) }
					onDeselect={ () => setAttributes({
						minHeight: undefined,
						minHeightUnit: undefined,
					}) }
					resetAllFilter={ () => ({
						minHeight: undefined,
						minHeightUnit: undefined,
					}) }
					isShownByDefault
					panelId={ clientId }
				>
					{ /* Dimensions: Minimal height input */ }
					<PanelRow>
						<SectionHeightInput
							value={ minHeight }
							unit={ minHeightUnit }
							onChange={ ( newMinHeight ) =>setAttributes({
								minHeight: newMinHeight,
								style: cleanEmptyObject({
									...attributes?.style,
									dimensions: {
										...attributes?.style?.dimensions,
										aspectRatio: undefined, // Reset aspect ratio when minHeight is set.
									},
								}),
							}) }
							onUnitChange={ ( nextUnit ) => setAttributes({
								minHeightUnit: nextUnit,
							}) }
						/>
					</PanelRow>

					{ /* Dimensions: Full height toggle */ }
					<PanelRow>
						<ToggleControl
							className="block-editor-control-toggle full-height"
							label={ __( 'Toggle full height' ) }
							checked={ isMinFullHeight }
							onChange={ toggleMinFullHeight }
						/>
					</PanelRow>

					{ /* Dimensions: CSS selector */ }
					{ !! isMinFullHeight && (
						<PanelRow>
							<TextControl __next40pxDefaultSize
								className="block-editor-control-text height-selector"
								label={ __('CSS selector', 'tzm-section-block') }
								help={ __(
									"Specify an element whose height will be subtracted from the full-height section (e.g., 'header', '#navigation', or '.primary-menu').",
									'tzm-section-block'
								) }
								value={ minHeightSelector }
								onChange={ ( newHeightSelector ) =>	setAttributes({
									minHeightSelector: newHeightSelector
								}) }
							/>
						</PanelRow>
					) }
				</ToolsPanelItem>
			</InspectorControls>

			{ colorGradientSettings.hasColorsOrGradients && (
				<InspectorControls group="color">
					<ColorGradientSettingsDropdown
						__experimentalIsRenderedInSidebar
						settings={ [
							{
								label: __( 'Overlay' ),
								colorValue: overlayColor.color,
								gradientValue,
								onColorChange: setOverlayColor,
								onGradientChange: setGradient,
								isShownByDefault: true,
								resetAllFilter: () => ( {
									overlayColor: undefined,
									customOverlayColor: undefined,
									gradient: undefined,
									customGradient: undefined,
								} ),
								clearable: true,
							},
						] }
						panelId={ clientId }
						{ ...colorGradientSettings }
					/>
					<ToolsPanelItem
						hasValue={ () => {
							// If there's a media background the dimRatio will be
							// defaulted to 50 whereas it will be 100 for colors.
							return dimRatio === undefined
								? false
								: dimRatio !== ( url ? 50 : 100 );
						} }
						label={ __( 'Overlay opacity' ) }
						onDeselect={ () => updateDimRatio( url ? 50 : 100 ) }
						resetAllFilter={ () => ({
							dimRatio: url ? 50 : 100,
						}) }
						isShownByDefault
						panelId={ clientId }
					>
						<RangeControl
							label={ __( 'Overlay opacity' ) }
							value={ dimRatio }
							onChange={ ( newDimRatio ) => updateDimRatio( newDimRatio )	}
							min={ 0 }
							max={ 100 }
							step={ 5 }
							required
							__next40pxDefaultSize
						/>
					</ToolsPanelItem>
				</InspectorControls>
			) }
			<InspectorControls group="advanced">
				<SelectControl __nextHasNoMarginBottom __next40pxDefaultSize
					label={ __( 'HTML element' ) }
					options={ [
						{ label: '<div>', value: 'div' },
						{ label: '<header>', value: 'header' },
						{ label: '<main>', value: 'main' },
						{ label: __('Default (<section>)', 'tzm-section-block'), value: 'section' },
						{ label: '<article>', value: 'article' },
						{ label: '<aside>', value: 'aside' },
						{ label: '<footer>', value: 'footer' },
					] }
					value={ TagName }
					onChange={ ( value ) =>	setAttributes({ 
						tagName: value 
					}) }
					help={ htmlElementMessages[ TagName ] }
				/>
				<ToggleControl
					className={ 'control-vertical-clip' }
					label={ __( 'Vertical clipping', 'tzm-section-block' ) }
					help={ __( "Enable to clip the content at the top and bottom edges of the section. Please note that this feature may not be supported in all browsers.", 'tzm-section-block' ) }
					checked={ !! verticalClip }
					onChange={ ( newVerticalClip ) => setAttributes({
						verticalClip: newVerticalClip
					}) }
				/>
			</InspectorControls>
		</>
	);
}
