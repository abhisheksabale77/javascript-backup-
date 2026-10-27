// Lexical scope: a function sees where it was written.
// Run: node examples/07-lexical-scope.js

const message = "outer";

function outer() {
  const message = "inner";

  function inner() {
    console.log(message); // Output: inner
  }
  return inner;
}

const fn = outer();
fn();

// Try this: remove the inner `message` and run — it prints "outer".
