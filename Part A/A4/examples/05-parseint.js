// parseInt parses a prefix. Number converts the whole value.
// Run: node examples/05-parseint.js

console.log(parseInt("42px")); // 42
console.log(parseInt("0x10", 16)); // 16
console.log(parseInt("10", 2)); // 2

console.log(parseFloat("3.14abc")); // 3.14

console.log(Number("42px")); // NaN
console.log(Number("")); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number(true)); // 1

// Try this: compare `+"42px"` with `parseInt("42px", 10)`.
