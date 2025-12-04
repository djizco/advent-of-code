/*
--- Day 4: Printing Department ---
You ride the escalator down to the printing department. They're clearly getting ready for Christmas; they have lots of large rolls of paper everywhere, and there's even a massive printer in the corner (to handle the really big print jobs).

Decorating here will be easy: they can make their own decorations. What you really need is a way to get further into the North Pole base while the elevators are offline.

"Actually, maybe we can help with that," one of the Elves replies when you ask for help. "We're pretty sure there's a cafeteria on the other side of the back wall. If we could break through the wall, you'd be able to keep moving. It's too bad all of our forklifts are so busy moving those big rolls of paper around."

If you can optimize the work the forklifts are doing, maybe they would have time to spare to break through the wall.

The rolls of paper (@) are arranged on a large grid; the Elves even have a helpful diagram (your puzzle input) indicating where everything is located.

For example:

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
The forklifts can only access a roll of paper if there are fewer than four rolls of paper in the eight adjacent positions. If you can figure out which rolls of paper the forklifts can access, they'll spend less time looking and more time breaking down the wall to the cafeteria.

In this example, there are 13 rolls of paper that can be accessed by a forklift (marked with x):

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
Consider your complete diagram of the paper roll locations. How many rolls of paper can be accessed by a forklift?
*/
const sampleData = require('./sampleData');
const data = require('./data');

function calculateAcessibleRolls(data) {
  const rows = data.split('\n');
  let accessibleRolls = 0;

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

      if (adjacentRolls < 4 && cell === '@') accessibleRolls++;
    }
  }

  return accessibleRolls;
}

calculateAcessibleRolls(sampleData); // => 13
calculateAcessibleRolls(data); // => 1505
