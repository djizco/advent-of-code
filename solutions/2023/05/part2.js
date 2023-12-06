/*
--- Part Two ---
Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

seeds: 79 14 55 13
This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?
*/

const sampleData = require('./sampleData');
const data = require('./data');

const mapToList = (map) => map
  .split(':\n')[1]
  .split('\n')
  .map(map => {
    const [destination, source, range] = map.split(' ').map(n => Number(n));

    return {
      destination,
      source,
      range,
    };
  });

function seedRangesToPairs(seedRanges) {
  const pairs = [];

  seedRanges.forEach((range, index) => {
    if (index % 2 === 0) {
      pairs[index / 2] = [range];
    } else {
      pairs[(index - 1) / 2].push(range);
    }
  });

  return pairs;
}

function findLocation(seed, mapsList) {
  mapsList.forEach(maps => {
    for (let i = 0; i < maps.length; i++) {
      const { source, destination, range } = maps[i];

      if (seed >= source && seed < source + range) {
        const difference = seed - source;
        seed = destination + difference;
        break;
      }
    }
  });

  return seed;
}

function findLowestLocation(almanac) {
  const [
    seeds,
    ...maps
  ] = almanac.split('\n\n');

  let lowest = Infinity;

  const mapList = maps.map(mapToList);
  const seedRanges = seeds.split(': ')[1].split(' ').map(n => Number(n));
  const seedPairs = seedRangesToPairs(seedRanges);

  seedPairs.forEach(pair => {
    const [start, range] = pair;

    for (let i = 0; i < range; i++) {
      const location = findLocation(start + i, mapList);
      if (location < lowest) {
        lowest = location;
      }
    }
  });

  return lowest;
}

findLowestLocation(sampleData); // => 46;
findLowestLocation(data); // => 137516820
