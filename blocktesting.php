<?php
/*
Plugin Name: Block Testing
Description: Testing
Version: 1.0.0
Author: Metaphor Creations
Text Domain: mtphrblocktesting
Domain Path: languages
License: GPL2
*/


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'BlockTesting' ) ) :

/**
 * Main BlockTesting Class.
 *
 * @since 1.0
 */
 
final class BlockTesting {
	
	/** Singleton *************************************************************/

	/**
	 * @var BlockTesting The one true BlockTesting
	 * @since 1.0
	 */
	private static $instance;

	/**
	 * Main BlockTesting Instance.
	 *
	 * Insures that only one instance of BlockTesting exists in memory at any one
	 * time. Also prevents needing to define globals all over the place.
	 *
	 * @since 1.0
	 * @static
	 * @staticvar array $instance
	 * @uses BlockTesting::setup_constants() Setup the constants needed.
	 * @uses BlockTesting::includes() Include the required files.
	 * @uses BlockTesting::load_textdomain() load the language files.
	 * @see BTESTING()
	 * @return object|BlockTesting The one true BlockTesting
	 */
	public static function instance() {
		if( !isset(self::$instance) && !(self::$instance instanceof BlockTesting) ) {
			
			self::$instance = new BlockTesting;
			self::$instance->setup_constants();
			
			add_action( 'plugins_loaded', array( self::$instance, 'load_textdomain' ) );

			self::$instance->includes();
		}
		
		do_action( 'mtphrblocktesting_init' );

		return self::$instance;
	}

	/**
	 * Throw error on object clone.
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @since 1.0
	 * @access protected
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'mtphrblocktesting' ), '1.0' );
	}

	/**
	 * Disable unserializing of the class.
	 *
	 * @since 1.0
	 * @access protected
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'mtphrblocktesting' ), '1.0' );
	}

	/**
	 * Setup plugin constants.
	 *
	 * @access private
	 * @since 1.0
	 * @return void
	 */
	private function setup_constants() {

		// Plugin version.
		if( !defined('BTESTING_VERSION') ) {
			define( 'BTESTING_VERSION', '2.0' );
		}

		// Plugin Folder Path.
		if( !defined( 'BTESTING_PLUGIN_DIR') ) {
			define( 'BTESTING_PLUGIN_DIR', plugin_dir_path(__FILE__) );
		}

		// Plugin Folder URL.
		if( !defined( 'BTESTING_PLUGIN_URL') ) {
			define( 'BTESTING_PLUGIN_URL', plugin_dir_url(__FILE__) );
		}

		// Plugin Root File.
		if( !defined( 'BTESTING_PLUGIN_FILE') ) {
			define( 'BTESTING_PLUGIN_FILE', __FILE__ );
		}
	}

	/**
	 * Include required files.
	 *
	 * @access private
	 * @since 1.0
	 * @return void
	 */
	private function includes() {
		require_once BTESTING_PLUGIN_DIR . 'inc/helpers.php';
		require_once BTESTING_PLUGIN_DIR . 'inc/hooks.php';
		require_once BTESTING_PLUGIN_DIR . 'inc/install.php';
	}

	/**
	 * Loads the plugin language files.
	 *
	 * @access public
	 * @since 1.0
	 * @return void
	 */
	public function load_textdomain() {

		// Set filter for plugin's languages directory.
		$mtphrblocktesting_lang_dir = dirname( plugin_basename( BTESTING_PLUGIN_FILE ) ) . '/languages/';
		$mtphrblocktesting_lang_dir = apply_filters( 'mtphrblocktesting_languages_directory', $mtphrblocktesting_lang_dir );
		load_plugin_textdomain( 'mtphrblocktesting', false, $mtphrblocktesting_lang_dir );
	}
}

endif; // End if class_exists check.


/*
The main function for that returns BlockTesting

The main function responsible for returning the one true BlockTesting
Instance to functions everywhere.

Use this function like you would a global variable, except without needing
to declare the global.

Example: <?php $tops = BTESTING(); ?>

@since 1.0
@return object|BlockTesting The one true BlockTesting Instance.
*/
function BTESTING() {
	return BlockTesting::instance();
}

// Get BTESTING Running.
BTESTING();