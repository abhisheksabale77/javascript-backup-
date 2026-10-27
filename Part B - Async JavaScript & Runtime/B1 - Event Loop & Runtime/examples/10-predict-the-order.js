// Predict the order before running this file.
// Run: node examples/10-predict-the-order.js

console.log("1: synchronous");

setTimeout(() => console.log("5: timer"), 0);
Promise.resolve().then(() => console.log("4: Promise microtask"));
process.nextTick(() => console.log("3: nextTick"));

console.log("2: synchronous");

// Node output: 1, 2, 3, 4, 5
// Try this: move the Promise and nextTick registrations and predict again.
