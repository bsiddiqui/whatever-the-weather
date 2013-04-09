/*
 *	Whatever the Weather
 * 	Author: Kevin Schmid
 *	Adapted from https://google-developers.appspot.com/maps/documentation/javascript/examples/map-simple
 *
 */

/*
 *	Constants
 */

var INIT_ZOOM_LEVEL = 4;
var INIT_LAT = 39;
var INIT_LNG = -96;

// Pulled off of Google, added to object.
var latlng = {
	"AZ": {
		"Phoenix": {lat: 33, lng: -112}
	},
	"PA": {
		"Philadelphia": {lat: 39.9522, lng: -75.1642}
	},
	"WA": {
		"Seattle": {lat: 47.6097, lng: -122.3331}
	},
	"TX": {
		"Houston": {lat: 29.7631, lng: -95.3631},
		"San Antonio": {lat: 29.4239, lng: -98.4933},
		"Dallas": {lat: 32.7828, lng: -96.8039}
	},
	"AK": {
		"Juneau": {lat: 58.3514, lng: -134.5116}
	},
	"MA": {
		"Cambridge": {lat: 42.37, lng: -71.13}
	},
	"MT": {
		"Billings": {lat: 45.7833, lng: -108.5}
	},
	"NY": {
		"New York": {lat: 40, lng: -73}
	}, 
	"CA": {
		"Los Angeles": {lat: 34.0522, lng: -118.2428}, 
		"San Diego": {lat: 32.7153, lng: -117.1564},
		"San Jose": {lat: 37.3041, lng: -121.8727}
	}, 
	"FL": {
		"Jacksonville": {lat: 30.3319, lng: -81.6558}
	}, 
	"IL": {
		"Chicago": {lat: 41.85, lng: -87.65}
	}
}

function chooseColor(temp) 
{
	if (temp < 20)
	{
		return "#00FFFF";
	
	}
	else if (temp < 60)
	{
		return "#3333FF";
	}
	else if (temp < 80)
	{
		return "#FF9966"
	}
	else if (temp < 100)
	{
		return "#FF9900";
	}
	else
	{
		return "#FF0000";
	}

}

function computeAverages(map)
{

	var bounds = map.getBounds();

	var curYear = $("#main_year_input").val();

	var cities = filterByYear(curYear);

	var total_mean_temp = 0;
	var total_min_temp = 0;
	var total_max_temp = 0;
	var total_dewpoint = 0;
	var total_windspeed = 0;
	var total_precipitation = 0;
	var items = 0;

	cities.forEach(function(c) {
		var lookup = latlng[c.state][c.city];
		var loc = new google.maps.LatLng(lookup.lat, lookup.lng);

		if (bounds.contains(loc)) {
			total_mean_temp += +c.data.avg_temp;
			total_min_temp += +c.data.avg_min_temp;
			total_max_temp += +c.data.avg_max_temp;
			total_dewpoint += +c.data.avg_dew_point;
			total_windspeed += +c.data.avg_wind;
			total_precipitation += +c.data.avg_precipitation;
			items++;
		}
	});

	if (items) {
		var avg_temp = total_mean_temp / items;
		var avg_min_temp = total_min_temp / items;
		var avg_max_temp = total_max_temp / items;
		var avg_dewpoint = total_dewpoint / items;
		var avg_windspeed = total_windspeed / items;
		var avg_precipitation = total_precipitation / items;
		$("#main_avg_temp").html(Math.round(avg_temp) + " &deg;F");
		$("#main_min_temp").html(Math.round(avg_min_temp) + " &deg;F");
		$("#main_max_temp").html(Math.round(avg_max_temp) + " &deg;F");
		$("#main_dewpoint").html(Math.round(avg_dewpoint) + " &deg;F");
		$("#main_wind").html(Math.round(avg_windspeed) + " mph");
		$("#main_precipitation").html(Math.round(avg_precipitation * 100)/100 + " \"\"");
	} else {
		$("#main_avg_temp").html("-");
		$("#main_min_temp").html("-");
		$("#main_max_temp").html("-");
		$("#main_dewpoint").html("-");
		$("#main_wind").html("-");
		$("#main_precipitation").html("-");

	}

}

function populate(map, year) {
	var year_data = filterByYear(year);

	if (window.circles)
	{
		window.circles.forEach(function(c) {
			c.setMap(null);
		});
	}

	window.circles = [];

	year_data.forEach(function(city_data) {

		var city = city_data.city;

		var state = city_data.state;
		var lookup = latlng[state][city];
		console.log(city);
		var loc = new google.maps.LatLng(lookup.lat, lookup.lng);

		var temp = city_data.data.avg_temp;

		var circ = new google.maps.Circle({
			center:  loc,
			fillColor: chooseColor(temp), 
			radius: 100000,
			map: map, 
			strokeWeight: 0, 
			fillOpacity: .8
		});

		circles.push(circ);

		google.maps.event.addListener(circ, 'click', function() {

			$("#modal_city_name").html(city + ", " + state);	
			$("#city_modal").modal();
  			lineChart(city, state, "avg_max_temp");
  			lineChart(city, state, "avg_temp");
  			lineChart(city, state, "avg_min_temp");

			// http://twitter.github.io/bootstrap/javascript.html#tabs
			$("#historicTabs a").click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			});
		});
	});
}

function initialize() {

	var mapOptions = {
		zoom: INIT_ZOOM_LEVEL,
		center: new google.maps.LatLng(INIT_LAT, INIT_LNG),
		mapTypeId: google.maps.MapTypeId.ROADMAP, 
		panControl: false, 
		streetViewControl: false, 
		overviewMapControl: false, 
		mapTypeControl: false
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var cities = getCities();

	populate(map, 2012);

	$("#main_year_input").change(function() {
		var yr = $(this).val();

		populate(map, yr);

		computeAverages(map);
	});

	$("#main_city_input").typeahead({
		source: cities, 
		updater: function(item) {
			var info = item.split(",");
			info = info.map(function(s) {
				return s.trim();
			});

			var city = info[0];
			var state = info[1];
		
			var new_center = latlng[state][city];
			map.setCenter(new google.maps.LatLng(new_center.lat, new_center.lng));
			map.setZoom(6);

			return item;
		}
	});

	$("#main_restart").click(function() {
		map.setZoom(INIT_ZOOM_LEVEL);
		map.setCenter(new google.maps.LatLng(INIT_LAT, INIT_LNG));
		$("#main_restart").hide();
	});

	$("#main_restart").hide();

	google.maps.event.addListener(map, 'zoom_changed', function() {
		if (map.getZoom() <= INIT_ZOOM_LEVEL) {
			$("#main_restart").hide();
		} else {
			$("#main_restart").show();
		}

	});


	google.maps.event.addListener(map, 'idle', function() {
		computeAverages(map);
	});

	$("#main_region_data").click(function() {
		$("#compare_modal").modal();

		$("#compareFirstCity").typeahead({
			source: cities, 
			updater: function(item) {
					window.first = item;
					compareUpdate();
					return item;
				}
		});

		$("#compareSecondCity").typeahead({
			source: cities, 
			updater: function(item) {
					window.second = item;
					compareUpdate();
					return item;
			}
		});


	});

}

function toggleCompareGraph() {
	
}

function compareUpdate() {

	// if there is a clear definition of the first and second city
	if (window.first && window.second) {

		var firstCity = window.first.split(",");
		var firstCityName = firstCity[0].trim();
		var firstStateName = firstCity[1].trim();

		var secondCity = window.second.split(",");
		var secondCityName = secondCity[0].trim();
		var secondStateName = secondCity[1].trim();

		compareLineChart(firstCityName, firstStateName, secondCityName, secondStateName, "avg_temp");
		compareLineChart(firstCityName, firstStateName, secondCityName, secondStateName, "avg_min_temp");
		compareLineChart(firstCityName, firstStateName, secondCityName, secondStateName, "avg_max_temp");
		
		$("#compareTabs a").click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			});


	}



}

google.maps.event.addDomListener(window, 'load', initialize);
