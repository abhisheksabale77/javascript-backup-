// A Promise settles only once; later resolve/reject calls are ignored.
// Run: node examples/02-settle-once.js

const promise = new Promise((resolve, reject) => {
  resolve("first result");
  reject(new Error("ignored rejection"));
  resolve("ignored second result");
});

promise.then((value) => console.log(value)); // first result

// Resolving with another Promise adopts its eventual result.
Promise.resolve(Promise.resolve(42)).then((value) => console.log(value)); // 42

// Try this: change the first resolve to reject and handle it with catch.
