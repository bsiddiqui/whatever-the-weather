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


/*
 *	Visualization state
 */

MapState = {year: "2012", month: "12"};

// Pulled off of Google, added to object.
var latlng = {
	"NH": {
		"Manchester": {lat: 42.9956, lng: -71.4553}, 
		"Rochester": {lat: 43.3044, lng: -70.9761}
	},
	"IN": {
		"Indianapolis": {lat: 39.7683, lng: -86.1581}, 
		"South Bend": {lat: 41.6833, lng: -86.25}
	},
	"AZ": {
		"Phoenix": {lat: 33, lng: -112}, 
		"Tucson": {lat: 32.2217, lng: -110.9258}, 
		"Mesa": {lat: 33.4222, lng: -111.8219}, 
		"Round Rock": {lat: 36.5131, lng: -109.4728}
	},
	"GA": {
		"Atlanta": {lat: 32.9605, lng: -83.1132}, 
		"Blakely": {lat: 31.3775, lng: -84.9342}, 
		"Fargo": {lat: 30.6817, lng: -82.5667}
	},
	"PA": {
		"Philadelphia": {lat: 39.9522, lng: -75.1642}
	},
	"WA": {
		"Seattle": {lat: 47.6097, lng: -122.3331}, 
		"Everett": {lat: 47.9792, lng: -122.2008}
	},
	"MI": {
		"Detroit": {lat: 42.3314, lng: -83.0458}, 
		"Flint": {lat: 43.0125, lng: -83.6875}
	},
	"NC": {
		"Charlotte": {lat: 35.2269, lng: -80.8433},
		"Raleigh": {lat: 35.7719, lng: -78.6389},
		"Wilmington": {lat: 39.7458, lng: -75.5469}
	},
	"TX": {
		"El Paso": {lat: 31.7586, lng: -106.4864},
		"Fort Worth": {lat: 32.7253, lng: -97.3206},
		"Austin": {lat: 30.2669, lng: -97.7428},
		"Houston": {lat: 29.7631, lng: -95.3631},
		"San Antonio": {lat: 29.4239, lng: -98.4933},
		"Dallas": {lat: 32.7828, lng: -96.8039},
		"Arlington": {lat: 32.7356, lng: -97.1078}, 
		"Carlsbad": {lat: 31.579, lng: -100.664}
	},
	"NE": {
		"Omaha": {lat: 41.2586, lng: -95.9375}, 
		"Gresham": {lat: 41.0283, lng: -97.4019}
	},
	"AK": {
		"Juneau": {lat: 58.3514, lng: -134.5116}
	},
	"MA": {
		"Cambridge": {lat: 42.37, lng: -71.13}, 
		"Boston": {lat: 42.3583, lng: -71.0603}, 
		"Westminster": {lat: 42.5459, lng: -71.9106}
	},
	"CO": {
		"Denver": {lat: 39.7392, lng: -104.9842},
		"Colorado Springs": {lat: 38.8339, lng: -104.8208}, 
		"Broomfield": {lat: 39.9206, lng: -105.0861}, 
		"Arvada": {lat: 39.8028, lng: -105.0869}, 
		"Centennial": {lat: 39.5792, lng: -104.8769}
	},
	"TN": {
		"Memphis": {lat: 35.1494, lng: -90.0489}, 
		"Nashville": {lat: 36.1658, lng: -86.7844}, 
		"Murfreesboro": {lat: 35.8456, lng: -86.3903}
	},
	"KY": {
		"Louisville": {lat: 38.2542, lng: -85.7594}, 
		"Pueblo": {lat: 36.8381, lng: -84.8500}
	},
	"WI": {
		"Milwaukee": {lat: 43.0389, lng: -87.9064}, 
		"Green Bay": {lat: 44.5192, lng: -88.0197}
	},
	"OR": {
		"Portland": {lat: 45.5236, lng: -122.6750}
	},
	"OK": {
		"Oklahoma City": {lat: 35.4675, lng: -97.5161}, 
		"Tulsa": {lat: 36.1539, lng: -95.9925}
	},
	"PA": {
		"Elgin": {lat: 41.9019, lng: -79.7447}, 
		"Philadelphia": {lat: 39.9522, lng: -75.1642}
	},
	"NV": {
		"Las Vegas": {lat: 36.1131, lng: -115.1764}
	},
	"NM": {
		"Albuquerque": {lat: 35.0844, lng: -106.6506}
	},
	"MT": {
		"Billings": {lat: 45.7833, lng: -108.5}
	},
	"MD": {
		"Baltimore": {lat: 39.2833, lng: -76.6167}
	},	
	"NY": {
		"New York": {lat: 40, lng: -73}, 
		"Odessa": {lat: 42.3364, lng: -76.7892}, 
		"Fayetteville": {lat: 36.0625, lng: -94.1572}
	}, 
	"MO": {
		"Kansas City": {lat: 39.0997, lng: -94.5783}, 
		"Spokane": {lat: 36.8681, lng: -93.2967}
	},
	"MS": {
		"Billings": {lat: 45.7833, lng: -108.5}
	},
	"DC": {
		"Washington": {lat: 38.89, lng: -77.03}
	},
	"CA": {
		"San Francisco": {lat: 37.7750, lng: -122.4183},
		"Los Angeles": {lat: 34.0522, lng: -118.2428}, 
		"San Diego": {lat: 32.7153, lng: -117.1564},
		"San Jose": {lat: 37.3041, lng: -121.8727}, 
		"Fresno": {lat: 36.7478, lng: -119.7714}, 
		"Sacramento": {lat: 38.5817, lng: -121.4933}, 
		"Long Beach": {lat: 33.7669, lng: -118.1883}, 
		"Oakland": {lat: 37.8044, lng: -122.2697}, 
		"Costa Mesa": {lat: 33.6411, lng: -117.9178},
		"Inglewood": {lat: 33.9617, lng: -118.3522}, 
		"West Covina": {lat: 34.0686, lng: -117.9381}, 
		"Murrieta": {lat: 33.4936, lng: -117.1475},
		"Temecula": {lat: 33.4936, lng: -117.1475}, 
		"Daly City": {lat: 37.7058, lng: -122.4608}, 
		"Davenport": {lat: 37.0117, lng: -122.1908},
		"Rialto": {lat: 34.1064, lng: -117.3694}
	}, 
	"FL": {
		"Jacksonville": {lat: 30.3319, lng: -81.6558},
		"Miami": {lat: 25.7216, lng: -80.2793}, 
		"Miami Gardens": {lat: 25.9420, lng: -80.2456}, 
		"Palm Bay": {lat: 28.0342, lng: -80.5889},
		"Pompano Beach": {lat: 26.2375, lng: -80.1250}, 
		"West Palm Beach": {lat: 26.715, lng: -80.0536}
	}, 
	"ID": {
		"Boise": {lat: 43.6136, lng: -116.2025}
	},
	"IL": {
		"Chicago": {lat: 41.85, lng: -87.65}, 
		"Modesto": {lat: 39.4769, lng: -89.9828}
	}, 
	"OH": {
		"Columbus": {lat: 39.9611, lng: -82.9989}, 
		"Cleveland": {lat: 41.4994, lng: -81.6956}, 
		"Cincinnati": {lat: 39.1619, lng: -84.4569}
	}, 
	"MN": {
		"Minneapolis": {lat: 44.98, lng: -93.2636}
	}, 
	"KS": {
		"Wichita": {lat: 37.6922, lng: -97.3372}, 
		"High Point": {lat: 35.9556, lng: 80}
	}, 
	"LA": {
		"New Orleans": {lat: 29.9728, lng: -90.0590}, 
		"Shreveport": {lat: 32.4681, lng: -93.7711}
	},
	"AL": {
		"Columbia": {lat: 31.2925, lng: -85.1117}
	}, 
	"CT": {
		"Waterbury": {lat: 41.5581, lng: -73.0519}, 
		"Norwalk": {lat: 41.1175, lng: -73.4083}
	},
	"AR": {
		"Lowell": {lat: 36.2553, lng: -94.1306}
	}, 
	"ME": {
		"Fairfield": {lat: 41.1411, lng: -73.2642}
	}, 
	"Virginia": {
		"Richmond": {lat: 35, lng: -77}
	}, 
	"Iowa": {
		"Des Moines": {lat: 47.4019, lng: -122.3231}
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

	var cities = filterByMonthYear(MapState.month, MapState.year);

	var total_mean_temp = 0;
	var total_min_temp = 0;
	var total_max_temp = 0;
	var total_dewpoint = 0;
	var total_windspeed = 0;
	var total_precipitation = 0;
	var items = 0;

	for(var k in cities) {


		var c = cities[k];

		var lookup = latlng[c.state][c.city];
		var loc = new google.maps.LatLng(lookup.lat, lookup.lng);
	
		if (bounds.contains(loc)) {

			if (!c.data.avg_temp) {
				return;
			}

		}	

		total_mean_temp += +c.data.avg_temp;
		total_min_temp += +c.data.avg_min_temp;
		total_max_temp += +c.data.avg_max_temp;
		total_dewpoint += +c.data.avg_dew_point;
		total_windspeed += +c.data.avg_wind;
		total_precipitation += +c.data.avg_precipitation;
		items++;
	}

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

function populate(map) {
	var year_data = filterByMonthYear(MapState.month, MapState.year);

	var oldCircles = window.circles;
	window.circles = [];

	for(var city in year_data) {
		var city_data = year_data[city];
		var city = city_data.city;

		var state = city_data.state;


		var lookup = latlng[state][city];
		var loc = new google.maps.LatLng(lookup.lat, lookup.lng);

		var temp = city_data.data.avg_temp;

		var circ = new google.maps.Circle({
			center:  loc,
			fillColor: chooseColor(temp), 
			radius: 40000,
			map: map, 
			strokeWeight: 0, 
			fillOpacity: .8
		});

		window.circles.push(circ);

		google.maps.event.addListener(circ, 'click', function() {

			$("#modal_city_name").html(city + ", " + state);	
  			lineChart(city, state, "avg_temp");

			// http://twitter.github.io/bootstrap/javascript.html#tabs
			$("#historicTabs a").click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			});

			$(".graph").css("visibility", "");

		});
	}

	if (oldCircles)
	{
		oldCircles.forEach(function(c) {
			c.setMap(null);
		});
	}

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

	populate(map, 1970);

	window.start = 0;
	window.end = NUM_INCREMENTS;

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

	initializeSlider(map);

	$(".graph").css('visibility', 'hidden');

	$("#about_btn").click(function() {
		$("#about_modal").modal();
	});

}

function startTimelapse(map) {
	window.map = map;
	restoreStart = start;
	restoreEnd = end;

	$("#yearSlider").slider("disable");

	timelapseId = setInterval(function() {
		if (start < end) {
			$("#curYear").html(yearStr(++start));
			$("#yearSlider").slider("option", "values", [start, end]);
			populate(map, extractYear(start));
			computeAverages(map, extractYear(start));
		} 
		else {
			clearInterval(timelapseId);
			initializeRangeSlider(map);
		}
	}, 1000);

}

var START_YEAR = 1970;
var END_YEAR = 2013;
var MONTHS_PER_YEAR = 12;
var NUM_INCREMENTS = (END_YEAR - START_YEAR) * MONTHS_PER_YEAR;
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function extractYear(n) {
	return START_YEAR + Math.floor(n / MONTHS_PER_YEAR);
}

function extractMonth(n) {
	return (n % MONTHS_PER_YEAR) + 1;
}

function yearStr(n) {
	var year = extractYear(n);
	var month = MONTHS[n % 12];

	return month + " " + year;
}

function initializeSlider(map, destroy) {

	if (destroy) {
		$("#yearSlider").slider("destroy");
	}

	var slider = $("#yearSlider").slider({
		min: 0, 
		max: NUM_INCREMENTS, 
		animate: "fast", 
		slide: function(event, ui) {

			MapState.month = extractMonth(ui.value);
			MapState.year = extractYear(ui.value);

			console.log(MapState.month);
			console.log(MapState.year);

			$("#curYear").html(yearStr(ui.value));
			populate(map);
			computeAverages(map);

		}
	});

	$("#curYear").html("January 1970");
	$("#endYear").hide();

	$("#playMode").click(function() {
		initializeRangeSlider(map);
	});

	$("#startAnimationBtn").click(function() {
		startTimelapse(map)
	});


}

function initializeRangeSlider(map) {
	
	var startingYear = window.restoreStart || 0;
	var endingYear = window.restoreEnd || NUM_INCREMENTS;

	var oldLeftYear;

	$("#yearSlider").slider("destroy");
	$("#yearSlider").slider({
		min: startingYear, 
		max: endingYear, 
		animate: "fast",
		range: true, 
		values: [startingYear, endingYear],
		slide: function(event, ui) {

			MapState.month = extractMonth(ui.values[0]);
			MapState.year = extractMonth(ui.values[1]);
	
			$("#curYear").html(yearStr(ui.values[0]));
			$("#endYear").html(yearStr(ui.values[1]));
			
			if (oldLeftYear != ui.values[0]) {
				populate(map);
				computeAverages(map);
			}

			oldLeftYear = ui.values[0];
		}
	});

	$("#curYear").html(yearStr(startingYear));
	$("#endYear").html(yearStr(endingYear));
	$("#endYear").show();

	$("#startAnimationBtn").show();
	$("#startAnimationBtn").css('display', 'block');

	$("#startAnimationBtn").css('margin-left', 'auto');
	$("#startAnimationBtn").css('margin-right', 'auto');

	$("#playMode").html("Browse...");
	$("#playMode").unbind();
	$("#playMode").click(function() {
		$("#startAnimationBtn").hide();
		initializeSlider(map, true);
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
