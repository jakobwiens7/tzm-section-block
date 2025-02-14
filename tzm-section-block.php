<?php

/**
 * Plugin Name:		  TZM Section Block
 * Description:		  Wrap your content in a versatile section block - great for impressive sections with eye-catching features like parallax effects and shape dividers.
 * Version:			  1.1.2
 * Author:			  TezmoMedia - Jakob Wiens
 * Author URI:		  https://www.tezmo.media
 * License:			  GPL-2.0-or-later
 * License URI:		  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:		  tzm-section-block
 * Domain Path:		  /languages
 * Requires at least: 5.6
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}


/**
 * Load plugin textdomain
 */
function tzm_section_load_textdomain()
{
	load_plugin_textdomain(
		'tzm-section-block',
		false,
		dirname(plugin_basename(__FILE__)) . '/languages/'
	);
}
add_action('init', 'tzm_section_load_textdomain');


/**
 * Register editor assets
 */
function tzm_section_enqueue_editor_assets()
{
	$editor_assets = include(plugin_dir_path(__FILE__) . 'build/tzm-section-block.asset.php');

	wp_register_style(
		'tzm-section-block-editor',
		plugins_url('/build/tzm-section-block.css', __FILE__),
		array('wp-editor'),
		$editor_assets['version']
	);
	wp_register_script(
		'tzm-section-block-editor',
		plugins_url('/build/tzm-section-block.js', __FILE__),
		$editor_assets['dependencies'],
		$editor_assets['version'],
		array('in_footer' => true)
	);
}
add_action('enqueue_block_editor_assets', 'tzm_section_enqueue_editor_assets');


/** 
 * Enqueue both backend + frontend block assets
 */
function tzm_section_enqueue_assets()
{
	$assets = include(plugin_dir_path(__FILE__) . 'build/view-tzm-section-block.asset.php');

	wp_register_style(
		'style-tzm-section-block',
		plugins_url('/build/style-tzm-section-block.css', __FILE__),
		$assets['dependencies'],
		$assets['version']
	);
	wp_register_script(
		'view-tzm-section-block',
		plugins_url('/build/view-tzm-section-block.js', __FILE__),
		$assets['dependencies'],
		$assets['version'],
		array('in_footer' => true)
	);
}
add_action('enqueue_block_assets', 'tzm_section_enqueue_assets');


/**
 * Initialize blocks
 */
function tzm_section_block_init()
{
	// Register TZM Section Block
	register_block_type(__DIR__ . '/build/', array(
		'render_callback' => 'render_block_tzm_section',
	));

	// Load the translation file
	if (function_exists('wp_set_script_translations')) {
		wp_set_script_translations(
			'tzm-section-editor-script',
			'tzm-section-block',
			plugin_dir_path(__FILE__) . 'languages'
		);
	}

	/**
	 * Renders the `tzm/section` block on server.
	 *
	 * @since 1.0.0
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content    The block rendered content.
	 *
	 * @return string Returns the section block markup, if useFeaturedImage is true.
	 */
	function render_block_tzm_section($attributes, $content)
	{
		if ('image' !== $attributes['backgroundType'] || false === $attributes['useFeaturedImage']) {
			return $content;
		}

		if (!$attributes['isRepeated'] && 'fixed' !== $attributes['parallaxMode']) {
			$attr = array(
				'class'           => 'wp-block-tzm-section__image-background',
				'data-object-fit' => 'cover',
			);

			if (isset($attributes['focalPoint'])) {
				$object_position              = round($attributes['focalPoint']['x'] * 100) . '%' . ' ' . round($attributes['focalPoint']['y'] * 100) . '%';
				$attr['data-object-position'] = $object_position;
				$attr['style']                = 'object-position: ' . $object_position;
			}

			$image = get_the_post_thumbnail(null, 'post-thumbnail', $attr);

			if (!! $attributes['parallaxMode']) {
				$image = '<parallax-wrapper class="has-parallax-' . $attributes['parallaxMode'] . '">' . $image . '</parallax-wrapper>';
			}
			// Inserts the featured image between the (1st) section 'background' `span` and 'inner-container' `div`,
			// and removes eventual whitespace characters between the two (typically introduced at template level)
			$inner_container_start = '/<div\b[^>]+wp-block-tzm-section__inner-container[\s|"][^>]*>/U';
			if (1 === preg_match($inner_container_start, $content, $matches, PREG_OFFSET_CAPTURE)) {
				$offset  = $matches[0][1];

				$content = substr($content, 0, $offset) . $image . substr($content, $offset);
			}
		} else {
			if (in_the_loop()) {
				update_post_thumbnail_cache();
			}

			$current_featured_image = get_the_post_thumbnail_url();
			if (!$current_featured_image) {
				return $content;
			}

			$processor = new WP_HTML_Tag_Processor($content);
			$processor->next_tag();

			$class = '';
			if ($attributes['isRepeated']) $class .= ' is-repeated';
			if ($attributes['parallaxMode'] == 'fixed') $class .= ' has-parallax-fixed';
			$processor->add_class($class);

			$styles         = $processor->get_attribute('style');
			$merged_styles  = !empty($styles) ? $styles . ';' : '';
			$merged_styles .= 'background-image:url(' . esc_url($current_featured_image) . ');';

			$processor->set_attribute('style', $merged_styles);
			$content = $processor->get_updated_html();
		}

		return $content;
	}
}
add_action('init', 'tzm_section_block_init');
