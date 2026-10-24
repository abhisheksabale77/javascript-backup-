// Higher-order functions take or return functions.
// Run: node examples/11-hof-callbacks.js

const numbers = [1, 2, 3, 4];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // Output: [ 2, 4, 6, 8 ]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // Output: [ 2, 4 ]

function runTwice(fn) {
  fn();
  fn();
}
runTwice(() => console.log("hello")); // Output: hello (twice)

// Try this: use reduce to sum the numbers.
