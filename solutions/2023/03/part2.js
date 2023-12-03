/*
--- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?
*/

const R = require('ramda');

const sampleData = require('./sampleData');
const data = require('./data');

function calculateTotal(schematic) {
  const lines = schematic.split('\n').map(line => line.split(''));

  function findLeft(x, y) {
    for (let i = y; i >= 0; i--) {
      if (!/^[0-9]*$/.test(lines[x][i])) {
        return i + 1;
      }
    }
    return 0;
  }

  function findRight(x, y) {
    for (let i = y; i <= lines[x].length - 1; i++) {
      if (!/^[0-9]*$/.test(lines[x][i])) {
        return i + -1;
      }
    }
    return lines[x].length - 1;
  }

  function calculateNumber({ line, start, stop }) {
    let number = '';

    for (let i = start; i <= stop; i++) {
      number += lines[line][i];
    }
    return Number(number);
  }

  function findFullNumber(x, y) {
    const start = findLeft(x, y);
    const stop = findRight(x, y);

    return { line: x, start, stop };
  }

  function findNumber(x, y) {
    if (/^[0-9]*$/.test(lines[x][y])) {
      return findFullNumber(x, y);
    }
  }

  function findNumbers(x, y) {
    const numbers = [];
    const nums = [
      findNumber(x - 1, y - 1),
      findNumber(x - 1, y),
      findNumber(x - 1, y + 1),
      findNumber(x, y - 1),
      findNumber(x, y + 1),
      findNumber(x + 1, y - 1),
      findNumber(x + 1, y),
      findNumber(x + 1, y + 1),
    ];

    nums.forEach(num => {
      if (num && !R.includes(num, numbers)) {
        numbers.push(num);
      }
    });
    const values = numbers.map(calculateNumber);

    if (values.length === 2) return values.reduce(R.multiply, 1);
  }

  let sum = 0;

  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      if (/^[*]*$/.test(char)) {
        const gearRatio = findNumbers(i, j);
        if (gearRatio) sum += gearRatio;
      }
    });
  });

  return sum;
}

calculateTotal(sampleData); // => 467835
calculateTotal(data); // => 69527306
