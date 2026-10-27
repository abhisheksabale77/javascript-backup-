// A closure remembers variables from its outer function.
// Run: node examples/08-closures.js

function counter() {
  let count = 0;
  return () => ++count;
}

const next = counter();
console.log(next()); // Output: 1
console.log(next()); // Output: 2

const other = counter();
console.log(other()); // Output: 1 (fresh count)

// Try this: return two functions (increment and read) that share `count`.
