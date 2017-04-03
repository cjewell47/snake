// The snake moves at an interval of 0.3 seconds, in one direction until another arrow key is pressed.

// The game ends and the interval timer stops when the snake hits the edge, this is achieved as the border are 'cells' in the grid and if the snake head enters these cells, movement stops and the game ends.
// When the snake hits the food block, the tail of the snake passes over it and now the block becomes the tail. The snake is an array of cells, and once the tail of the snake passes the array is lengthened.

// Corners? When an arrow key is pressed and the snake turns the head turns and the body follows as the redirection lasts for as many intervals as the length ofthe snake.

//Hitting itself? when snake from a direction other than the one it is moving from, then the interval timer stops and the game ends.

// cells have a background color on a timer that fades out.

// (() => {




  // $(document).keyup(function(e) {
  //   // let speedLeft;
  //   // let speedUp;
  //   // let speedRight;
  //   // let speedDown;
  //   switch(e.which) {
  //     case 37: // left
  //       console.log('left');
  //       $('#grid').find('.cell#head')
  //       .animate({backgroundColor: '#000'}, '0.6')
  //       .animate({backgroundColor: '#fff'}, '1.2');
  //       setTimeout(notHead, 650);
  //       speedLeft = setInterval( function() {
  //         // let leftColn = $('#grid').find('div#head').attr('data-col');
  //         // let leftCol = (leftColn - 1).toString();
  //         // let leftRown = $('#grid').find('div#head').attr('data-row');
  //         // let leftRow = leftRown.toString();
  //         // $(`.cell[data-row=${leftRow}][data-col=${leftCol}]`)
  //         // .attr('id', 'head')
  //         // .animate({backgroundColor: '#000'}, '0.6')
  //         // .animate({backgroundColor: '#fff'}, '1.2');
  //         // setTimeout(notHead, 650);
  //         console.log('yo');
  //       }, 600);
  //       break;
  //     case 38: // up
  //       console.log('up');
  //       // $('#grid').find('div.row8.col8')
  //       // .animate({backgroundColor: '#000'}, '0.6')
  //       // .animate({backgroundColor: '#fff'}, '1.2');
  //       break;
  //     case 39: // right
  //       console.log('right');
  //       // $('#grid').find('div.row8.col8')
  //       // .animate({backgroundColor: '#000'}, '0.6')
  //       // .animate({backgroundColor: '#fff'}, '1.2');
  //       break;
  //     case 40: // down
  //       console.log('down');
  //       // $('#grid').find('div.row8.col8')
  //       // .animate({backgroundColor: '#000'}, '0.9')
  //       // .animate({backgroundColor: '#fff'}, '0.9');
  //       break;
  //     default: return; // exit this handler for other keys
  //   }
  //   e.preventDefault();
  // });

  $(document).keyup(function(e) {
    if(e.which===13) {
      console.log('hey');
      $('#grid').find('.cell.head')
      .animate({backgroundColor: '#000'}, '0.6')
      .animate({backgroundColor: '#fff'}, '1.2');
      setTimeout(notHead, 650);
      setInterval(function() {
    //     // let rightColn = $('#grid').find('.cell.head').attr('data-col');
    //     // let rightCol = (rightColn + 1).toString();
    //     // let rightRown = $('#grid').find('.cell.head').attr('data-row');
    //     // let rightRow = (rightRown).toString();
    //     // $(`.cell[data-row=${rightRow}][data-col=${rightCol}]`)
    //     // .addClass('head')
    //     // .animate({backgroundColor: '#000'}, '0.6')
    //     // .animate({backgroundColor: '#fff'}, '1.2');
    //     // setTimeout(notHead, 600);
        let colNum = $('#grid').find('.cell.head').attr('data-col');
        let rowNum = $('#grid').find('.cell.head').attr('data-row');
        // colNum = colNum.toString();
        // rowNum = rowNum.toString();
        // var prevCell = $(`.cell[data-row="${rowNum}"][data-col="${colNum}"]`);
        let nextCell = $('#grid').find(`.cell[data-row="${rowNum}"][data-col="${colNum}+1"]`);
        setTimeout(nextCell.addClass('head'), 600);
        nextCell.animate({backgroundColor: '#000'}, '0.6')
        .animate({backgroundColor: '#fff'}, '1.2');
        setTimeout(notHead, 1200);
      }, 1000);

      e.preventDefault();
    }

  });

  function notHead() {
    $('.cell.head').removeClass('head');
  }

// });
