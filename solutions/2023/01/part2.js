/*
--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
*/

const numberMap = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const sampleData = require('./sampleData2');
const data = require('./data');

function findNumber(line, i) {
  if (/^[0-9]*$/.test(line[i])) return line[i];

  for (const key in numberMap) {
    if (line.slice(i, key.length + i) === key) {
      return numberMap[key];
    }
  }
}

function findLeftValue(line) {
  for (let i = 0; i <= line.length; i++) {
    const num = findNumber(line, i);
    if (num) return num;
  }
}

function findRightValue(line) {
  for (let i = line.length - 1; i >= 0; i--) {
    const num = findNumber(line, i);
    if (num) return num;
  }
}

function calibrateValue(line) {

  const leftValue = findLeftValue(line);
  const rightValue = findRightValue(line);

  return Number(leftValue + rightValue);
}

function calibrateDocument(data) {
  const lines = data.split('\n');

  const values = lines.map(calibrateValue);

  return values.reduce((prev, curr) => prev + curr, 0);
}

calibrateDocument(sampleData); // => 281
calibrateDocument(data); // => 53340
