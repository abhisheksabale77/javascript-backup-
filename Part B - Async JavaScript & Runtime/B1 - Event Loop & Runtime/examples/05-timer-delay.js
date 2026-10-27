// A timer callback runs after its delay and when the event loop can run it.
// Run: node examples/05-timer-delay.js

const { performance } = require("node:perf_hooks");
const start = performance.now();

setTimeout(() => {
  const elapsed = Math.round(performance.now() - start);
  console.log(`timer callback ran after about ${elapsed} ms`);
}, 20);

console.log("timer scheduled");

// The exact elapsed time varies; 20 ms is not an exact appointment.
// Try this: change 20 to 0. The callback still runs after this stack finishes.
