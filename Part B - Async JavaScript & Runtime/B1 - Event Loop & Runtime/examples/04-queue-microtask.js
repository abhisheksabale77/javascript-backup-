// Promise reactions and queueMicrotask callbacks use the microtask queue.
// Run: node examples/04-queue-microtask.js

console.log("start");
queueMicrotask(() => console.log("microtask A"));
Promise.resolve().then(() => console.log("microtask B"));
queueMicrotask(() => console.log("microtask C"));
console.log("end");

// Output: start, end, microtask A, microtask B, microtask C
// Try this: schedule a microtask from inside microtask A.
