// Set stores unique values.
// Run: node examples/16-set.js

const set = new Set([1, 2, 2, 3, NaN, NaN]);

console.log(set); // Set(4) { 1, 2, 3, NaN }
console.log(set.size); // 4
console.log(set.has(2)); // true

set.add(4);
set.delete(1);
console.log([...set]); // [ 2, 3, NaN, 4 ]

const unique = [...new Set([1, 1, 2, 2, 3])];
console.log(unique); // [ 1, 2, 3 ]

// Set operations like union/intersection exist in newer Node versions.
// Try this: deduplicate an array of strings.
