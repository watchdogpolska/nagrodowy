<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Nagrodowy
 * @subpackage Nagrodowy/public/partials
 */
?>
<div>
	<style type="text/css">
		<?php
		include plugin_dir_path( __FILE__ ) . '../app/app.css';
		include plugin_dir_path( __FILE__ ) . '../app/map_view/map.css';
		?>
	</style>
	<div ng-app="myApp" class="app-container">
		<div ng-controller="MapViewCtrl">
			<ui-gmap-google-map center='map.center' zoom='map.zoom' options='map.options'>
				<ui-gmap-markers models="map.markers" coords="'self'" icon="'icon'" click='markerClick'>
					<ui-gmap-windows show="true">
						<div id="map-windows-container">
							<div class="marker-info-status {{markerInfo.css}}">{{markerInfo.status}}</div>
							<div class="marker-info-help-text">adresat</div>
							<div class="marker-info-recipient">{{markerInfo.recipient}}</div>
							<div class="marker-info-help-text">info</div>
							<div class="marker-info-description">{{markerInfo.description}}</div>
							<div class="marker-files-cont" ng-show="{{markerInfo.files}}">
								<div class="marker-info-help-text">pliki</div>
								<div ng-show="{{fileVisible(0)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(0).file}}">{{file(0).file}}</a>
									</div>
									<div class="marker-file-description">{{file(0).description}}</div>
								</div>
								<div ng-show="{{fileVisible(1)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(1).file}}">{{file(1).file}}</a>
									</div>
									<div class="marker-file-description">{{file(1).description}}</div>
								</div>
								<div ng-show="{{fileVisible(2)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(2).file}}">{{file(2).file}}</a>
									</div>
									<div class="marker-file-description">{{file(2).description}}</div>
								</div>
								<div ng-show="{{fileVisible(3)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(3).file}}">{{file(3).file}}</a>
									</div>
									<div class="marker-file-description">{{file(3).description}}</div>
								</div>
								<div ng-show="{{fileVisible(4)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(4).file}}">{{file(4).file}}</a>
									</div>
									<div class="marker-file-description">{{file(4).description}}</div>
								</div>
								<div ng-show="{{fileVisible(5)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(5).file}}">{{file(5).file}}</a>
									</div>
									<div class="marker-file-description">{{file(5).description}}</div>
								</div>
								<div ng-show="{{fileVisible(6)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(6).file}}">{{file(6).file}}</a>
									</div>
									<div class="marker-file-description">{{file(6).description}}</div>
								</div>
								<div ng-show="{{fileVisible(7)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(7).file}}">{{file(7).file}}</a>
									</div>
									<div class="marker-file-description">{{file(7).description}}</div>
								</div>
								<div ng-show="{{fileVisible(8)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(8).file}}">{{file(8).file}}</a>
									</div>
									<div class="marker-file-description">{{file(8).description}}</div>
								</div>
								<div ng-show="{{fileVisible(9)}}" class="marker-file-cont">
									<div class="marker-file-name">
										<a target="_blank" class="file file-download" href="{{url.storage}}/{{file(9).file}}">{{file(9).file}}</a>
									</div>
									<div class="marker-file-description">{{file(9).description}}</div>
								</div>
							</div>
						</div>
					</ui-gmap-windows>
				</ui-gmap-markers>
			</ui-gmap-google-map>
		</div>
	</div>
</div>