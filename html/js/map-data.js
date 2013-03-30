var WhateverTheWeather = {};

function initWithData(data) {
	WhateverTheWeather.data = data;	
}

function filterByYear(year)
{
	// http://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript
	if (WhateverTheWeather.data.hasOwnProperty(year))
	{
		return WhateverTheWeather.data[year];
	}
	else
	{
		return [];
	}
}

function filterByCity(city, state)
{
	if (!city || !state)
	{
		return [];
	}

	var res = [];

	for(var i in WhateverTheWeather.data)
	{

		var dataForYear = WhateverTheWeather.data[i];
		for(var j = 0; j < dataForYear.length; j++)
		{
			if (dataForYear[j].city == city &&
			    dataForYear[j].state == state)
			{
				res.push({data: dataForYear[j].data, city: city, state: state});
				break;
			}
		}

	}

	return res;
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
