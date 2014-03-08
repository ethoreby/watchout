var score = 0;
var highScore = 0;
var collisions = 0;

var dots = d3.range(50);
for (var i = 0; i < dots.length; i++) {
  dots[i] = { x: 0, y: 0 }
}

var off = false;
var collided = false;
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
  .attr({'class': 'enemy', 'cx': function(d) { return d.x; }, 'cy': function(d) { return d.y; }, 'r': 10});

var intervalScore = setInterval(function() {
  score++;
  setScore();
  var p = d3.select('.player');
  if (p.attr('cx') < 0 || p.attr('cx') > 900 || p.attr('cy') < 0 || p.attr('cy') > 500) {
    score -= 3;
    off = true;
  }
  else {
    off = false;
  }
}, 20);

var setHighScore = function() {
  if(highScore < score) {
    highScore = score;
  }
  d3.select('.high').select('span').text(highScore);
};

var setCollisions = function() {
  if(!collided) {
    collided = true;
    d3.select('.svg-wrap').transition().duration(100).style('background-color', 'red');
    d3.select('.collisions').select('span').text(++collisions);
    setTimeout(function(){
      d3.select('.svg-wrap').transition().duration(100).style('background-color', '#f9f9f9');
      collided = false;
    }, 100);
  }
}

var setScore = function() {
  d3.select('.current').select('span').text(score);
};

var checkCollisions = function(endData) {
  // debugger;
  var enemy = d3.select(this);
  var enemyEndX = endData.x;
  var enemyEndY = endData.y;
  var enemyStartX = parseFloat(enemy.attr('cx'));
  var enemyStartY = parseFloat(enemy.attr('cy'));
  return function(t) {
    var tweenX =  enemyStartX + (enemyEndX - enemyStartX) * t;
    var tweenY =  enemyStartY + (enemyEndY - enemyStartY) * t;

    var deltaX = Math.abs(tweenX - parseFloat(player.attr('cx')));
    var deltaY = Math.abs(tweenY - parseFloat(player.attr('cy')));
    var hypotenuse = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    if(hypotenuse <= 20) {
      setHighScore();
      score = 0;
      setCollisions();

    }

    return enemy.attr('cx', tweenX).attr('cy', tweenY);
  };
};

var inProgress = setInterval(function() {
  for (var i = 0; i < dots.length; i++) {
    dots[i]['x'] = Math.floor(Math.random() * 900);
    dots[i]['y'] = Math.floor(Math.random() * 500);
  }
  d3.selectAll('.enemy')
    .data(dots)
    .transition().duration(moveInterval).tween('custom', checkCollisions)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
    // setScore(false);
}, moveInterval);





