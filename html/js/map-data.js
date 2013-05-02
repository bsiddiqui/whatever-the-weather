var WhateverTheWeather = {};

function initWithData(data) {
	WhateverTheWeather.data = data;	
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

	return res;

}

/* 
 *	Returns an array of strings in the format "City, State"
 *	Lists all of the cities in the dataset.
 */
function getCities(month, year) {

	var moYearData = filterByMonthYear(month, year);
	var cities = [];

	for(var i in moYearData)
	{
		cities.push(moYearData[i].city + ", " + moYearData[i].state);
	}

	return cities;

}
initWithData(data);
getCities("1", "1965");
