import json

# thanks to HW1 on scraping
from pattern.web import URL, DOM, plaintext, strip_between, URLTimeout
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

airports = []

# http://docs.python.org/2/library/csv.html
import csv
with open('cities', 'r') as csvfile: 
	reader = csv.reader(csvfile, delimiter=",")
	for row in reader:
		airports.append({"airport": row[0], "city": row[1], "state": row[2]})

def urlForAirportAndYear(airport, year, month):
	# return "http://www.wunderground.com/history/airport/" + airport + "/" + str(year) + "/1/01/CustomHistory.html?dayend=01&monthend=1&yearend=" + str(year+1)
	return "http://www.wunderground.com/history/airport/" + airport + "/" + str(year) + "/" + str(month) + "/1/MonthlyHistory.html"

def fetchWeatherDataForAirportAndYear(airport, year, month):
	try:
		print urlForAirportAndYear(airport, year, month)
		url = URL(urlForAirportAndYear(airport, year, month))
		dom = DOM(url.download(cached=True))
		avg_temp = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[3].by_class("b")[1].content
		avg_max_temp = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[2].by_class("b")[1].content
		avg_min_temp = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[4].by_class("b")[1].content
		# avg_dew_point = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[10].by_class("b")[1].content
		# avg_precipitation = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[12].by_class("b")[1].content
		# avg_wind = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[15].by_class("b")[1].content
		# avg_gust_wind = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[16].by_class("b")[1].content
		# avg_sea_level_pressure = dom.by_class("contentData")[0].by_tag("table")[0].by_tag("tr")[18].by_class("b")[1].content

		print "good"	
		return {"avg_temp": avg_temp, 
			"avg_min_temp": avg_min_temp, 
			"avg_max_temp": avg_max_temp, 
			# "avg_dew_point": avg_dew_point, 
			# "avg_precipitation": avg_precipitation, 
			# "avg_wind": avg_wind,
			# "avg_gust_wind": avg_gust_wind, 
			# "avg_sea_level_pressure": avg_sea_level_pressure
		}
	except URLTimeout:
		print "timeout"
		return {}

yearData = {}

for i in range(2008, 2013):
	yearData[i] = []
	for j in airports: 
		for k in range(1, 13):
			try:
				yearData[i].append({"data": fetchWeatherDataForAirportAndYear(j["airport"], i, k), "city": j["city"], "state": j["state"], "month": str(k)})
				print("got month " + str(k) + ", year " + str(i) + ", city " + j["city"] + "\n")
			except IndexError:
				continue


f = open("data/data8.json", "w")
f.write(json.dumps(yearData))
f.close()
