/*
--- Part Two ---
Now, the Elves just need help accessing as much of the paper as they can.

Once a roll of paper can be accessed by a forklift, it can be removed. Once a roll of paper is removed, the forklifts might be able to access more rolls of paper, which they might also be able to remove. How many total rolls of paper could the Elves remove if they keep repeating this process?

Starting with the same example as above, here is one way you could remove as many rolls of paper as possible, using highlighted @ to indicate that a roll of paper is about to be removed, and using x to indicate that a roll of paper was just removed:

Initial state:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

Remove 13 rolls of paper:
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.

Remove 12 rolls of paper:
.......x..
.@@.x.x.@x
x@@@@...@@
x.@@@@..x.
.@.@@@@.x.
.x@@@@@@.x
.x.@.@.@@@
..@@@.@@@@
.x@@@@@@@.
....@@@...

Remove 7 rolls of paper:
..........
.x@.....x.
.@@@@...xx
..@@@@....
.x.@@@@...
..@@@@@@..
...@.@.@@x
..@@@.@@@@
..x@@@@@@.
....@@@...

Remove 5 rolls of paper:
..........
..x.......
.x@@@.....
..@@@@....
...@@@@...
..x@@@@@..
...@.@.@@.
..x@@.@@@x
...@@@@@@.
....@@@...

Remove 2 rolls of paper:
..........
..........
..x@@.....
..@@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@x.
....@@@...

Remove 1 roll of paper:
..........
..........
...@@.....
..x@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
...x@.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
....x.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
..........
...x@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...
Stop once no more rolls of paper are accessible by a forklift. In this example, a total of 43 rolls of paper can be removed.

Start with your original diagram. How many rolls of paper in total can be removed by the Elves and their forklifts?
*/
const R = require('ramda');

const sampleData = require('./sampleData');
const data = require('./data');

function calculateAccessibleRolls(rows) {
  const accessibleRolls = [];

  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < rows[row].length; column++) {
      let adjacentRolls = 0;
      const cell = rows[row][column];

      const findAdject = (x, y) => {
        if (rows[x] && rows[x][y] === '@') adjacentRolls++;
      };

      if (cell === '@') {
        findAdject(row - 1, column - 1); // Top Left
        findAdject(row - 1, column); // Top Center
        findAdject(row - 1, column + 1); // Top Right
        findAdject(row, column - 1); // Left
        findAdject(row, column + 1); // Right
        findAdject(row + 1, column - 1); // Bottom Left
        findAdject(row + 1, column); // Bottom Center
        findAdject(row + 1, column + 1); // Bottom Right
      }

      if (adjacentRolls < 4 && cell === '@') {
        accessibleRolls.push({ row, column });
      }
    }
  }
  return accessibleRolls;
}

function calculateRemovableRolls(data) {
  const rows = data.split('\n').map(R.split(''));
  let total = 0;

  function removeAcessibleRolls() {
    const accessibleRolls = calculateAccessibleRolls(rows);

    if (accessibleRolls.length) {
      total += accessibleRolls.length;

      // Mark all acessible rows as x
      accessibleRolls.forEach(({ row, column }) => {
        rows[row][column] = 'x';
      });

      // Keep looping until there are no more acessible rolls
      removeAcessibleRolls(rows);
    }
  }

  removeAcessibleRolls(rows);

  return total;
}

calculateRemovableRolls(sampleData); // => 43
calculateRemovableRolls(data); // => 9182
