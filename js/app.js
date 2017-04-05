// The snake moves at an interval of 0.3 seconds, in one direction until another arrow key is pressed.

// The game ends and the interval timer stops when the snake hits the edge, this is achieved as the border are 'cells' in the grid and if the snake head enters these cells, movement stops and the game ends.
// When the snake hits the food block, the tail of the snake passes over it and now the block becomes the tail. The snake is an array of cells, and once the tail of the snake passes the array is lengthened.

// Corners? When an arrow key is pressed and the snake turns the head turns and the body follows as the redirection lasts for as many intervals as the length ofthe snake.

//Hitting itself? when snake from a direction other than the one it is moving from, then the interval timer stops and the game ends.

// cells have a background color on a timer that fades out.

$(init);

// it goes back on itself and does in the first game.

const possibleDirections = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E'
};

let disabledDirection;
// let direction;

const $intro = $('<h2 class="intro">Press Enter to start!</h2>');
const $death = $('<h2 class="intro">You died! press Enter to restart!</h2>');
const width = 40;

function init() {
  $('body').append($intro);
  $(document).keyup((e) => {
    e.preventDefault();
    if(e.which===13) {
      start();
      $(document).off('keyup');
    } else {
      return false;
    }
  });
}

function death() {
  $('body').append($death);
  $(document).keyup((e) => {
    e.preventDefault();
    if(e.which===13) {
      start();
      $(document).off('keyup');
    } else {
      return false;
    }
  });
}

function start() {
  buildGrid();
  $intro.remove();
  $death.remove();
  $('.score').text(`Score: 0`);
  let direction     = chooseRandomDirection();
  disabledDirection = possibleDirections[direction];
  let firstIndex    = chooseRandomIndex();
  let $length       = 750;
  let count         = 1;
  let nextIndex;

  while ($($('li')[firstIndex]).hasClass('border') || $($('li')[firstIndex]).hasClass('wall')) {
    firstIndex = chooseRandomIndex();
  }
  nextIndex = firstIndex;

  const food = setInterval(() => {
    dropFood();
  }, 8000);

  const $movement = setInterval(() => {
    // Remove duplication
    // const width      = 40;
    const $start     = $($('li')[nextIndex]);

    if ($start.hasClass('snake')) {
      clearInterval($movement);
      clearInterval(food);
      $('li').removeClass('snake');
      $('.grid').remove();
      death();
    }

    $start.addClass('snake').delay($length).queue(function() {
      $(this).removeClass('snake').dequeue();
    });

    if ($start.hasClass('food')) {
      $start.removeClass('food');
      $('.score').text(`Score: ${count++}`);
      $length = $length * (1 + (100/$length));
    }

    if ($start.hasClass('wall')) {
      clearInterval($movement);
      clearInterval(food);
      // console.log('death');
      $('li').removeClass('snake');
      $('.grid').remove();
      death();
    }

    $(document).keydown(turn);

    switch (direction) {
      case 'N':
        nextIndex = nextIndex - width;
        break;
      case 'E':
        nextIndex++;
        break;
      case 'S':
        nextIndex = nextIndex + width;
        break;
      case 'W':
        nextIndex--;
        break;
    }
  }, 100);

  function turn(e) {
    if (direction !== disabledDirection) {
      switch(e.which) {
        case 37: // left
          direction = 'W';
          disabledDirection = possibleDirections[direction];
          break;
        case 38: // up
          direction = 'N';
          disabledDirection = possibleDirections[direction];
          break;
        case 39: // right
          direction = 'E';
          disabledDirection = possibleDirections[direction];
          break;
        case 40: // down
          direction = 'S';
          disabledDirection = possibleDirections[direction];
          break;
        default: return; // exit this handler for other keys
      }
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
}

function buildGrid() {
  const $body = $('body');
  const $grid = $('<ul class="grid"></ul>');
  let newId   = 1;
  $body.append($grid);
  for (let i = 0; i < width*width; i++) {
    if (i < 40 || i % 40 === 0 || i > 1560 || i % 40 === 39) {
      $grid.append(`<li id="${newId}" class="wall"></li>`);
      newId++;
    } else if (i <= 159 || i % 40 < 4 || (i > 1440) || i % 40 > 35) {
      $grid.append(`<li id="${newId}" class="border"></li>`);
      newId++;
    } else {
      $grid.append(`<li id="${newId}"></li>`);
      newId++;
    }
  }
}

function chooseRandomIndex() {
  const gridArray = $('li');
  return Math.floor(Math.random() * gridArray.length);
}

function chooseRandomDirection() {
  const directions = ['N','E','S','W'];
  return directions[Math.floor(Math.random() * directions.length)];
}

function dropFood() {
  const gridArray = $('li');
  let foodIndex   = Math.floor(Math.random() * gridArray.length);
  let $foodCell   = $($('li')[foodIndex]);

  while ($foodCell.hasClass('snake') || $foodCell.hasClass('wall')) {
    foodIndex = Math.floor(Math.random() * gridArray.length);
    $foodCell = $($('li')[foodIndex]);
  }
  $foodCell.addClass('food');
  setTimeout(() => {
    if ($foodCell.hasClass('food')) $foodCell.removeClass('food');
  }, 7000);
}
