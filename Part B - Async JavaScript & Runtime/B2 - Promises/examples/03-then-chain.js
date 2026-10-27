// Each then returns a new Promise and passes its result to the next handler.
// Run: node examples/03-then-chain.js

Promise.resolve(2)
  .then((value) => value * 3)
  .then((value) => value + 1)
  .then((value) => console.log(value)); // 7

// Try this: remove `return` by using braces and see what the next handler gets.
