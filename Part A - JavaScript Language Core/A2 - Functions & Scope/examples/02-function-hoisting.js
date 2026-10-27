// Declarations are hoisted with their body.
// Run: node examples/02-function-hoisting.js

console.log(sayHi()); // Output: hi

function sayHi() {
  return "hi";
}

try {
  console.log(sayBye());
} catch (err) {
  console.log("Error:", err.message); // sayBye is not a function
}

var sayBye = function () {
  return "bye";
};

// Try this: change `var sayBye` to `const sayBye` and compare the error.
