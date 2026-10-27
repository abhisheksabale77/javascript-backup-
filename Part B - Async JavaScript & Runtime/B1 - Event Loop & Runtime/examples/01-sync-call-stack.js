// Synchronous functions finish before the next statement runs.
// Run: node examples/01-sync-call-stack.js

function second() {
  console.log("inside second");
}

function first() {
  console.log("inside first");
  second();
  console.log("back in first");
}

console.log("start");
first();
console.log("end");

// Output: start, inside first, inside second, back in first, end
// Try this: add a third function and draw the call stack while it runs.
