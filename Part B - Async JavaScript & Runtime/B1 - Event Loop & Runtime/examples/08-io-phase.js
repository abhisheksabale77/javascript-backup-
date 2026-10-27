// Inside an I/O callback, setImmediate runs before a zero-delay timer.
// Run: node examples/08-io-phase.js

const fs = require("node:fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("timer callback"), 0);
  setImmediate(() => console.log("immediate callback"));
});

// Output: immediate callback, then timer callback
// Try this: replace readFile with another asynchronous I/O callback.
