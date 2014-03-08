// start slingin' some d3 here.

// var data = [2, 6, 8, 14];

// d3.select('.experiments')
//   .selectAll('div')
//   .data(data)
//   .enter().append('div')
//     .style('width', function(d) { return d * 10 + 'px'; })
//     .text(function(d) { return d; });

// var test = setInterval(function() {
//   for (var i = 0; i < data.length; i++) {
//     data[i] = Math.floor(Math.random() * 50);
//   }
//   d3.select('.experiments')
//     .selectAll('div')
//     .data(data)
//     .transition()
//     .style('width', function(d) { return d * 10 + 'px'; })
//     .text(function(d) { return d; });
// }, 1000);
//
var dots = d3.range(20);
for (var i = 0; i < dots.length; i++) {
  dots[i] = { x: 0, y: 0 }
}

var moveInterval = 2000;
var svg = d3.select('svg');
var player = svg.select('.player');

var drag = d3.behavior.drag().on('drag', function() {
  player.attr('cx', d3.event.x);
  player.attr('cy', d3.event.y);
});

drag.call(player);

svg.selectAll('.enemy')
  .data(dots)
  .enter()
  .append('circle')
  .attr('class', 'enemy')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 10);
  // .style('background-color', function(d) { return '#' + Math.floor(Math.random() * 100000)});

// var in-progress =
setInterval(function() {
  for (var i = 0; i < dots.length; i++) {
    dots[i]['x'] = Math.floor(Math.random() * 900);
    dots[i]['y'] = Math.floor(Math.random() * 500);
  }
  d3.selectAll('.enemy')
    .data(dots)
    .transition().duration(moveInterval)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  score = d3.select('.current').select('span').text();
  d3.select('.current').select('span').text(parseInt(score) + 1);
}, moveInterval);
