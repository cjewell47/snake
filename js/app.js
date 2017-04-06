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
// game.foodDur;
// game.foodDropDur;
game.direction;
// game.menuBoxIndex = -1;
game.$intro = $('<h2 class="intro">Select your difficulty to start!</h2>');
game.$death = $('<h2 class="intro">You died! Select your difficulty to restart!</h2>');
game.width = 40;
// game.speed;
// game.$length;

game.init = function init() {
  $('body').append(this.$intro);
  this.buildMenu();
  $('body').append(this.$menu);
  const menu = $('.menu_box');
  this.menuSelected;

  $(document).keyup((e) => {
    if(e.which === 40) {
      if(this.menuSelected) {
        console.log('this.menuSelect', this.menuSelected);
        this.menuSelected.removeClass('selected');
        const next = this.menuSelected.next();
        if(next.length > 0){
          this.menuSelected = next.addClass('selected');
        } else {
          this.menuSelected = menu.eq(0).addClass('selected');
        }
      } else {
        this.menuSelected = menu.eq(0).addClass('selected');
      }
    } else if(e.which === 38) {
      console.log('this.menuSelect', this.menuSelected);
      if(this.menuSelected) {
        this.menuSelected.removeClass('selected');
        const next = this.menuSelected.prev();
        if(next.length > 0) {
          this.menuSelected = next.addClass('selected');
        } else {
          this.menuSelected = menu.last().addClass('selected');
        }
      } else {
        this.menuSelected = menu.last().addClass('selected');
      }
    } else if (e.which === 13) {
      e.preventDefault();
      $('.menu_box').each(() => {
        if ($('.selected').is('#slow')) {
          this.speed = 200;
          this.$length = 800;
          game.foodDur = 14000;
          game.foodDropDur = 18000;
          this.start();
          $(document).off('keyup');
        } else if ($('.selected').is('#medium')) {
          this.speed = 100;
          this.$length = 400;
          game.foodDur = 7000;
          game.foodDropDur = 8000;
          this.start();
          $(document).off('keyup');
        } else if ($('.selected').is('#fast')) {
          this.speed = 50;
          this.$length = 200;
          game.foodDur = 3500;
          game.foodDropDur = 4000;
          this.start();
          $(document).off('keyup');
        } else {
          return;
        }
      });
    }
  });
  // $(document).keyup((e) => {
  //   (e.which === 13);
  //   e.preventDefault();
  //   switch($('.selected')) {
  //     case $('#slow.selected'):
  //       this.speed = 200;
  //       this.$length = 800;
  //       game.foodDur = 14000;
  //       game.foodDropDur = 18000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     case ('#medium.selected'):
  //       this.speed = 100;
  //       this.$length = 400;
  //       game.foodDur = 7000;
  //       game.foodDropDur = 8000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     case ('#fast.selected'):
  //       this.speed = 50;
  //       this.$length = 200;
  //       game.foodDur = 3500;
  //       game.foodDropDur = 4000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     default: return;
  //   }




  // $('#search').keyup(function(e) {
  //   if(e.keyCode === 40) {
  //     this.navigate(1);
  //   }
  //   if(e.keyCode===38) {
  //     this.navigate(-1);
  //   }
  // });



  // $(document).keyup((e) => {
  //   e.preventDefault();
  //   switch(e.which) {
  //     case 65:
  //       this.speed = 200;
  //       this.$length = 800;
  //       game.foodDur = 14000;
  //       game.foodDropDur = 18000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     case 66:
  //       this.speed = 100;
  //       this.$length = 400;
  //       game.foodDur = 7000;
  //       game.foodDropDur = 8000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     case 67:
  //       this.speed = 50;
  //       this.$length = 200;
  //       game.foodDur = 3500;
  //       game.foodDropDur = 4000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     default: return;
  //   }
  // });
};

game.death = function death() {
  $('body').append(this.$death);
  this.buildMenu();
  $('body').append(this.$menu);
  const menu = $('.menu_box');
  this.menuSelected;

  $(document).keyup((e) => {
    if(e.which === 40) {
      if(this.menuSelected) {
        console.log('this.menuSelect', this.menuSelected);
        this.menuSelected.removeClass('selected');
        const next = this.menuSelected.next();
        if(next.length > 0){
          this.menuSelected = next.addClass('selected');
        } else {
          this.menuSelected = menu.eq(0).addClass('selected');
        }
      } else {
        this.menuSelected = menu.eq(0).addClass('selected');
      }
    } else if(e.which === 38) {
      console.log('this.menuSelect', this.menuSelected);
      if(this.menuSelected) {
        this.menuSelected.removeClass('selected');
        const next = this.menuSelected.prev();
        if(next.length > 0) {
          this.menuSelected = next.addClass('selected');
        } else {
          this.menuSelected = menu.last().addClass('selected');
        }
      } else {
        this.menuSelected = menu.last().addClass('selected');
      }
    } else if (e.which === 13) {
      e.preventDefault();
      $('.menu_box').each(() => {
        if ($('.selected').is('#slow')) {
          this.speed = 200;
          this.$length = 800;
          game.foodDur = 14000;
          game.foodDropDur = 18000;
          this.start();
          $(document).off('keyup');
        } else if ($('.selected').is('#medium')) {
          this.speed = 100;
          this.$length = 400;
          game.foodDur = 7000;
          game.foodDropDur = 8000;
          this.start();
          $(document).off('keyup');
        } else if ($('.selected').is('#fast')) {
          this.speed = 50;
          this.$length = 200;
          game.foodDur = 3500;
          game.foodDropDur = 4000;
          this.start();
          $(document).off('keyup');
        } else {
          return;
        }
      });
    }
  });
  // $(document).keyup((e) => {
  //   e.preventDefault();
  //   switch(e.which) {
  //     case 65:
  //       this.speed = 200;
  //       this.$length = 800;
  //       game.foodDur = 14000;
  //       game.foodDropDur = 18000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     case 66:
  //       this.speed = 100;
  //       this.$length = 400;
  //       game.foodDur = 7000;
  //       game.foodDropDur = 8000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     case 67:
  //       this.speed = 50;
  //       this.$length = 200;
  //       game.foodDur = 3500;
  //       game.foodDropDur = 4000;
  //       this.start();
  //       $(document).off('keyup');
  //       break;
  //     default: return;
  //   }
  // });
};

game.start = function start() {
  this.buildGrid();
  this.$intro.remove();
  this.$death.remove();
  this.$menu.remove();
  $('.score').text(`Score: 0`);
  game.direction         = this.chooseRandomDirection();
  game.disabledDirection = this.possibleDirections[game.direction];
  let firstIndex    = this.chooseRandomIndex();
  let count         = 1;
  let nextIndex;

  while ($($('li')[firstIndex]).hasClass('border') || $($('li')[firstIndex]).hasClass('wall')) {
    firstIndex = this.chooseRandomIndex();
  }
  nextIndex = firstIndex;

  // if (count > 15) {
  //   this.foodDur = this.foodDur * 0.85;
  //   this.foodDropDur = this.foodDropDur * 85;
  // } else if (count > 25) {
  //   this.foodDur = this.foodDur * 0.85;
  //   this.foodDropDur = this.foodDropDur * 85;
  // } else if (count > 35) {
  //   this.foodDur = this.foodDur * 0.85;
  //   this.foodDropDur = this.foodDropDur * 85;
  // }

  const food = setInterval(() => {
    this.dropFood();
  }, this.foodDropDur);

  const $movement = setInterval(() => {
    // Remove duplication
    const $start     = $($('li')[nextIndex]);

    console.log('speed', this.speed);
    console.log('length', this.$length);
    // console.log('drop', this.foodDur );
    // console.log('drop int', this.foodDropDur);


    if ($start.hasClass('snake')) {
      this.die();
    }

    $start.addClass('snake').delay(this.$length).queue(function() {
      $(this).removeClass('snake').dequeue();
    });

    if ($start.hasClass('food')) {
      this.eat();
    }

    if ($start.hasClass('wall')) {
      this.die();
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
      this.$length = this.$length * (1 + (this.speed/this.$length));
    };

    this.die = function die() {
      clearInterval($movement);
      clearInterval(food);
      $('li').removeClass('snake');
      $('.grid').remove();
      this.death();
    };
  }, this.speed);

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

    if (newDirection === this.disabledDirection) {
      return;
    } else {
      this.direction = newDirection;
      this.disabledDirection = this.possibleDirections[newDirection];
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
    } else if (i <= 239 || i % 40 < 6 || (i > 1360) || i % 40 > 33) {
      $grid.append(`<li class="border"></li>`);
    } else {
      $grid.append(`<li></li>`);
    }
  }
};

game.buildMenu = function buildMenu() {
  // this.$input = $('<input type="submit" id="search" />');
  this.$menu = $('<div id="menu"></div>');
  this.$menu.append('<div id="slow" class="menu_box">Slow</div>');
  this.$menu.append('<div id="medium" class="menu_box">Medium</div>');
  this.$menu.append('<div id="fast" class="menu_box">Fast</div>');
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
  this.foodIndex   = Math.floor(Math.random() * gridArray.length);
  this.$foodCell   = $($('li')[this.foodIndex]);

  while (this.$foodCell.hasClass('snake') || this.$foodCell.hasClass('wall')) {
    this.foodIndex = Math.floor(Math.random() * gridArray.length);
    this.$foodCell = $($('li')[this.foodIndex]);
  }
  this.$foodCell.addClass('food');
  setTimeout(() => {
    if (this.$foodCell.hasClass('food')) this.$foodCell.removeClass('food');
  }, this.foodDur);
};

// game.navigate = function navigate(diff) {
//   this.menuBoxIndex += diff;
//   const menuBoxes = $('.menu_box');
//   if (this.menuBoxIndex >= menuBoxes.length) {
//     this.menuBoxIndex = 0;
//   }
//   if (this.menuBoxIndex < 0) {
//     this.menuBoxIndex = menuBoxes.length - 1;
//   }
//   const cssClass = 'menu_box_hover';
//   menuBoxes.removeClass(cssClass).eq(this.menuBoxIndex).addClass(cssClass);
// };

$(game.init.bind(game));
