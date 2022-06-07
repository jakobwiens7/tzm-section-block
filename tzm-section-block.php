<?php
/**
 * Plugin Name:		TZM Section Block
 * Description:		Wrap your content in a versatile section block - great for impressive headers and sections with eye-catching features like parallax effects and shape dividers.
 * Version:			1.0.1-beta
 * Author:			TezmoMedia - Jakob Wiens
 * Author URI:		https://www.tezmo.media
 * License:			GPL-2.0-or-later
 * License URI:		https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:		tzm-section-block
 * Domain Path:		/languages
 *
 * @package	tzm
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Load plugin textdomain.
 */
function tzm_section_load_textdomain() {
	load_plugin_textdomain(
		'tzm-section-block',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages/'
	);
}
add_action( 'plugins_loaded', 'tzm_section_load_textdomain' );


/**
 * Enqueue frontend block assets.
 */
function tzm_section_enqueue_block_assets() {
	if ( is_singular() ) {
        $id = get_the_ID();
		
        if ( has_block('tzm/section', $id) ) {
			wp_enqueue_script( 'tzm-section-block' );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'tzm_section_enqueue_block_assets' );


/**
 * Initialize blocks.
 */
function tzm_section_block_init() {
	
	$editor_assets = include( plugin_dir_path( __FILE__ ) . 'dist/tzm-section.asset.php');
	$frontend_assets = include( plugin_dir_path( __FILE__ ) . 'dist/tzm-section-frontend.asset.php');
	
	// Register backend block assets.
	wp_register_style(
		'tzm-section-block-editor',
		plugins_url( '/dist/tzm-section.css', __FILE__ ),
		array( 'wp-editor' ),
		$editor_assets['version']
	);
	wp_register_script(
		'tzm-section-block-editor',
		plugins_url( '/dist/tzm-section.js', __FILE__ ),
		$editor_assets['dependencies'],
		$editor_assets['version']
	);

	// Register both frontend + editor block assets.
	wp_register_style(
		'tzm-section-block',
		plugins_url( '/dist/style-tzm-section.css', __FILE__ ),
		is_admin() ? array( 'wp-editor' ) : array(),
		$frontend_assets['version'],
	);
	wp_register_script(
		'tzm-section-block',
		plugins_url( '/dist/tzm-section-frontend.js', __FILE__ ),
		$frontend_assets['dependencies'],
		$frontend_assets['version'],
		//true // Enqueue the script in the footer.
	);
	
	
	wp_localize_script(
		'tzm-section-block-editor',
		'tzmSectionJsData',
		[
			'textdomain'	=> 'tzm-section-block',
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			'previewImage'  => plugins_url( 'images/preview.jpg', __FILE__ ),
		]
	);
	
	// Register TZM Section Block
	register_block_type( __DIR__ . '/dist/section/block.json', array( 
		'render_callback' => 'render_block_tzm_section',
	) );
	
	
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'tzm-section-block-editor',
			'tzm-section-block',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'tzm_section_block_init' );


/**
 * Server-side rendering of the `tzm/section` block.
 *
 * @package WordPress
 */

/**
 * Renders the `tzm/section` block on server.
 *
 * @param array $attributes The block attributes.
 * @param array $content    The block rendered content.
 *
 * @return string Returns the section block markup, if useFeaturedImage is true.
 */
function render_block_tzm_section( $attributes, $content ) {
	
	if ( 'image' !== $attributes['backgroundType'] || false === $attributes['useFeaturedImage'] ) {
		return $content;
	}

	if ( ! $attributes['isRepeated'] ) {
		$attr = array(
			'class'           => 'wp-block-tzm-section__image-background' . ($attributes['parallaxMode'] ? ' jarallax-img' : '' ),
			'data-object-fit' => 'cover',
		);

		if ( isset( $attributes['focalPoint'] ) ) {
			$object_position              = round( $attributes['focalPoint']['x'] * 100 ) . '%' . ' ' . round( $attributes['focalPoint']['y'] * 100 ) . '%';
			$attr['data-object-position'] = $object_position;
			$attr['style']                = 'object-position: ' . $object_position;
		}

		$image = get_the_post_thumbnail( null, 'post-thumbnail', $attr );
		
		$content = str_replace(
			'<div class="wp-block-tzm-section__inner-container">',
			$image . '<div class="wp-block-tzm-section__inner-container">',
			$content
		);

	} else {
			
		if ( in_the_loop() ) {
			update_post_thumbnail_cache();
		}
		$image_url = get_the_post_thumbnail_url();
		
		$class = 'wp-block-tzm-section__image-background' . ( $attributes['parallaxMode'] ? ' has-parallax-' . $attributes['parallaxMode'] : '' );
		
		$style = "background-image:url('" . esc_url( $image_url ) . "')";
		
		$content = str_replace(
			'<div class="wp-block-tzm-section__inner-container">',
			'<div class="' . $class . '" style="' . $style . '" data-img-repeat="repeat" data-img-size="auto"></div>' . '<div class="wp-block-tzm-section__inner-container">',
			$content
		);
	}

	return $content;
}