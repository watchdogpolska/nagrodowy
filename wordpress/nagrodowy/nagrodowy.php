<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           Nagrodowy
 *
 * @wordpress-plugin
 * Plugin Name:       Nagrodowy
 * Plugin URI:        https://github.com/watchdogpolska/nagrodowy/
 * Description:       
 * Version:           1.0.0
 * Author:            Siec Obywatelska
 * Author URI:        http://siecobywatelska.pl/
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       nagrodowy
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-nagrodowy-activator.php
 */
function activate_nagrodowy() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-nagrodowy-activator.php';
	Nagrodowy_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-nagrodowy-deactivator.php
 */
function deactivate_nagrodowy() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-nagrodowy-deactivator.php';
	Nagrodowy_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_nagrodowy' );
register_deactivation_hook( __FILE__, 'deactivate_nagrodowy' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-nagrodowy.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_nagrodowy() {

	$plugin = new Nagrodowy();
	$plugin->run();

}
run_nagrodowy();
