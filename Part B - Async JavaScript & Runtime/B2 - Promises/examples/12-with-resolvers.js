// Promise.withResolvers is available only in newer runtimes.
// Run: node examples/12-with-resolvers.js

if (typeof Promise.withResolvers === "function") {
  const { promise, resolve } = Promise.withResolvers();

  promise.then((value) => console.log(value)); // ready
  resolve("ready");
} else {
  console.log("Promise.withResolvers is not supported by this Node.js version.");
  console.log("Use a newer Node.js version to try it.");
}

// Try this: destructure reject too and use it in a handled example.
