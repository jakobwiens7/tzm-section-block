/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
//import { ToolbarButton } from '@wordpress/components';

import {
	BlockControls,
	MediaReplaceFlow,
	BlockVerticalAlignmentToolbar,
	__experimentalBlockFullHeightAligmentControl as FullHeightAlignmentControl,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ALLOWED_MEDIA_TYPES, IMAGE_BACKGROUND_TYPE } from '../shared';

export default function SectionBlockControls({
	attributes,
	setAttributes,
	onSelectMedia,
	currentSettings,
}) {
	const {
		verticalAlignment,
		id,
		useFeaturedImage,
		minHeight,
		minHeightUnit,
	} = attributes;

	const { hasInnerBlocks, url } = currentSettings;

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

	const toggleUseFeaturedImage = () => {
		setAttributes({
			id: undefined,
			url: undefined,
			useFeaturedImage: !useFeaturedImage,
			backgroundType: useFeaturedImage
				? IMAGE_BACKGROUND_TYPE
				: undefined,
		});
	};
	/* WIP: Shared variables END */

	return (
		<>
			<BlockControls group="block">
				{/* --- Vertical Alignment --- */}
				<BlockVerticalAlignmentToolbar
					value={verticalAlignment}
					onChange={(nextPosition) => {
						setAttributes({
							verticalAlignment: nextPosition,
						});
					}}
				/>

				{/* --- Full Height Alignment --- */}
				<FullHeightAlignmentControl
					isActive={isMinFullHeight}
					onToggle={toggleMinFullHeight}
					isDisabled={!hasInnerBlocks}
				/>
			</BlockControls>
			<BlockControls group="other">
				{/* --- Background Media --- */}
				<MediaReplaceFlow
					mediaId={id}
					mediaURL={url}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					accept="image/*,video/*"
					onSelect={onSelectMedia}
					name={!url ? __('Add Media') : __('Replace')}
					onToggleFeaturedImage={ toggleUseFeaturedImage }
					useFeaturedImage={ useFeaturedImage }
				/>
			</BlockControls>
		</>
	);
}
