// Pure functions: same input, same output, no side effects.
// Run: node examples/05-pure-impure.js

const add = (a, b) => a + b; // pure
console.log(add(2, 3));      // Output: 5
console.log(add(2, 3));      // Output: 5

let total = 0;
function addToTotal(n) {     // impure: changes outside state
  total += n;
}
addToTotal(5);
console.log(total);          // Output: 5

// Try this: make a pure version: `const addTo = (total, n) => total + n;`
