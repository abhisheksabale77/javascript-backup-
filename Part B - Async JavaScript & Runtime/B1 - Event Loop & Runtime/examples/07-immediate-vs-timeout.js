// Top-level ordering can vary; neither API is an exact clock.
// Run: node examples/07-immediate-vs-timeout.js

setTimeout(() => console.log("setTimeout callback"), 0);
setImmediate(() => console.log("setImmediate callback"));

// The two lines may appear in either order at top level.
// Try this: run it several times and observe the order on your Node version.
