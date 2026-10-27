// slice copies. splice mutates. flat flattens.
// Run: node examples/12-array-transform.js

const arr = [1, 2, 3, 4];

console.log(arr.slice(1, 3)); // [ 2, 3 ] (copy)
console.log(arr.splice(1, 2)); // [ 2, 3 ] (removed items)
console.log(arr); // [ 1, 4 ] (mutated)

console.log([1, [2, [3]]].flat(2)); // [ 1, 2, 3 ]
console.log([1, 2].flatMap((n) => [n, n * 10])); // [ 1, 10, 2, 20 ]
console.log([1, 2, 3].at(-1)); // 3
console.log(["a", "b"].join("-")); // a-b
console.log([1, 2].concat([3, 4])); // [ 1, 2, 3, 4 ]

// Try this: use flatMap to remove empty values while transforming.
