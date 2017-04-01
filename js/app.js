// The snake moves at an interval of 0.3 seconds, in one direction until another arrow key is pressed.

// The game ends and the interval timer stops when the snake hits the edge, this is achieved as the border are 'cells' in the grid and if the snake head enters these cells, movement stops and the game ends.
// When the snake hits the food block, the tail of the snake passes over it and now the block becomes the tail. The snake is an array of cells, and once the tail of the snake passes the array is lengthened.

// Corners? When an arrow key is pressed and the snake turns the head turns and the body follows as the redirection lasts for as many intervals as the length ofthe snake.

//Hitting itself? when snake from a direction other than the one it is moving from, then the interval timer stops and the game ends.

// cells have a background color on a timer that fades out.

(() => {

  function start() {

    console.log('yo');

    // $('.row4 .col4').attr('id', 'snake');

  }


  $(document).bind('keyup', function (e){
    if (e.which===37) {
      $(start);
    }
    if (e.which===38) {
      $(start);
    }
    if (e.which===39) {
      $(start);
    }
    if (e.which===40) {
      $(start);
    }

  });

});
