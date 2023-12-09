/*
--- Part Two ---
Of course, it would be nice to have even more history included in your report. Surely it's safe to just extrapolate backwards as well, right?

For each history, repeat the process of finding differences until the sequence of differences is entirely zero. Then, rather than adding a zero to the end and filling in the next values of each previous sequence, you should instead add a zero to the beginning of your sequence of zeroes, then fill in new first values for each previous sequence.

In particular, here is what the third example history looks like when extrapolating back in time:

5  10  13  16  21  30  45
  5   3   3   5   9  15
   -2   0   2   4   6
      2   2   2   2
        0   0   0
Adding the new values on the left side of each sequence from bottom to top eventually reveals the new left-most history value: 5.

Doing this for the remaining example data above results in previous values of -3 for the first history and 0 for the second history. Adding all three new values together produces 2.

Analyze your OASIS report again, this time extrapolating the previous value for each history. What is the sum of these extrapolated values?
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

    const test = currRow[0] - prevRow[0];

    history[i].unshift(test);
  }

  const firstRow = history[0];

  return firstRow[0];
}

function calculateResult(data) {
  const sequences = data.split('\n').map(sequence => sequence.split(' ').map(Number));

  const nextNumbers = sequences.map(findNext);

  return R.sum(nextNumbers);
}

calculateResult(sampleData); // => 2
calculateResult(data); // => 948
