/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SVG, Path } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Define a custom SVG icon for the block. This icon will appear in
 * the Inserter and when the user selects the block in the Editor.
 */
const icon = (
	<SVG
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path d="M17.3,12.35l-4.73,3.605c-0.486,0.315-0.914,0.258-1.319,0.045l-4-2L2,17.15V18c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2v-2L17.3,12.35z" />
		<Path d="M6.525,12.642c0.412-0.292,0.921-0.104,1.325,0.108l3.9,2l4.85-3.6c0.358-0.316,0.996-0.32,1.4,0l4,3.05V6c0-1.104-0.896-2-2-2H4C2.896,4,2,4.896,2,6v9.5L6.525,12.642z" />
	</SVG>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( metadata.name, {
	icon,
	example: {
		attributes: {
			customOverlayColor: '#ffffff',
			dimRatio: 20,
			url: 'https://picsum.photos/id/1056/600/400',
			dividerTop: { shape: 'double-curve', color: '#ffffff', height: 10 },
			dividerBottom: { shape: 'double-curve', color: '#ffffff', height: 10 },
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __(
						'<strong>Aim high</strong>',
						'tzm-section-block'
					),
					align: 'center',
					style: {
						typography: {
							fontSize: 48,
						},
						color: { text: '#fc5b0e' },
					},
				},
			},
		],
	},
	transforms,
	save,
	edit,
	deprecated,
} );

