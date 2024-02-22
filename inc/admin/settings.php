<?php

/**
 * Add the options page
 * 
 * @since  1.0
 * @return array $settings_pages
 */
function mtphrblocktesting_options_page( $settings_pages ) {
	$settings_pages[] = array(
		'id'          	=> 'mtphrblocktesting',
		'option_name' 	=> 'mtphrblocktesting_settings',
		'menu_title'		=> __( 'Settings', 'mtphrblocktesting' ),
		'page_title'  	=> __( 'Caponi Map Settings', 'mtphrblocktesting' ),
		'parent'      	=> 'edit.php?post_type=caponi_art',
		'style'       	=> 'no-boxes',
	);
	return $settings_pages;
}
add_filter( 'mb_settings_pages', 'mtphrblocktesting_options_page' );

/**
 * Add the options page fields
 * 
 * @since  1.0
 * @return array $meta_boxes
 */
function mtphrblocktesting_options_meta_boxes( $meta_boxes ) {

	$meta_boxes[] = array(
		'id'             => 'mtphrblocktesting_settings_fields',
		'title'          => __( 'Caponi Map Settings', 'mtphrblocktesting' ),
		'settings_pages' => 'mtphrblocktesting',
		'fields'         => array(
			array(
				'name' 							=> __( 'User Icon', 'mtphrblocktesting' ),
				'desc'							=> __( 'Upload a custom icon to use for the user.', 'mtphrblocktesting' ),
				'id'								=> 'user_icon',
				'type' 							=> 'image_advanced',
				'max_file_uploads' 	=> 1,
				'max_status'       	=> false,
				'std'								=> mtphrblocktesting_settings( 'user_icon' ),
			),
			array(
				'name' 							=> __( 'Map Overlay', 'mtphrblocktesting' ),
				'desc'							=> __( 'Upload a custom map overlay.', 'mtphrblocktesting' ),
				'id'								=> 'map_overlay',
				'type' 							=> 'image_advanced',
				'max_file_uploads' 	=> 1,
				'max_status'       	=> false,
				'std'								=> mtphrblocktesting_settings( 'map_overlay' ),
			),
		),
	);
	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'mtphrblocktesting_options_meta_boxes' );