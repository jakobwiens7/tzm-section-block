/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions,
} from '@wordpress/blocks';

import * as section from './section';

const blocks = [section];

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = (block) => {
	if (!block) {
		return;
	}
	const { metadata, settings, name } = block;
	if (metadata) {
		unstable__bootstrapServerSideBlockDefinitions({ [name]: metadata });
	}
	registerBlockType(name, settings);
};
blocks.forEach(registerBlock);
