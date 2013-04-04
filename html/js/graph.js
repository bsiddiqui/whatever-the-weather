/*
 *  Whatever the Weather
 *  drawLineGraph adapted http://bl.ocks.org/mbostock/3883245
 *
 */

 function drawLineGraph(city, state, datapoint){

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y").parse;

  var x = d3.time.scale()
  .range([0, width]);

  var y = d3.scale.linear()
  .range([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

  var line = d3.svg.line()
  .x(function(d) { return x(d["year"]); })
  .y(function(d) { return y(d.data[datapoint]); });

  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var city = filterByCity(city, state);
  
  city.forEach(function(d) {
    d["year"] = parseDate(d["year"]);
    d.data[datapoint] = +d.data[datapoint]
  });

  x.domain(d3.extent(city, function(d) { return d["year"]; }));
  y.domain(d3.extent(city, function(d) { return d.data[datapoint]; }));

  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Temp (F)");

  svg.append("path")
  .datum(city)
  .attr("class", "line")
  .attr("d", line);

};

function compareCitiesData(city1, state1, city2, state2, datapoint){
  var city1 = filterByCity(city1, state1);
  var city2 = filterByCity(city2, state2);

  var values1 = [];
  var values2 = [];
  var data = [];

  for (var i in city1){
    var dataForYear = city1[i];
    values1.push([dataForYear.year, +dataForYear.data[datapoint]]); 
  }

  for (var i in city2){
    var dataForYear = city2[i];
    values2.push([dataForYear.year, +dataForYear.data[datapoint]]); 
  }

  data.push({key: city1[0].city, values: values1});
  data.push({key: city2[0].city, values: values2});

  console.log(data);


  return data;
};

function compareCities(city1, state1, city2, state2, datapoint){
  var data = compareCitiesData(city1, state1, city2, state2, datapoint);
  var colors = d3.scale.category10();
  keyColor = function(d, i) {return colors(d.key)};

  var chart;
  nv.addGraph(function() {
    chart = nv.models.lineChart()
    .x(function(d) { return d[0] })
    .y(function(d) { return d[1] })
    .color(keyColor)
                //.clipEdge(true);

                chart.xAxis
                .showMaxMin(false)

                chart.yAxis
                .tickFormat(d3.format(',.2f'));

                d3.select('#chart1')
                .datum(data)
                .transition().duration(500).call(chart);

                nv.utils.windowResize(chart.update);

                chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

                return chart;

              });

};