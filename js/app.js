// The snake moves at an interval of 0.3 seconds, in one direction until another arrow key is pressed.

// The game ends and the interval timer stops when the snake hits the edge, this is achieved as the border are 'cells' in the grid and if the snake head enters these cells, movement stops and the game ends.
// When the snake hits the food block, the tail of the snake passes over it and now the block becomes the tail. The snake is an array of cells, and once the tail of the snake passes the array is lengthened.

// Corners? When an arrow key is pressed and the snake turns the head turns and the body follows as the redirection lasts for as many intervals as the length ofthe snake.

//Hitting itself? when snake from a direction other than the one it is moving from, then the interval timer stops and the game ends.

// cells have a background color on a timer that fades out.

var game = game || {};

game.possibleDirections = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E'
};

game.disabledDirection;
game.foodDur = 7000;
game.foodDropDur = 8000;
game.direction;

game.$intro = $('<h2 class="intro">Press Enter to start!</h2>');
game.$death = $('<h2 class="intro">You died! press Enter to restart!</h2>');
game.width = 40;

game.init = function init() {
  $('body').append(this.$intro);
  $(document).keyup((e) => {
    e.preventDefault();
    if(e.which===13) {
      this.start();
      $(document).off('keyup');
    } else {
      return false;
    }
  });
};

game.death = function death() {
  $('body').append(this.$death);
  $(document).keyup((e) => {
    e.preventDefault();
    if(e.which===13) {
      this.start();
      $(document).off('keyup');
    } else {
      return false;
    }
  });
};

game.start = function start() {
  this.buildGrid();
  this.$intro.remove();
  this.$death.remove();
  $('.score').text(`Score: 0`);
  game.direction         = this.chooseRandomDirection();
  game.disabledDirection = this.possibleDirections[game.direction];
  let firstIndex    = this.chooseRandomIndex();
  let $length       = 400;
  let count         = 1;
  let nextIndex;

  while ($($('li')[firstIndex]).hasClass('border') || $($('li')[firstIndex]).hasClass('wall')) {
    firstIndex = this.chooseRandomIndex();
  }
  nextIndex = firstIndex;

  if (count > 15) {
    this.foodDur = 5000;
    this.foodDropDur = 6000;
  } else if (count > 25) {
    this.foodDur = 3500;
    this.foodDropDur = 4500;
  } else if (count > 35) {
    this.foodDur = 3000;
    this.foodDropDur = 4000;
  }

  const food = setInterval(() => {
    this.dropFood();
  }, this.foodDropDur);

  const $movement = setInterval(() => {
    // Remove duplication
    const $start     = $($('li')[nextIndex]);

    if ($start.hasClass('snake')) {
      this.die();
    }

    $start.addClass('snake').delay($length).queue(function() {
      $(this).removeClass('snake').dequeue();
    });

    if ($start.hasClass('food')) {
      game.eat();
    }

    if ($start.hasClass('wall')) {
      game.die();
    }

    $(document).keydown(game.turn.bind(game));

    switch (game.direction) {
      case 'N':
        nextIndex = nextIndex - this.width;
        break;
      case 'E':
        nextIndex++;
        break;
      case 'S':
        nextIndex = nextIndex + this.width;
        break;
      case 'W':
        nextIndex--;
        break;
    }

    this.eat = function eat() {
      // $start.removeClass('food');
      game.$foodCell.removeClass('food');
      $('.score').text(`Score: ${count++}`);
      $length = $length * (1 + (100/$length));
    };

    this.die = function die() {
      clearInterval($movement);
      clearInterval(food);
      $('li').removeClass('snake');
      $('.grid').remove();
      this.death();
    };
  }, 100);

  this.turn = function turn(e) {
    let newDirection;
    switch(e.which) {
      case 37: // left
        newDirection = 'W';
        break;
      case 38: // up
        newDirection = 'N';
        break;
      case 39: // right
        newDirection = 'E';
        break;
      case 40: // down
        newDirection = 'S';
        break;
      default: return; // exit this handler for other keys
    }

    if (newDirection === game.disabledDirection) {
      return;
    } else {
      game.direction = newDirection;
      game.disabledDirection = this.possibleDirections[newDirection];
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
  };
};

game.buildGrid = function buildGrid() {
  const $body = $('body');
  const $grid = $('<ul class="grid"></ul>');
  $body.append($grid);
  for (let i = 0; i < this.width*this.width; i++) {
    if (i < 40 || i % 40 === 0 || i > 1560 || i % 40 === 39) {
      $grid.append(`<li class="wall"></li>`);
    } else if (i <= 159 || i % 40 < 4 || (i > 1440) || i % 40 > 35) {
      $grid.append(`<li class="border"></li>`);
    } else {
      $grid.append(`<li></li>`);
    }
  }
};

game.chooseRandomIndex = function chooseRandomIndex() {
  const gridArray = $('li');
  return Math.floor(Math.random() * gridArray.length);
};

game.chooseRandomDirection = function chooseRandomDirection() {
  const directions = ['N','E','S','W'];
  return directions[Math.floor(Math.random() * directions.length)];
};

game.dropFood = function dropFood() {
  const gridArray = $('li');
  game.foodIndex   = Math.floor(Math.random() * gridArray.length);
  game.$foodCell   = $($('li')[game.foodIndex]);

  while (game.$foodCell.hasClass('snake') || game.$foodCell.hasClass('wall')) {
    game.foodIndex = Math.floor(Math.random() * gridArray.length);
    game.$foodCell = $($('li')[game.foodIndex]);
  }
  game.$foodCell.addClass('food');
  setTimeout(() => {
    if (game.$foodCell.hasClass('food')) game.$foodCell.removeClass('food');
  }, this.foodDur);
};

$(game.init.bind(game));
