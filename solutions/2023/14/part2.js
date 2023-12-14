/*
--- Part Two ---
The parabolic reflector dish deforms, but not in a way that focuses the beam. To do that, you'll need to move the rocks to the edges of the platform. Fortunately, a button on the side of the control panel labeled "spin cycle" attempts to do just that!

Each cycle tilts the platform four times so that the rounded rocks roll north, then west, then south, then east. After each tilt, the rounded rocks roll as far as they can before the platform tilts in the next direction. After one cycle, the platform will have finished rolling the rounded rocks in those four directions in that order.

Here's what happens in the example above after each of the first few cycles:

After 1 cycle:
.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....

After 2 cycles:
.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O

After 3 cycles:
.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O
This process should work if you leave it running long enough, but you're still worried about the north support beams. To make sure they'll survive for a while, you need to calculate the total load on the north support beams after 1000000000 cycles.

In the above example, after 1000000000 cycles, the total load on the north support beams is 64.

Run the spin cycle for 1000000000 cycles. Afterward, what is the total load on the north support beams?
*/

const R = require('ramda');

const data = require('./data');
const sampleData = require('./sampleData');

function calculateResult(data) {
  const platform  = data.split('\n').map(row => row.split(''));

  function slideNorth() {
    platform.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 'O') {
          let currentRow = i;

          while (platform[currentRow - 1] && platform[currentRow - 1][j] === '.') {
            platform[currentRow - 1][j] = 'O';
            platform[currentRow][j] = '.';
            currentRow--;
          }
        }
      });
    });
  }

  function slideSouth() {
    [...platform].reverse().forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 'O') {
          let currentRow = platform.length - 1 - i;

          while (platform[currentRow + 1] && platform[currentRow + 1][j] === '.') {
            platform[currentRow + 1][j] = 'O';
            platform[currentRow][j] = '.';
            currentRow++;
          }
        }
      });
    });
  }

  function slideWest() {
    for (let j = 0; j < platform[0].length; j++) {
      for (let i = 0; i < platform.length; i++) {
        const cell = platform[i][j];

        if (cell === 'O') {
          let currentColumn = j;

          while (platform[i][currentColumn - 1] === '.') {
            platform[i][currentColumn - 1] = 'O';
            platform[i][currentColumn] = '.';
            currentColumn--;
          }
        }
      }
    }
  }

  function slideEast() {
    for (let j = platform[0].length - 1; j >= 0; j--) {
      for (let i = 0; i < platform.length; i++) {
        const cell = platform[i][j];

        if (cell === 'O') {
          let currentColumn = j;

          while (platform[i][currentColumn + 1] === '.') {
            platform[i][currentColumn + 1] = 'O';
            platform[i][currentColumn] = '.';
            currentColumn++;
          }
        }
      }
    }
  }

  function cycle() {
    slideNorth();
    slideWest();
    slideSouth();
    slideEast();
  }

  for (let i = 0; i < 1000; i++) {
    cycle();
  }

  return platform.reduce((prev, curr, i) => {
    const rowValue = platform.length - i;
    const count = R.count(x => x === 'O', curr);
    const rowTotal = rowValue * count;

    return prev + rowTotal;
  }, 0);
}

calculateResult(sampleData); // => 64
calculateResult(data); // => 102509
