'use strict';
/*------------------------------------------------------------------------------
1. Run the unmodified exercise and observe that it works as advertised. Observe 
   that the dice must be thrown an indeterminate number of times until we get an 
   ACE or until it rolls off the table.
2. Now, rewrite the body of the `rollDiceUntil()` function using async/await and 
   without using recursion. Hint: a `while` loop may come handy.
3. Refactor the function `main()` to use async/await and try/catch.
------------------------------------------------------------------------------*/
// ! Do not change or remove the next two lines
const rollDice = require('../../helpers/pokerDiceRoller');

async function rollDiceUntil(wantedValue) {
  let value = await rollDice(1);
  while (value !== wantedValue) {
    value = await rollDice(1);
  }
  return value;
}

// TODO refactor this function to use try/catch
async function main() {
  try {
    const results = await rollDiceUntil('ACE');
    console.log('Resolved!', results);
  } catch (err) {
    console.log('Rejected!', err.message);
  }
}

main();

// ! Do not change or remove the code below
module.exports = rollDiceUntil;
