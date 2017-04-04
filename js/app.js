// The snake moves at an interval of 0.3 seconds, in one direction until another arrow key is pressed.

// The game ends and the interval timer stops when the snake hits the edge, this is achieved as the border are 'cells' in the grid and if the snake head enters these cells, movement stops and the game ends.
// When the snake hits the food block, the tail of the snake passes over it and now the block becomes the tail. The snake is an array of cells, and once the tail of the snake passes the array is lengthened.

// Corners? When an arrow key is pressed and the snake turns the head turns and the body follows as the redirection lasts for as many intervals as the length ofthe snake.

//Hitting itself? when snake from a direction other than the one it is moving from, then the interval timer stops and the game ends.

// cells have a background color on a timer that fades out.

$(init);

const $intro = $('<h2 class="intro">Press Enter to start!</h2>');
const $death = $('<h2 class="intro">You died! press Enter to restart!</h2>');


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
  let direction   = chooseRandomDirection();
  let nextIndex   = chooseRandomIndex();
  let $length = 750;
  let count = 1;
  const $movement = setInterval(() => {
    // Remove duplication
    const width      = 40;
    const $start     = $($('li')[nextIndex]);

    if ($start.hasClass('snake')) {
      clearInterval($movement);
      clearInterval(food);
      console.log('death');
      $('li').removeClass('snake');
      $('.grid').remove();
      death();
    }
    $start.addClass('snake').delay($length).queue(function() {
      $(this).removeClass('snake').dequeue();
    });
    if ($start.hasClass('food')) {
      $start.removeClass('food');
      $length = $length * 1.15;
      console.log('feed me');
      $('.score').text(`Score: ${count++}`);
    }
    if ($start.hasClass('wall')) {
      clearInterval($movement);
      clearInterval(food);
      console.log('death');
      $('li').removeClass('snake');
      $('.grid').remove();
      death();
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
  const food = setInterval(() => {
    dropFood();
  }, 8000);
}

// $('<div class="row"></div>')

function buildGrid() {
  const $body = $('body');
  const $grid = $('<ul class="grid"></ul>');
  const width = 40;
  let newId   = 1;
  $body.append($grid);
  for (let i = 0; i < width*width; i++) {
    if (i <= 39 || i % 40 === 0 || (i <= 1599 && i >= 1560) || i % 40 === 39) {
      $grid.append(`<li id="${newId}" class="wall"></li>`);
      newId++;
    } else {
      $grid.append(`<li id="${newId}"></li>`);
    }
  }
  // const $cell = $('li');
  // for (let i = 0; i < width; i++) {
  //   $($cell[i]).addClass('wall');
  // }
  // for (let i = width*width - 1; i > width*width - (width + 1); i--) {
  //   $($cell[i]).addClass('wall');
  // }
  // for (let i = 0; i < width; i++) {
  //   $($cell[i * 40]).addClass('wall');
  // }
  // for (let i = 0; i < width; i++) {
  //   $($cell[(i * 40) - 1]).addClass('wall');
  // }
}

function chooseRandomIndex() {
  // const width = 40;
  const gridArray = $('li');
  // const $cell = $('li');
  // for (let i = 0; i < width*4; i++) {
  //   $($cell[i]).addClass('noStart');
  // }
  // for (let i = width*width - 1; i > width*width - ((width*4) + 1); i--) {
  //   $($cell[i]).addClass('noStart');
  // }
  // for (let i = 0; i < width*4; i++) {
  //   $($cell[(i * 40) + i]).addClass('knoStart');
  // }
  // for (let i = 0; i < width*4; i++) {
  //   $($cell[(i * 40) - 1]).addClass('knoStart');
  // }
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
  if ($foodCell.hasClass('snake') || $foodCell.hasClass('wall')) {
    foodIndex = Math.floor(Math.random() * gridArray.length);
    $foodCell = $($('li')[foodIndex]);
    console.log('snake');
    $foodCell.addClass('food').delay(7000).queue(function() {
      $(this).removeClass('food').dequeue();
    });
  } else {
    $foodCell.addClass('food');
    console.log('food yo');
  }
}

// function createScore() {
//   const $body = $('body');
//   const $score = $('');
//   $body.append($score);
// }
