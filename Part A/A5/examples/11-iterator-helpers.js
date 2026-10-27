// Iterator helpers are available only in newer runtimes.
// Run: node examples/11-iterator-helpers.js

const iteratorFrom = globalThis.Iterator?.from;

if (typeof iteratorFrom === "function") {
  const result = iteratorFrom([1, 2, 3, 4])
    .map((n) => n * 2)
    .filter((n) => n > 4)
    .take(2)
    .toArray();
  console.log(result); // [ 6, 8 ]
} else {
  console.log("Iterator helpers are not supported by this Node.js version.");
  console.log("Use Node.js 22+ to try Iterator.from(...).map(...).take(...).");
}

// Try this: when supported, replace filter with drop(1).
