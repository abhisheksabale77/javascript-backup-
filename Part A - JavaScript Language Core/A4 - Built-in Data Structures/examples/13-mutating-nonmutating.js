// Know which methods mutate the original array.
// Run: node examples/13-mutating-nonmutating.js

const original = [3, 1, 2];

const sortedCopy = original.toSorted((a, b) => a - b);
console.log(original); // [ 3, 1, 2 ] (not changed)
console.log(sortedCopy); // [ 1, 2, 3 ]

const reversedCopy = original.toReversed();
console.log(reversedCopy); // [ 2, 1, 3 ]

const replaced = original.with(1, 99);
console.log(replaced); // [ 3, 99, 2 ]
console.log(original); // [ 3, 1, 2 ]

original.sort((a, b) => a - b); // this one mutates
console.log(original); // [ 1, 2, 3 ]

// Try this: use push/pop and log the array after each call.
