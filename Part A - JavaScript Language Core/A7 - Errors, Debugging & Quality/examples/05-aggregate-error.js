// AggregateError represents multiple failures from one operation.
// Run: node examples/05-aggregate-error.js

const error = new AggregateError(
  [new Error("server A failed"), new Error("server B failed")],
  "All servers failed",
);

console.log(error.name); // AggregateError
console.log(error.message); // All servers failed
console.log(error.errors.map((item) => item.message));
// [ 'server A failed', 'server B failed' ]

// Promise.any also rejects with AggregateError when every promise rejects.
Promise.any([
  Promise.reject(new Error("first")),
  Promise.reject(new Error("second")),
]).catch((err) => console.log(err instanceof AggregateError)); // true

// Try this: print every message in error.errors.
