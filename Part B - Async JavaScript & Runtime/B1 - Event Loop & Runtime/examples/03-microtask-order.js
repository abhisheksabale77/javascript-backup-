// Current synchronous work finishes before Promise callbacks run.
// Run: node examples/03-microtask-order.js

console.log("sync start");

setTimeout(() => console.log("timer task"), 0);
Promise.resolve().then(() => console.log("Promise microtask"));

console.log("sync end");

// Output: sync start, sync end, Promise microtask, timer task
// Try this: add another .then() callback and predict its position.
