/*
--- Part Two ---
You quickly reach the farthest point of the loop, but the animal never emerges. Maybe its nest is within the area enclosed by the loop?

To determine whether it's even worth taking the time to search for such a nest, you should calculate how many tiles are contained within the loop. For example:

...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
The above loop encloses merely four tiles - the two pairs of . in the southwest and southeast (marked I below). The middle . tiles (marked O below) are not in the loop. Here is the same loop again with those regions marked:

...........
.S-------7.
.|F-----7|.
.||OOOOO||.
.||OOOOO||.
.|L-7OF-J|.
.|II|O|II|.
.L--JOL--J.
.....O.....
In fact, there doesn't even need to be a full tile path to the outside for tiles to count as outside the loop - squeezing between pipes is also allowed! Here, I is still within the loop and O is still outside the loop:

..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........
In both of the above examples, 4 tiles are enclosed by the loop.

Here's a larger example:

.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
The above sketch has many random bits of ground, some of which are in the loop (I) and some of which are outside it (O):

OF----7F7F7F7F-7OOOO
O|F--7||||||||FJOOOO
O||OFJ||||||||L7OOOO
FJL7L7LJLJ||LJIL-7OO
L--JOL7IIILJS7F-7L7O
OOOOF-JIIF7FJ|L7L7L7
OOOOL7IF7||L7|IL7L7|
OOOOO|FJLJ|FJ|F7|OLJ
OOOOFJL-7O||O||||OOO
OOOOL---JOLJOLJLJOOO
In this larger example, 8 tiles are enclosed by the loop.

Any tile that isn't part of the main loop can count as being enclosed by the loop. Here's another example with many bits of junk pipe lying around that aren't connected to the main loop at all:

FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
Here are just the tiles that are enclosed by the loop marked with I:

FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
In this last example, 10 tiles are enclosed by the loop.

Figure out whether you have time to search for the nest by calculating the area within the loop. How many tiles are enclosed by the loop?
*/

const R = require('ramda');

const data = require('./data');
const sampleData2 = require('./sampleData2');
const sampleData3 = require('./sampleData3');
const sampleData4 = require('./sampleData4');

const pipeMap = {
  'S': { north: true, south: true, east: true, west: true, vertical: false, horizontal: false },
  '|': { north: true, south: true, east: false, west: false, vertical: true, horizontal: false },
  '-': { north: false, south: false, east: true, west: true, vertical: false, horizontal: true },
  'F': { north: false, south: true, east: true, west: false, vertical: false, horizontal: false },
  '7': { north: false, south: true, east: false, west: true, vertical: false, horizontal: false },
  'J': { north: true, south: false, east: false, west: true, vertical: false, horizontal: false },
  'L': { north: true, south: false, east: true, west: false, vertical: false, horizontal: false },
  '.': { north: false, south: false, east: false, west: false, vertical: false, horizontal: false },
};

function findStart(map) {
  let startLocation;

  map.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === 'S') startLocation = { row: rowIndex, column: columnIndex };
    });
  });

  return startLocation;
}

const isPrev = (prev = {}, row, column) => prev.row === row && prev.column === column;

function findNextPipe(map, current, prev) {
  const currentPipe = map[current.row][current.column];

  const north = map[current.row - 1] && map[current.row - 1][current.column];
  // check north
  if (
    !isPrev(prev, current.row - 1, current.column)
    && pipeMap[currentPipe]?.north === true
    && pipeMap[north]?.south === true
  ) {
    return {
      nextPipe: { row: current.row - 1, column: current.column },
      prevPipe: current,
    };
  }

  const east = map[current.row] && map[current.row][current.column + 1];
  // check east
  if (
    !isPrev(prev, current.row, current.column + 1)
    && pipeMap[currentPipe]?.east === true
    && pipeMap[east]?.west === true
    ) {
    return {
      nextPipe: { row: current.row, column: current.column + 1 },
      prevPipe: current,
    };
  }

  const south = map[current.row + 1] && map[current.row + 1][current.column];
  // check south
  if (
    !isPrev(prev, current.row + 1, current.column)
    && pipeMap[currentPipe]?.south === true
    && pipeMap[south]?.north === true
  ) {
    return {
      nextPipe: { row: current.row + 1, column: current.column },
      prevPipe: current,
    };
  }

  const west = map[current.row] && map[current.row][current.column - 1];
  // check west
  if (
    !isPrev(prev, current.row, current.column - 1)
    && pipeMap[currentPipe]?.west === true
    && pipeMap[west]?.east === true
  ) {
    return {
      nextPipe: { row: current.row, column: current.column - 1 },
      prevPipe: current,
    };
  }
}

function findPath(map, start) {
  let path = [];
  let currentPipe = start;
  let previousPipe;

  do {
    const { nextPipe, prevPipe } = findNextPipe(map, currentPipe, previousPipe);

    currentPipe = nextPipe;
    previousPipe = prevPipe;
    path.push(nextPipe);
  } while(!(currentPipe.row === start.row && currentPipe.column === start.column))

  return path;
}

function calculateResult(data) {
  const map = data.split('\n').map(row => row.split(''));
  const start = findStart(map);

  const path = findPath(map, start);

  console.log('path', path);

  let outsideLeft = false;
  let outsideTop = false;

  map.forEach((row, i) => {
    let foundRow = false;
    row.forEach((column, j) => {
      if (R.includes({ row: i, column: j }, path)) {
        const cell = pipeMap[column];
        if (!foundRow) {
          foundRow = true;
          outsideTop = !outsideTop;
        }
        if (!cell.horizontal) {

        }

      }
    });
  })

  // path.forEach(({ row, column }) => map[row][column] = 'X');

}

const result = calculateResult(sampleData2); // => 4
// const result = calculateResult(sampleData3); // => 4
// const result = calculateResult(sampleData4); // => 4
// const result = calculateResult(data); // =>






