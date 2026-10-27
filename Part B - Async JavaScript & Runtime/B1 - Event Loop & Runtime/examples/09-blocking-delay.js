// Long synchronous work delays timers and other JavaScript callbacks.
// Run: node examples/09-blocking-delay.js

const { performance } = require("node:perf_hooks");
const start = performance.now();

setTimeout(() => {
  const elapsed = Math.round(performance.now() - start);
  console.log(`timer finally ran after about ${elapsed} ms`);
}, 0);

while (performance.now() - start < 100) {
  // This loop blocks the event loop for about 100 ms.
}

console.log("blocking loop finished");

// The loop finishes before the timer callback can run.
// Try this: reduce the loop to 10 ms, then increase it to 500 ms.
