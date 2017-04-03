// The snake moves at an interval of 0.3 seconds, in one direction until another arrow key is pressed.

// The game ends and the interval timer stops when the snake hits the edge, this is achieved as the border are 'cells' in the grid and if the snake head enters these cells, movement stops and the game ends.
// When the snake hits the food block, the tail of the snake passes over it and now the block becomes the tail. The snake is an array of cells, and once the tail of the snake passes the array is lengthened.

// Corners? When an arrow key is pressed and the snake turns the head turns and the body follows as the redirection lasts for as many intervals as the length ofthe snake.

//Hitting itself? when snake from a direction other than the one it is moving from, then the interval timer stops and the game ends.

// cells have a background color on a timer that fades out.

$(init);


function init() {
  buildGrid();
  let direction = chooseRandomDirection();
  let nextIndex = chooseRandomIndex();
  let $length = 750;

  setInterval(() => {
    // Remove duplication
    const width      = 40;
    const $start     = $($('li')[nextIndex]);

    $start.addClass('snake').delay($length).queue(function() {
      $(this).removeClass('snake').dequeue();
    });
    if ($start.hasClass('food')) {
      $start.removeClass('food');
      $length = $length * 1.15;
      console.log('feed me');
    }

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

  $(document).keydown(function(e) {
    console.log(e.which);
    switch(e.which) {
      case 37: // left
        direction = 'W';
        break;
      case 38: // up
        direction = 'N';
        break;
      case 39: // right
        direction = 'E';
        break;
      case 40: // down
        direction = 'S';
        break;
      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  setInterval(() => {
    dropFood();
  }, 8000);
}


function buildGrid() {
  const $body = $('body');
  const $grid = $('<ul class="grid"></ul>');
  const width = 40;
  $body.append($grid);
  for (let i = 0; i < width*width; i++) {
    $grid.append('<li></li>');
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
  let $foodCell    = $($('li')[foodIndex]);
  $foodCell.addClass('food').delay(7000).queue(function() {
    $(this).removeClass('food').dequeue();
  });
  if ($foodCell.hasClass('snake')) {
    foodIndex = Math.floor(Math.random() * gridArray.length);
    $foodCell = $($('li')[foodIndex]);
    console.log('snake');
  } else {
    $foodCell.addClass('food');
    console.log('food yo');
  }
}
