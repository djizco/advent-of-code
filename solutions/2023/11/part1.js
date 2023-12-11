/*
--- Day 11: Cosmic Expansion ---
You continue following signs for "Hot Springs" and eventually come across an observatory. The Elf within turns out to be a researcher studying cosmic expansion using the giant telescope here.

He doesn't know anything about the missing machine parts; he's only visiting for this research project. However, he confirms that the hot springs are the next-closest area likely to have people; he'll even take you straight there once he's done with today's observation analysis.

Maybe you can help him with the analysis to speed things up?

The researcher has collected a bunch of data and compiled the data into a single giant image (your puzzle input). The image includes empty space (.) and galaxies (#). For example:

...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
The researcher is trying to figure out the sum of the lengths of the shortest path between every pair of galaxies. However, there's a catch: the universe expanded in the time it took the light from those galaxies to reach the observatory.

Due to something involving gravitational effects, only some space expands. In fact, the result is that any rows or columns that contain no galaxies should all actually be twice as big.

In the above example, three columns and two rows contain no galaxies:

   v  v  v
 ...#......
 .......#..
 #.........
>..........<
 ......#...
 .#........
 .........#
>..........<
 .......#..
 #...#.....
   ^  ^  ^
These rows and columns need to be twice as big; the result of cosmic expansion therefore looks like this:

....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......
Equipped with this expanded universe, the shortest path between every pair of galaxies can be found. It can help to assign every galaxy a unique number:

....1........
.........2...
3............
.............
.............
........4....
.5...........
............6
.............
.............
.........7...
8....9.......
In these 9 galaxies, there are 36 pairs. Only count each pair once; order within the pair doesn't matter. For each pair, find any shortest path between the two galaxies using only steps that move up, down, left, or right exactly one . or # at a time. (The shortest path between two galaxies is allowed to pass through another galaxy.)

For example, here is one of the shortest paths between galaxies 5 and 9:

....1........
.........2...
3............
.............
.............
........4....
.5...........
.##.........6
..##.........
...##........
....##...7...
8....9.......
This path has length 9 because it takes a minimum of nine steps to get from galaxy 5 to galaxy 9 (the eight locations marked # plus the step onto galaxy 9 itself). Here are some other example shortest path lengths:

Between galaxy 1 and galaxy 7: 15
Between galaxy 3 and galaxy 6: 17
Between galaxy 8 and galaxy 9: 5
In this example, after expanding the universe, the sum of the shortest path between all 36 pairs of galaxies is 374.

Expand the universe, then find the length of the shortest path between every pair of galaxies. What is the sum of these lengths?
*/

const R = require('ramda');

const data = require('./data');
const sampleData = require('./sampleData');

function findGalaxies(universe) {
  const galaxyLocations = [];

  universe.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === '#') galaxyLocations.push([i, j]);
    });
  });

  return galaxyLocations;
}

function expandUniverse(universe) {
  const emptyRows = [];
  const emptyColumns = [];

  // Check Rows
  universe.forEach((row, i) => {
    if (row.every(R.equals('.'))) emptyRows.push(i);
  });

  // Check Cols
  for (let j = 0; j < universe[0].length; j++) {
    let every = true;
    for (let i = 0; i < universe.length; i++) {
      if (universe[i][j] === '#') every = false;
    }
    if (every) emptyColumns.push(j);
  }

  emptyRows.reverse();
  emptyColumns.reverse();

  // Add Rows
  emptyRows.forEach(row => {
    const emptyRow = Array(universe[0].length).fill('.');
    universe.splice(row, 0, emptyRow);
  });

  // Add Cols
  universe.forEach((row, i) => {
    emptyColumns.forEach(col => {
      universe[i].splice(col, 0, '.');
    });
  });

  return universe;
}

function findDistance(galaxyA, galaxyB) {
  const distance =  Math.abs(galaxyA[0] - galaxyB[0]) + Math.abs(galaxyA[1] - galaxyB[1]);
  return distance;
}

function calculateResult(data) {
  const universe = data.split('\n').map(row => row.split(''));
  const expandedUniverse = expandUniverse(universe);
  const galaxyLocations = findGalaxies(expandedUniverse);

  const distances = [];

  for (let i = 0; i < galaxyLocations.length; i++) {
    for (let j = i + 1; j < galaxyLocations.length; j++) {
      distances.push(findDistance(galaxyLocations[i], galaxyLocations[j]));
    }
  }

  return R.sum(distances);
}

calculateResult(sampleData); // => 374
calculateResult(data); // => 10313550
