function compareCitiesData(city1, state1, city2, state2, datapoint){
  var city1 = filterByCity(city1, state1);
  var city2 = filterByCity(city2, state2);

  var values1 = [];
  var values2 = [];
  var data = [];

  for (var i in city1){
    var dataForYear = city1[i];
    values1.push([dataForYear.year, dataForYear.data[datapoint]]); 
  }

  for (var i in city2){
    var dataForYear = city2[i];
    values2.push([dataForYear.year, dataForYear.data[datapoint]]); 
  }

  data.push({key: city1[0].city, values: values1});
  data.push({key: city2[0].city, values: values2});


  return data;
};

function compareCities(city1, state1, city2, state2, datapoint){
  var data = compareCitiesData(city1, state1, city2, state2, datapoint);
  var colors = d3.scale.category20();
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

}

$(function(){
  compareCities("New York", "NY", "Los Angeles", "CA", "avg_max_temp");
});