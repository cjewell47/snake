
var game = game || {};

game.possibleDirections = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E'
};

game.disabledDirection;
game.direction;
game.$intro = $('<h2 class="intro">Select your difficulty to start!</h2>');
game.$death = $('<h2 class="intro">You died! Select your difficulty to restart!</h2>');
game.width = 40;


game.init = function init() {
  $('body').append(this.$intro);
  this.selectDifficulty();
};

game.death = function death() {
  $('body').append(this.$death);
  this.selectDifficulty();
};

game.start = function start() {
  this.buildGrid();
  this.$intro.remove();
  this.$death.remove();
  this.$menu.remove();
  $('.score').css({'display': 'block'});
  $('.score').text(`Score: 0`);
  $('h1').css({'margin-bottom': '10px'});
  this.direction         = this.chooseRandomDirection();
  this.disabledDirection = this.possibleDirections[this.direction];
  let firstIndex    = this.chooseRandomIndex();
  let count         = 1;
  let nextIndex;

  while ($($('li')[firstIndex]).hasClass('border') || $($('li')[firstIndex]).hasClass('wall')) {
    firstIndex = this.chooseRandomIndex();
  }
  nextIndex = firstIndex;

  const food = setInterval(() => {
    this.dropFood();
  }, this.foodDropDur);

  const $movement = setInterval(() => {
    const $start     = $($('li')[nextIndex]);

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

    $(document).keydown(this.turn.bind(game));

    switch (this.direction) {
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
      this.$foodCell.removeClass('food');
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

game.selectDifficulty = function selectDifficulty() {
  this.buildMenu();
  $('body').append(this.$menu);
  const menu = $('.menu_box');
  this.menuSelected;

  $(document).keydown((e) => {
    if(e.which === 40) {
      e.preventDefault();
      if(this.menuSelected) {
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
      e.preventDefault();
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
          this.foodDur = 14000;
          this.foodDropDur = 18000;
          this.start();
          $(document).off('keydown');
        } else if ($('.selected').is('#medium')) {
          this.speed = 100;
          this.$length = 400;
          this.foodDur = 7000;
          this.foodDropDur = 8000;
          this.start();
          $(document).off('keydown');
        } else if ($('.selected').is('#fast')) {
          this.speed = 50;
          this.$length = 200;
          this.foodDur = 3500;
          this.foodDropDur = 4000;
          this.start();
          $(document).off('keydown');
        } else {
          return;
        }
      });
    }
  });
};

$(game.init.bind(game));
