<?php

/**
 * Plugin Name:		TZM Section Block
 * Description:		Wrap your content in a versatile section block - great for impressive sections with eye-catching features like parallax effects and shape dividers.
 * Version:			1.0.0
 * Author:			TezmoMedia - Jakob Wiens
 * Author URI:		https://www.tezmo.media
 * License:			GPL-2.0-or-later
 * License URI:		https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:		tzm-section-block
 * Domain Path:		/languages
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}


/**
 * Load plugin textdomain.
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
 * Initialize blocks.
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

		if (!$attributes['isRepeated']) {
			$attr = array(
				'class'           => 'wp-block-tzm-section__image-background' . (array_key_exists('parallaxMode', $attributes) && $attributes['parallaxMode'] ? ' jarallax-img' : ''),
				'data-object-fit' => 'cover',
			);

			if (isset($attributes['focalPoint'])) {
				$object_position              = round($attributes['focalPoint']['x'] * 100) . '%' . ' ' . round($attributes['focalPoint']['y'] * 100) . '%';
				$attr['data-object-position'] = $object_position;
				$attr['style']                = 'object-position: ' . $object_position;
			}

			$image = get_the_post_thumbnail(null, 'post-thumbnail', $attr);


			// Inserts the featured image between the (1st) section 'background' `span` and 'inner_container' `div`,
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

			$class = array_key_exists('parallaxMode', $attributes) && $attributes['parallaxMode'] ? ' has-parallax-' . $attributes['parallaxMode'] : '';
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
