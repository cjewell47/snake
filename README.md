# wdi-project-1
My first project for WDI London

![Screenshot of snake](http://i65.tinypic.com/10dz8tv.png)
# Snake!

For my first project on GA London's WDI course I created the classic one player game Snake. The game can be played here: https://stormy-forest-65305.herokuapp.com/

## How to play

The snake is continually moving, the player directs the snake around the grid with the arrow keys. If the snake collides with the wall or with itself it dies. Food appears on grid at timed intervals, when the player directs the snake into the food the player gains 1 point and the snake grows one cell longer. There are three speeds or difficulties the player can select to play the game, fast, medium and slow.

![screenshot of the difficulty selection menu](http://i63.tinypic.com/2m7vytt.png)


## Project Brief

1. Create a game utilising our 2 weeks of knowledge on HTML, CSS and JavaScript.
2. The game should be sufficiently challenging to create
3. Built the game using object orientated programming if possible.

## How it was built

### The grid

The grid was created dynamically in Javascript, it is a unordered list of 1600 li's (the width of the grid is 40).

```javascript
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
```
The wall around the grid is 1 'cell' thick, and there is a border of 5 'cells' in which the Snake can't spawn.

### The snake

The snake is a list item or 'cell' within the grid with a class of the snake, the class is removed on a delay which has a time set to a variable of **length**. The snake moves to adjacent cells on an interval that has a time set to a variable of **speed**. For each difficulty the **length** variable begins at 4 times the **speed** variable, giving the snake a starting length of 4 cells.

The snake has a starting position that is selected randomly from the total index of list items.

```js
game.chooseRandomIndex = function chooseRandomIndex() {
  const gridArray = $('li');
  return Math.floor(Math.random() * gridArray.length);
};
```
It cannot spawn within the wall or border. If the randomly selected index corresponds to a cell which has a class of border or wall, another random index is generated.

### Moving the snake

A random starting direction is selected as the game begins. The movement for each direction is generated using the index of the list items, **nextIndex** is a variable that is reassigned during each interval.

```js
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
```

These directions, labelled 'N', 'E', 'S' and 'W', are controlled using an event listener function. 

```js
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

```
One issue encountered here was preventing the snake from turning into itself i.e. if the snake was travelling left then it should not be able to turn right, as it would collide with itself and die.

This was tackled by creating a **disabledDirection** variable that was assigned to the opposite direction in which the snake was moving. If the **newDirection** was equal to the **disabledDirection** then the **newDirection** was not assigned to **direction**.

### Dying

Death was achieved by invoking the die function whenever the nextIndex list item (that is the cell in which the snake is entering) has a class of snake or wall.

```js
this.die = function die() {
      clearInterval($movement);
      clearInterval(food);
      $('li').removeClass('snake');
      $('.grid').remove();
      this.death();
    };
```
This would clear all of the intervals, and remove the grid, and invoke the death function, which would display a message and another menu.

### Eating and growing

Food is generated on a random 'cell' in the grid at timed intervals. Similarly to the snake's starting position, it cannot be generated in a 'cell' with a class of wall, it also cannot be generated in a 'cell' with a class of 'snake'.

When the the nextIndex list item has a class of food, the eat function is invoked.

```js this.eat = function eat() {
      this.$foodCell.removeClass('food');
      $('.score').text(`Score: ${count++}`);
      this.$length = this.$length * (1 + (this.speed/this.$length));
    };
```
This increases the score, and grows the snake by one 'cell'. This is achieved by multiplying its length (that is the amount of the time the 'snake' class lasts on one 'cell') by (1 + (speed/length)).

### Libraries

jQuery (https://code.jquery.com/jquery-3.2.1.js)

Google Fonts (https://fonts.googleapis.com/css?family=Press+Start+2P|Varela+Round)

## Credit

Thanks to the GA instructors Alex Chin and Rane Gowan, and the TA's Natalie Huitson and Ed Compton.       



 