var WhateverTheWeather = {};

function initWithData(data) {
	WhateverTheWeather.data = data;	
	filterByCity("Cambridge", "MA");
}

function filterByMonthYear(month, year)
{
	// http://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript
	if (WhateverTheWeather.data.hasOwnProperty(year))
	{
		var res = {};
		
		var yearData = WhateverTheWeather.data[year];
		for(var i = 0; i < yearData.length; i++)
		{
			var cityName = undefined;
			for(var key in yearData[i]) {
				cityName = key;
			}
			if (yearData[i][cityName].month == month)
			{
				res[cityName] = yearData[i][cityName]
			}

		}
		return res;

	}
	else
	{
		return [];
	}
}

function filterByCity(city, state)
{
	var res = {};

	for(var yr in WhateverTheWeather.data)
	{
		var yearData = WhateverTheWeather.data[yr];
		for(var i = 0; i < yearData.length; i++)
		{
			var cityName = undefined;
			for(var key in yearData[i]) {
				cityName = key;
			}

			if (cityName == city) {
				res[yr]= yearData[i][cityName];
			}
		}
	}

	console.log(res);
	
}

/* 
 *	Returns an array of strings in the format "City, State"
 *	Lists all of the cities in the dataset.
 */
function getCities() {

	// pick any year
	var data =  WhateverTheWeather.data["2012"];

	var cities = [];

	data.forEach(function(d) {
		cities.push(d.city + ", " + d.state);
	});

	return cities;

}

initWithData(data);
