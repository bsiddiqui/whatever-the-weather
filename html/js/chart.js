
function drawLineGraph(city, state){

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
  .y(function(d) { return y(d.data["avg_min_temp"]); });

  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var city = filterByCity(city, state);
  
  console.log(city);


  city.forEach(function(d) {
    d["year"] = parseDate(d["year"]);
    d.data["avg_min_temp"] = +d.data["avg_min_temp"];
  });

  x.domain(d3.extent(city, function(d) { return d["year"]; }));
  y.domain(d3.extent(city, function(d) { return d.data["avg_min_temp"]; }));

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