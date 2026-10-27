// The Promise executor runs now; the .then handler runs later.
// Run: node examples/01-promise-executor.js

console.log("before");

new Promise((resolve) => {
  console.log("executor now");
  resolve("done");
}).then((value) => console.log("handler later:", value));

console.log("after");

// Output: before, executor now, after, handler later: done
// Try this: move the final console.log into the executor.
