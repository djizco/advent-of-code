/*
--- Part Two ---
The galaxies are much older (and thus much farther apart) than the researcher initially estimated.

(In the example above, if each empty row or column were merely 10 times larger, the sum of the shortest paths between every pair of galaxies would be 1030. If each empty row or column were merely 100 times larger, the sum of the shortest paths between every pair of galaxies would be 8410. However, your universe will need to expand far beyond these values.)

Starting with the same initial image, expand the universe according to these new rules, then find the length of the shortest path between every pair of galaxies. What is the sum of these lengths?
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
    const emptyRow = Array(universe[0].length).fill('x');

    universe.splice(row, 0, emptyRow);
  });

  // Add Cols
  universe.forEach((row, i) => {
    emptyColumns.forEach(col => {
      universe[i].splice(col, 0, 'x');
    });
  });

  return universe;
}

function findDistance(universe, galaxyA, galaxyB, expansionFactor) {
  let verticalDistance = Math.abs(galaxyA[0] - galaxyB[0]);
  let horizontalDistance = Math.abs(galaxyA[1] - galaxyB[1]);

  for (let i = galaxyA[0]; i <= galaxyB[0]; i++) {
    if (universe[i][galaxyA[1]] === 'x') verticalDistance += expansionFactor;
  }

  const left = Math.min(galaxyA[1], galaxyB[1]);
  const right = Math.max(galaxyA[1], galaxyB[1]);

  for (let j = left; j <= right; j++) {
    if (universe[galaxyB[0]][j] === 'x') horizontalDistance += expansionFactor;
  }

  return verticalDistance + horizontalDistance;
}

function calculateResult(data, expansionFactor = 8) {
  const universe = data.split('\n').map(row => row.split(''));
  const expandedUniverse = expandUniverse(universe);
  const galaxyLocations = findGalaxies(expandedUniverse);

  const distances = [];

  for (let i = 0; i < galaxyLocations.length; i++) {
    for (let j = i + 1; j < galaxyLocations.length; j++) {
      distances.push(findDistance(expandedUniverse, galaxyLocations[i], galaxyLocations[j]), expansionFactor);
    }
  }

  return R.sum(distances);
}

calculateResult(sampleData, 98); // => 8410 (98 factor)
calculateResult(data, 999998); // => 611998089572 (999998 factor)
