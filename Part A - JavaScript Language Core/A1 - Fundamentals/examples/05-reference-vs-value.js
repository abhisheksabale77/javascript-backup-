// Primitives copy by value. Objects copy by reference.
// Run: node examples/05-reference-vs-value.js

let a = 5;
let b = a;
b = 10;
console.log(a, b); // Output: 5 10

const first = { n: 1 };
const second = first;
second.n = 2;
console.log(first.n, second.n); // Output: 2 2

// Try this: use `{ ...first }` to copy the object, then change the copy only.
