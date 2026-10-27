// yield* forwards values from another iterable.
// Run: node examples/07-yield-delegation.js

function* all() {
  yield 1;
  yield* [2, 3];
  yield 4;
}

console.log([...all()]); // [ 1, 2, 3, 4 ]

function* child() {
  yield "first";
  return "child result";
}

function* parent() {
  const result = yield* child();
  yield result;
}

console.log([...parent()]); // [ 'first', 'child result' ]

// Try this: delegate to a string with yield*.
