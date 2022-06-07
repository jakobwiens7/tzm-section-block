/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useMemo, useState } from '@wordpress/element';

import {
	BaseControl,
	Button,
	ExternalLink,
	FocalPointPicker,
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	CustomSelectControl,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';

import { useInstanceId } from '@wordpress/compose';

import {
	InspectorControls,
	ColorPalette,
	useSetting,
	__experimentalUseGradient,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	SECTION_MIN_HEIGHT,
	//IMAGE_BACKGROUND_TYPE,
	mediaPosition,
	SVG_SHAPE_OPTIONS,
	getDividerItem,
	//SvgDivider,
} from '../shared';

function SectionHeightInput({
	onChange,
	onUnitChange,
	unit = 'px',
	value = '',
}) {
	const instanceId = useInstanceId(UnitControl);
	const inputId = `block-section-height-input-${instanceId}`;
	const isPx = unit === 'px';

	const units = useCustomUnits({
		availableUnits: useSetting('spacing.units') || [
			'px',
			'em',
			'rem',
			'vw',
			'vh',
		],
		defaultValues: { px: 430, '%': 20, em: 20, rem: 20, vw: 20, vh: 50 },
	});

	const handleOnChange = (unprocessedValue) => {
		const inputValue =
			unprocessedValue !== '' ? parseFloat(unprocessedValue) : undefined;

		if (isNaN(inputValue) && inputValue !== undefined) {
			return;
		}
		onChange(inputValue);
	};

	const computedValue = useMemo(() => {
		const [parsedQuantity] = parseQuantityAndUnitFromRawValue(value);
		return [parsedQuantity, unit].join('');
	}, [unit, value]);

	const min = isPx ? SECTION_MIN_HEIGHT : 0;

	return (
		<BaseControl label={__('Minimum height of section')} id={inputId}>
			<UnitControl
				id={inputId}
				isResetValueOnUnitChange
				min={min}
				onChange={handleOnChange}
				onUnitChange={onUnitChange}
				style={{ maxWidth: 80 }}
				units={units}
				value={computedValue}
			/>
		</BaseControl>
	);
}
export default function SectionInspectorControls({
	attributes,
	setAttributes,
	clientId,
	setOverlayColor,
	sectionRef,
	currentSettings,
}) {
	const {
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
		dividerHeight,
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

	/* WIP: Shared variables START */
	const [prevMinHeightValue, setPrevMinHeightValue] = useState(minHeight);
	const [prevMinHeightUnit, setPrevMinHeightUnit] = useState(minHeightUnit);
	const isMinFullHeight = minHeightUnit === 'vh' && minHeight === 100;
	const toggleMinFullHeight = () => {
		if (isMinFullHeight) {
			// If there aren't previous values, take the default ones.
			if (prevMinHeightUnit === 'vh' && prevMinHeightValue === 100) {
				return setAttributes({
					minHeight: undefined,
					minHeightUnit: undefined,
				});
			}

			// Set the previous values of height.
			return setAttributes({
				minHeight: prevMinHeightValue,
				minHeightUnit: prevMinHeightUnit,
			});
		}

		setPrevMinHeightValue(minHeight);
		setPrevMinHeightUnit(minHeightUnit);

		// Set full height.
		return setAttributes({
			minHeight: 100,
			minHeightUnit: 'vh',
		});
	};
	/* WIP: Shared variables END */

	const imperativeFocalPointPreview = (value) => {
		const [styleOfRef, property] = mediaElement.current
			? [mediaElement.current.style, 'objectPosition']
			: [sectionRef.current.style, 'backgroundPosition'];
		styleOfRef[property] = mediaPosition(value);
	};

	/* Shape - Indicators */
	const DividerPanelHeader = (
		<span className="block-editor-panel-divider__panel-title">
			{__('Shape Dividers', 'tzm-section-block')}
			<span
				aria-label={
					__('Top shape:', 'tzm-section-block') +
					' ' +
					getDividerItem(dividerTop.shape, 'name')
				}
				className={classnames(
					'component-color-indicator',
					'indicator-divider-top',
					{
						[getDividerItem(dividerTop.shape, 'className')]:
							getDividerItem(dividerTop.shape, 'className'),
						'divider-flipped': dividerTop.flipped,
					}
				)}
			/>
			<span
				aria-label={
					__('Bottom shape:', 'tzm-section-block') +
					' ' +
					getDividerItem(dividerBottom.shape, 'name')
				}
				className={classnames(
					'component-color-indicator',
					'indicator-divider-bottom',
					{
						[getDividerItem(dividerBottom.shape, 'className')]:
							getDividerItem(dividerBottom.shape, 'className'),
						'divider-flipped': dividerBottom.flipped,
					}
				)}
			/>
		</span>
	);

	return (
		<>
			<InspectorControls>
				{!!(url || useFeaturedImage) && (
					<PanelBody title={__('Media settings')}>
						{/* --- Image Parallax --- */}
						<SelectControl
							className="block-editor-control-select image-parallax"
							label={__('Image Parallax', 'tzm-section-block')}
							value={parallaxMode}
							onChange={(next) => {
								setAttributes({ parallaxMode: next });
							}}
							options={[
								{
									value: '',
									label: __(
										'- No parallax -',
										'tzm-section-block'
									),
								},
								{
									value: 'fixed',
									label: __('Fixed', 'tzm-section-block'),
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
							]}
						/>

						{/* --- Image Repeat --- */}
						{isImageBackground && (
							<ToggleControl
								className="block-editor-control-toggle image-repeat"
								label={__('Repeated background')}
								checked={isRepeated}
								onChange={(next) => {
									setAttributes({
										isRepeated: next,
									});
								}}
							/>
						)}

						{!parallaxMode && !isRepeated && (
							<FocalPointPicker
								label={__('Focal point picker')}
								url={url}
								value={focalPoint}
								onDragStart={imperativeFocalPointPreview}
								onDrag={imperativeFocalPointPreview}
								onChange={(newFocalPoint) =>
									setAttributes({
										focalPoint: newFocalPoint,
									})
								}
							/>
						)}
						{!useFeaturedImage &&
							isImageBackground &&
							isImgElement && (
								<TextareaControl
									label={__('Alt text (alternative text)')}
									value={alt}
									onChange={(newAlt) =>
										setAttributes({ alt: newAlt })
									}
									help={
										<>
											<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
												{__(
													'Describe the purpose of the image'
												)}
											</ExternalLink>
											{__(
												'Leave empty if the image is purely decorative.'
											)}
										</>
									}
								/>
							)}
						<PanelRow>
							<Button
								className="tzm-section__reset-button"
								variant="secondary"
								isSmall
								onClick={() =>
									setAttributes({
										url: undefined,
										id: undefined,
										backgroundType: undefined,
										focalPoint: undefined,
										parallaxMode: undefined,
										isRepeated: undefined,
										useFeaturedImage: false,
									})
								}
							>
								{__('Clear Media')}
							</Button>
						</PanelRow>
					</PanelBody>
				)}

				<PanelColorGradientSettings
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					title={__('Overlay')}
					initialOpen={true}
					settings={[
						{
							colorValue: overlayColor.color,
							gradientValue,
							onColorChange: setOverlayColor,
							onGradientChange: setGradient,
							label: __('Color'),
						},
					]}
				>
					<RangeControl
						label={__('Opacity')}
						value={dimRatio}
						onChange={(newDimRation) =>
							setAttributes({
								dimRatio: newDimRation,
							})
						}
						min={0}
						max={100}
						step={10}
						required
					/>
				</PanelColorGradientSettings>

				{/* --- Shape Dividers Panel --- */}
				<PanelBody
					className={'block-editor-panel-divider'}
					title={DividerPanelHeader}
					initialOpen={false}
				>
					<fieldset>
						{/* --- Shape Dividers: Top Shape --- */}
						<CustomSelectControl
							className={classnames('control-divider-top-shape', {
								'divider-flipped': dividerTop.flipped,
							})}
							label={__('Top Divider', 'tzm-section-block')}
							options={SVG_SHAPE_OPTIONS}
							onChange={({ selectedItem }) => {
								setAttributes({
									dividerTop: {
										...dividerTop,
										shape: selectedItem.key,
									},
								});
							}}
							value={SVG_SHAPE_OPTIONS.find(
								(option) => option.key === dividerTop.shape
							)}
						/>
						{/* --- Shape Dividers: Top Flipped --- */}
						<ToggleControl
							className={'control-divider-top-flipped'}
							label={__(
								'Flip divider shape',
								'tzm-section-block'
							)}
							checked={!!dividerTop.flipped}
							onChange={(newFlipped) => {
								setAttributes({
									dividerTop: {
										...dividerTop,
										flipped: newFlipped,
									},
								});
							}}
						/>
						{/* --- Shape Dividers: Top Color --- */}
						<ColorPalette
							className="block-editor-control-color-palette divider-color"
							value={dividerTop.color}
							onChange={(nextColor) => {
								setAttributes({
									dividerTop: {
										...dividerTop,
										color: nextColor,
									},
								});
							}}
						/>
					</fieldset>

					<fieldset>
						{/* --- Shape Dividers: Bottom Shape --- */}
						<CustomSelectControl
							className={classnames(
								'control-divider-bottom-shape',
								{ 'divider-flipped': dividerBottom.flipped }
							)}
							label={__('Bottom Divider', 'tzm-section-block')}
							options={SVG_SHAPE_OPTIONS}
							onChange={({ selectedItem }) => {
								setAttributes({
									dividerBottom: {
										...dividerBottom,
										shape: selectedItem.key,
									},
								});
							}}
							value={SVG_SHAPE_OPTIONS.find(
								(option) => option.key === dividerBottom.shape
							)}
						/>
						{/* --- Shape Dividers: Bottom Flipped --- */}
						<ToggleControl
							className={'control-divider-bottom-flipped'}
							label={__(
								'Flip divider shape',
								'tzm-section-block'
							)}
							checked={!!dividerBottom.flipped}
							onChange={(newFlipped) => {
								setAttributes({
									dividerBottom: {
										...dividerBottom,
										flipped: newFlipped,
									},
								});
							}}
						/>
						{/* --- Shape Dividers: Bottom Color --- */}
						<ColorPalette
							className="block-editor-control-color-palette divider-color"
							value={dividerBottom.color}
							onChange={(nextColor) => {
								setAttributes({
									dividerBottom: {
										...dividerBottom,
										color: nextColor,
									},
								});
							}}
						/>
					</fieldset>

					{/* --- Shape Dividers: Height --- */}
					<RangeControl
						className={'block-editor-control-range divider-height'}
						label={__('Divider height', 'tzm-section-block')}
						value={dividerHeight * 4}
						onChange={(nextHeight) => {
							setAttributes({
								dividerHeight: nextHeight * 0.25,
							});
						}}
						step={5}
						min={5}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls __experimentalGroup="dimensions">
				{/* --- Dimensions: Minimum height --- */}
				<ToolsPanelItem
					hasValue={() => !!minHeight}
					label={__('Minimum height')}
					onDeselect={() =>
						setAttributes({
							minHeight: undefined,
							minHeightUnit: undefined,
						})
					}
					resetAllFilter={() => ({
						minHeight: undefined,
						minHeightUnit: undefined,
					})}
					isShownByDefault={true}
					panelId={clientId}
				>
					{/* Dimensions: Minimal height input */}
					<PanelRow>
						<SectionHeightInput
							value={minHeight}
							unit={minHeightUnit}
							onChange={(newMinHeight) =>
								setAttributes({ minHeight: newMinHeight })
							}
							onUnitChange={(nextUnit) =>
								setAttributes({
									minHeightUnit: nextUnit,
								})
							}
						/>
					</PanelRow>

					{/* Dimensions: Full height toggle */}
					<PanelRow>
						<ToggleControl
							className="block-editor-control-toggle full-height"
							label={__('Toggle full height')}
							checked={isMinFullHeight}
							onChange={toggleMinFullHeight}
						/>
					</PanelRow>

					{/* Dimensions: CSS selector */}
					{!!isMinFullHeight && (
						<PanelRow>
							<TextControl
								className="block-editor-control-text height-selector"
								label={__(
									'CSS selector (experimental)',
									'tzm-section-block'
								)}
								help={__(
									"Define an element to subtract its height from your full height section (e.g. '#navigation' or '.primary-menu')",
									'tzm-section-block'
								)}
								value={minHeightSelector}
								onChange={(newHeightSelector) => {
									setAttributes({
										minHeightSelector: newHeightSelector,
									});
								}}
							/>
						</PanelRow>
					)}
				</ToolsPanelItem>
			</InspectorControls>
		</>
	);
}
