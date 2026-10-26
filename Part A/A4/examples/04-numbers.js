// Numbers are 64-bit floats, so some decimals are approximate.
// Run: node examples/04-numbers.js

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(9007199254740993); // 9007199254740992 (precision lost)

console.log((1.005).toFixed(2)); // "1.00" (rounding quirk)
console.log(Number.isInteger(5.0)); // true
console.log(Number.isFinite(Infinity)); // false

// Try this: compare 0.1 + 0.7 with 0.8 using a tolerance.
