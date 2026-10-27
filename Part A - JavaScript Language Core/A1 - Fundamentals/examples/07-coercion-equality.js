// == converts types. === compares value and type.
// Run: node examples/07-coercion-equality.js

console.log("5" == 5);    // Output: true
console.log("5" === 5);   // Output: false
console.log(0 == false);  // Output: true
console.log(0 === false); // Output: false

console.log(Number("10")); // Output: 10 (explicit coercion)
console.log(String(10));   // Output: 10
console.log(Boolean(""));  // Output: false

// Falsy values: false, 0, -0, 0n, "", null, undefined, NaN
console.log(Boolean([]));  // Output: true (empty array is truthy)

// Try this: predict `[] == false` before running it.
