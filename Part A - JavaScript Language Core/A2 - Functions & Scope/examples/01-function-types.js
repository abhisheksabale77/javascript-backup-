// Declaration, expression, and arrow functions.
// Run: node examples/01-function-types.js

function add(a, b) {                 // declaration
  return a + b;
}

const subtract = function (a, b) {   // expression
  return a - b;
};

const multiply = (a, b) => a * b;    // arrow

console.log(add(2, 3));      // Output: 5
console.log(subtract(5, 2)); // Output: 3
console.log(multiply(2, 3)); // Output: 6

// Try this: rewrite `add` as an arrow function.
