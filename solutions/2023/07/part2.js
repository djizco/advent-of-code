/*
--- Part Two ---
To make things a little more interesting, the Elf introduces one additional rule. Now, J cards are jokers - wildcards that can act like whatever card would make the hand the strongest type possible.

To balance this, J cards are now the weakest individual cards, weaker even than 2. The other cards stay in the same order: A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J.

J cards can pretend to be whatever card is best for the purpose of determining hand type; for example, QJJQ2 is now considered four of a kind. However, for the purpose of breaking ties between two hands of the same type, J is always treated as J, not the card it's pretending to be: JKKK2 is weaker than QQQQ2 because J is weaker than Q.

Now, the above example goes very differently:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
32T3K is still the only one pair; it doesn't contain any jokers, so its strength doesn't increase.
KK677 is now the only two pair, making it the second-weakest hand.
T55J5, KTJJT, and QQQJA are now all four of a kind! T55J5 gets rank 3, QQQJA gets rank 4, and KTJJT gets rank 5.
With the new joker rule, the total winnings in this example are 5905.

Using the new joker rule, find the rank of every hand in your set. What are the new total winnings?
*/

const R = require('ramda');

const data = require('./data');
const sampleData = require('./sampleData');

const cardValues = 'J23456789TQKA'.split('');

const calculateHandStrength = (hand) => {
  if (hand === 'JJJJJ') return 7;
  let wildCards = 0;
  const cardTotals = {};
  const cards = hand.split('');

  cards.forEach(card => {
    if (card !== 'J' && !cardTotals[card]) cardTotals[card] = 0;
    if (card === 'J') {
      wildCards++;
    } else {
      cardTotals[card]++;
    }
  });

  const values = Object.values(cardTotals);

  const highest = Math.max(...values);
  const highestIndex = values.indexOf(highest);

  values[highestIndex] += wildCards;

  const pairs = values.reduce((prev, curr) => {
    if (curr === 2) return prev + 1;
    return prev;
  }, 0);

  if (values.includes(5)) return 7;
  if (values.includes(4)) return 6;
  if (values.includes(3) && values.includes(2)) return 5;
  if (values.includes(3)) return 4;

  if (pairs === 2) return 3;
  if (pairs === 1) return 2;
  return 1;
};

const compareHands = (a, b) => {
  for (let i = 0; i < 5; i++) {
    if (cardValues.indexOf(a[i]) > cardValues.indexOf(b[i])) {
      return 1;
    }
    if (cardValues.indexOf(a[i]) < cardValues.indexOf(b[i])) {
      return -1;
    }
  }

  return 0;
};

const sortByStrength = (a, b) => {
  if (a.strength > b.strength) return 1;
  if (a.strength < b.strength) return -1;

  const resultCompareHands = compareHands(a.hand, b.hand);

  return resultCompareHands;
};

const mapHand = (handData) => {
  const [hand, bet] = handData.split(' ');

  const strength = calculateHandStrength(hand);

  return {
    hand,
    bet: Number(bet),
    strength,
  };
};

function calculcateWinnings(data) {
  const hands = data.split('\n').map(mapHand);

  hands.sort(sortByStrength);

  const values = hands.map((hand, index) => hand.bet * (index + 1));

  return R.sum(values);
}

calculcateWinnings(sampleData); // => 5905
calculcateWinnings(data); // => // => 251195607
