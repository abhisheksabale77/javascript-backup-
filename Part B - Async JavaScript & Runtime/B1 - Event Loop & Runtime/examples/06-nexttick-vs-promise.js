// In Node.js, nextTick callbacks run before Promise microtasks here.
// Run: node examples/06-nexttick-vs-promise.js

console.log("start");
Promise.resolve().then(() => console.log("Promise callback"));
process.nextTick(() => console.log("nextTick callback"));
console.log("end");

// Output in Node: start, end, nextTick callback, Promise callback
// Try this: replace process.nextTick with queueMicrotask and compare.
