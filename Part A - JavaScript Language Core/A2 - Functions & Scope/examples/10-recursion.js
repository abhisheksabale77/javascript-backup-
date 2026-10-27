// Recursion: a function calls itself until the base case.
// Run: node examples/10-recursion.js

function factorial(n) {
  if (n <= 1) return 1; // base case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120

// Try this: write a recursive `countdown(n)` that prints n, n-1, ... 0.
