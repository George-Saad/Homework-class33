'use strict';
/*------------------------------------------------------------------------------
1. Complete the function `rollTheDices()` by using `Promise.race()`.
2. Refactor the function `main()` using async/await and try/catch.
3. Once you got this working, you may observe that some dices continue rolling 
   for some undetermined time after the promise returned by `Promise.race()` 
   resolves. Do you know why? Add your answer as a comment to the bottom of the 
   file.
------------------------------------------------------------------------------*/
// ! Do not remove this line
const rollDice = require('../../helpers/pokerDiceRoller');

function rollTheDices() {
  const dices = [
    rollDice(1),
    rollDice(2),
    rollDice(3),
    rollDice(4),
    rollDice(5),
  ];

  return Promise.race(dices);
}

// Refactor this function to use async/await and try/catch
async function main() {
  try {
    const results = await rollTheDices();
    console.log('Resolved!', results);
  } catch (err) {
    console.log('Rejected!', err.message);
  }
}

main();

// ! Do not change or remove the code below
module.exports = rollTheDices;
