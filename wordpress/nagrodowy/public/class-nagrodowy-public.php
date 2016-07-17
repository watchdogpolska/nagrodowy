<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://siecobywatelska.pl/
 * @since      1.0.0
 *
 * @package    nagrodowy
 * @subpackage nagrodowy/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Nagrodowy
 * @subpackage Nagrodowy/public
 * @author     mik-laj <kamil.bregula@siecobywatelska.pl>
 */
class Nagrodowy_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function handle_shortcode( $atts, $content = null ) {

		include plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/plugin-nagrodowy-display.php';
		$this->enqueue_scripts();
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/plugin-name-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Name_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$scripts = array(
			'lodash' => plugin_dir_url( __FILE__ ) . 'app/bower_components/lodash/dist/lodash.js',
			'angular' => plugin_dir_url( __FILE__ ) . 'app/bower_components/angular/angular.min.js',
			'angular-simple-logger' => plugin_dir_url( __FILE__ ) . 'app/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
			'angular-google-maps' => plugin_dir_url( __FILE__ ) . 'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
			'app' => plugin_dir_url( __FILE__ ) . 'app/app.js',
			'config' => plugin_dir_url( __FILE__ ) . 'app/config.js',
			'map_view' => plugin_dir_url( __FILE__ ) . 'app/map_view/map.js',
		);

		foreach ($scripts as $name => $path) {
			wp_enqueue_script( 
				$this->plugin_name . '-' . $name, 
				$path, 
				array( ), 
				$this->version, 
				true );
		}

	}

}
