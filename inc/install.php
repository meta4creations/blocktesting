<?php
/**
 * Install Function
 *
 * @package     BTESTING
 * @subpackage  Functions/Install
 * @copyright   Copyright (c) 2022, Intrycks
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.0
*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Install
 *
 * Runs on plugin install by setting up the post types, custom taxonomies,
 * flushing rewrite rules to initiate the new 'mtphrblocktesting_ticket' slug and also
 * creates the plugin and populates the settings fields for those plugin
 * pages. After successful install, the user is redirected to the BTESTING Welcome
 * screen.
 *
 * @since 1.0
 * @global $wpdb
 * @global $mtphrblocktesting_options
 * @param  bool $network_side If the plugin is being network-activated
 * @return void
 */
 
 
function mtphrblocktesting_install( $network_wide = false ) {
	global $wpdb;

	if( is_multisite() && $network_wide ) {

		foreach( $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs LIMIT 100" ) as $blog_id ) {

			switch_to_blog( $blog_id );
			mtphrblocktesting_run_install();
			restore_current_blog();
		}

	} else {

		mtphrblocktesting_run_install();
	}
}
register_activation_hook( BTESTING_PLUGIN_FILE, 'mtphrblocktesting_install' );


/**
 * Run the BTESTING Install process
 *
 * @since  1.0
 * @return void
 */
function mtphrblocktesting_run_install() {
	
	global $wpdb, $mtphrblocktesting_options;
	
	if ( empty($mtphrblocktesting_options) ) {
		$mtphrblocktesting_options = array();
	}

	// Clear the permalinks
	flush_rewrite_rules( false );

	// Add Upgraded From Option
	$current_version = get_option( 'mtphrblocktesting_version' );
	if ( $current_version ) {
		update_option( 'mtphrblocktesting_version_upgraded_from', $current_version );
	}

	update_option( 'mtphrblocktesting_version', BTESTING_VERSION );
}


/**
 * When a new Blog is created in multisite, see if BTESTING is network activated, and run the installer
 *
 * @since  1.0
 * @param  int    $blog_id The Blog ID created
 * @param  int    $user_id The User ID set as the admin
 * @param  string $domain  The URL
 * @param  string $path    Site Path
 * @param  int    $site_id The Site ID
 * @param  array  $meta    Blog Meta
 * @return void
 */
function mtphrblocktesting_new_blog_created( $blog_id, $user_id, $domain, $path, $site_id, $meta ) {

	if( is_plugin_active_for_network(plugin_basename(BTESTING_PLUGIN_FILE)) ) {

		switch_to_blog( $blog_id );
		mtphrblocktesting_install();
		restore_current_blog();
	}
}
add_action( 'wpmu_new_blog', 'mtphrblocktesting_new_blog_created', 10, 6 );
