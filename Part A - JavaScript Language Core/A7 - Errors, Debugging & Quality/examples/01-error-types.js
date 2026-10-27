// Choose an error type that describes the problem.
// Run: node examples/01-error-types.js

const errors = [
  new Error("Something went wrong"),
  new TypeError("Expected a number"),
  new RangeError("Value is outside the allowed range"),
  new SyntaxError("Text could not be parsed"),
];

for (const error of errors) {
  console.log(`${error.name}: ${error.message}`);
}

// Try this: create a ReferenceError and print its name and message.
