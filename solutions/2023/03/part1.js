/*
--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

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
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
*/

const R = require('ramda');

const sampleData = require('./sampleData');
const data = require('./data');

function calculateTotal(schematic) {
  const numbers = []; // { line, start, stop },

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

  function findFullNumber(x, y) {
    const start = findLeft(x, y);
    const stop = findRight(x, y);

    const number = { line: x, start, stop };

    if (!R.includes(number, numbers)) numbers.push(number);
  }

  function findNumber(x, y) {
    if (/^[0-9]*$/.test(lines[x][y])) {
      findFullNumber(x, y);
    }
  }

  function findNumbers(x, y) {
    findNumber(x - 1, y - 1);
    findNumber(x - 1, y);
    findNumber(x - 1, y + 1);
    findNumber(x, y - 1);
    findNumber(x, y + 1);
    findNumber(x + 1, y - 1);
    findNumber(x + 1, y);
    findNumber(x + 1, y + 1);
  }

  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      if (!/^[0-9.]*$/.test(char)) {
        findNumbers(i, j);
      }
    });
  });

  function calculateNumber({ line, start, stop }) {
    let number = '';

    for (let i = start; i <= stop; i++) {
      number += lines[line][i];
    }
    return Number(number);
  }

  const values = numbers.map(calculateNumber);

  return R.sum(values);
}

calculateTotal(sampleData); // => 4361
calculateTotal(data); // => 521515
