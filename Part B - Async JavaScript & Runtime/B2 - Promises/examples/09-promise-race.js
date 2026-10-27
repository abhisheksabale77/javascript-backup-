// race settles with the first result, but does not cancel losing work.
// Run: node examples/09-promise-race.js

const work = new Promise((resolve) => {
  setTimeout(() => {
    console.log("work still finishes");
    resolve("data");
  }, 30);
});

const timeout = new Promise((_, reject) => {
  setTimeout(() => reject(new Error("timed out")), 5);
});

Promise.race([work, timeout])
  .then((value) => console.log(value))
  .catch((error) => console.log(error.message)); // timed out

// Output order: timed out, then work still finishes.
// Try this: use AbortController to cancel an actual fetch after a timeout.
