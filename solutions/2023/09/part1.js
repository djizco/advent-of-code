/*

*/
const R = require('ramda');

const data = require('./data');
const sampleData = require('./sampleData');

function findNext(sequence) {
  const history = [sequence];

  while (!history[history.length - 1].every(num => num === 0)) {
    const lastEntry = history[history.length - 1];
    const differences = [];
    for (let i = 0; i < lastEntry.length - 1; i++) {
      differences.push(lastEntry[i + 1] - lastEntry[i]);
    }
    history.push(differences);
  }

  history[history.length - 1].push(0);

  for (let i = history.length - 2; i >= 0; i--) {
    const prevRow = history[i + 1];
    const currRow = history[i];

    const test = prevRow[prevRow.length - 1] + currRow[currRow.length - 1];

    history[i].push(test);
  }

  const firstRow = history[0];

  return firstRow[firstRow.length - 1];
}

function calculateResult(data) {
  const sequences = data.split('\n').map(sequence => sequence.split(' ').map(Number));

  const nextNumbers = sequences.map(findNext);

  return R.sum(nextNumbers);
}

calculateResult(sampleData); // => 114
calculateResult(data); // => 1938731307
