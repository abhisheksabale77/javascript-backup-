// Array creation basics.
// Run: node examples/10-array-basics.js

console.log(Array.of(3)); // [ 3 ]
console.log(Array(3).length); // 3 (holes)
console.log([...Array(3)]); // [ undefined, undefined, undefined ]

console.log(Array.from("abc")); // [ 'a', 'b', 'c' ]
console.log(Array.from([1, 2], (n) => n * 2)); // [ 2, 4 ]
console.log(Array.isArray([])); // true

const arr = [1, 2, 3];
arr.length = 2;
console.log(arr); // [ 1, 2 ] (truncated)

// Try this: log `typeof []` and compare with `Array.isArray([])`.
