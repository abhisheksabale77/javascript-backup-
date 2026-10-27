// finally runs for both outcomes and normally preserves the original result.
// Run: node examples/06-finally-behavior.js

Promise.resolve("saved")
  .finally(() => console.log("cleanup after success"))
  .then((value) => console.log(value)); // saved

Promise.reject(new Error("failed"))
  .finally(() => console.log("cleanup after failure"))
  .catch((error) => console.log(error.message)); // failed

// A throw inside finally would replace the earlier outcome.
// Try this: return a normal value from finally; the original result stays.
