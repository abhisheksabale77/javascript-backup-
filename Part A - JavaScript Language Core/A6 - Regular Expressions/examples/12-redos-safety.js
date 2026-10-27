// Keep patterns simple and bound untrusted input.
// Run: node examples/12-redos-safety.js

// Risky shape to recognize — do NOT run it on a long adversarial string:
const riskyPattern = "^(a+)+$"; // nested, overlapping repetition
console.log(riskyPattern); // ^(a+)+$

const input = "a".repeat(10_000) + "!";
const safePattern = /^a{1,20}$/; // bounded repetition
const allowed = input.length <= 20 && safePattern.test(input);
console.log(allowed); // false (length check rejects it before regex matching)

// Regex matching is synchronous in Node and can block the event loop.
// Try this: make a simple anchored pattern with a bounded quantifier.
