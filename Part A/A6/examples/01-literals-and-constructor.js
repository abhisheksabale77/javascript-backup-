// Use a literal for fixed patterns, RegExp for dynamic patterns.
// Run: node examples/01-literals-and-constructor.js

const literal = /cat/i;
console.log(literal.test("A CAT")); // true

const word = "cat";
const dynamic = new RegExp(`\\b${word}\\b`, "i");
console.log(dynamic.test("A cat!")); // true

// In a RegExp string, escape the backslash once for JavaScript.
console.log(new RegExp("\\d+").test("room 12")); // true

// Try this: change the dynamic word to "dog".
