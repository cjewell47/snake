
$(init);

// it goes back on itself and dies in the first game.

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

let foodDur = 7000;
let foodDropDur = 8000;

function start() {
  buildGrid();
  $intro.remove();
  $death.remove();
  $('.score').text(`Score: 0`);
  let direction     = chooseRandomDirection();
  disabledDirection = possibleDirections[direction];
  let firstIndex    = chooseRandomIndex();
  let $length       = 400;
  let count         = 1;
  let nextIndex;

  while ($($('li')[firstIndex]).hasClass('border') || $($('li')[firstIndex]).hasClass('wall')) {
    firstIndex = chooseRandomIndex();
  }
  nextIndex = firstIndex;

  if (count > 15) {
    foodDur = 5000;
    foodDropDur = 6000;
  } else if (count > 25) {
    foodDur = 3500;
    foodDropDur = 4500;
  } else if (count > 35) {
    foodDur = 3000;
    foodDropDur = 4000;
  }

  const food = setInterval(() => {
    dropFood();
  }, foodDropDur);

  const $movement = setInterval(() => {
    // Remove duplication
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
    console.log(direction, disabledDirection, possibleDirections[direction]);
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
  }, foodDur);
}
