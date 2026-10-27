// Generators produce values only when requested.
// Run: node examples/08-lazy-infinite.js

function* ids() {
  let id = 1;
  while (true) yield id++;
}

function* take(iterable, count) {
  for (const value of iterable) {
    if (count-- <= 0) return;
    yield value;
  }
}

console.log([...take(ids(), 5)]); // [ 1, 2, 3, 4, 5 ]

// Try this: change 5 to 3. Never spread ids() directly; it is infinite.
