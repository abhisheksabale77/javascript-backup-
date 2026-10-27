// Throws become rejections; catch can handle or recover from them.
// Run: node examples/05-catch-propagation.js

Promise.resolve("start")
  .then(() => {
    throw new Error("something failed");
  })
  .then(() => console.log("not reached"))
  .catch((error) => `Recovered: ${error.message}`)
  .then((value) => console.log(value)); // Recovered: something failed

// Try this: throw a new error inside catch and add another catch after it.
