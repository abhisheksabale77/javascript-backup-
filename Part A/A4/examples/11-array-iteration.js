// Iteration methods and their return values.
// Run: node examples/11-array-iteration.js

const nums = [1, 2, 3, 4];

console.log(nums.map((n) => n * 2)); // [ 2, 4, 6, 8 ]
console.log(nums.filter((n) => n % 2 === 0)); // [ 2, 4 ]
console.log(nums.reduce((sum, n) => sum + n, 0)); // 10
console.log(nums.some((n) => n > 3)); // true
console.log(nums.every((n) => n > 0)); // true
console.log(nums.find((n) => n > 2)); // 3
console.log(nums.findIndex((n) => n > 2)); // 2
console.log(nums.findLast((n) => n > 2)); // 4

nums.forEach((n, i) => console.log(i, n)); // 0 1, 1 2, 2 3, 3 4

// Try this: use reduce to find the maximum value.
