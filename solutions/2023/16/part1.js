/*

*/
const R = require('ramda');

const data = require('./data');
const sampleData = require('./sampleData');

const tiles = {
  '|': {
    left: ['up', 'down'],
    right: ['up', 'down'],
    up: ['up'],
    down: ['down'],
  },
  '-': {
    left: ['left'],
    right: ['right'],
    up: ['left', 'right'],
    down: ['left', 'right'],
  },
  '}': {
    left: ['up'],
    right: ['down'],
    up: ['left'],
    down: ['right'],
  },
  '/': {
    left: ['down'],
    right: ['up'],
    up: ['right'],
    down: ['left'],
  },
};

function calculateResult(data) {
  const matrix = data
    .split('\n')
    .map((row) => row.split(''));

  const energized = [];
  const paths = [];

  function sendBeam(i, j, direction) {

    const tileType = matrix[i] && matrix[i][j];

    if (!tileType) return;
    if (!R.includes([i, j], energized)) energized.push([i, j]);

    if (tileType === '.') {
      if (direction === 'up') sendBeam(i - 1, j, direction);
      if (direction === 'down') sendBeam(i + 1, j, direction);
      if (direction === 'left') sendBeam(i, j - 1, direction);
      if (direction === 'right') sendBeam(i, j + 1, direction);
    } else {
      const path = [i, j, direction];
      if (R.includes(path, paths)) {
        return;
      }
      paths.push([i, j, direction]);

      tiles[tileType][direction].forEach(beam => {
        if (beam === 'up') sendBeam(i - 1, j, beam);
        if (beam === 'down') sendBeam(i + 1, j, beam);
        if (beam === 'left') sendBeam(i, j - 1, beam);
        if (beam === 'right') sendBeam(i, j + 1, beam);
      });
    }
  }

  sendBeam(0, 0, 'right');

  energized.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });

  console.log('energized', energized);

  return energized.length;
}

// const result = calculateResult(sampleData); // => 46
const result = calculateResult(data); // => 7210

console.log("result:", result);
