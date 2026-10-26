// BigInt stores exact large integers.
// Run: node examples/06-bigint.js

const big = 10n;

console.log(big + 5n); // 15n
console.log(7n / 2n); // 3n (truncates)
console.log(1n == 1); // true
console.log(1n === 1); // false

try {
  big + 1;
} catch (err) {
  console.log("Error:", err.message);
  // Cannot mix BigInt and other types, use explicit conversions
}

try {
  JSON.stringify({ big });
} catch (err) {
  console.log("JSON error:", err.message); // Do not know how to serialize a BigInt
}

// Try this: convert with `big.toString()` before serializing.
