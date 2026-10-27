// return sends a value back and stops the function.
// Run: node examples/04-returns.js

function abs(n) {
  if (n < 0) return -n; // early return
  return n;
}

function noReturn() {
  const x = 1;
}

console.log(abs(-5));    // Output: 5
console.log(noReturn()); // Output: undefined

// Try this: remove the early return and see the bug.
