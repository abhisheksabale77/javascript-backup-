// Strict mode catches some unsafe behavior.
// Run: node examples/09-strict-mode.js

"use strict";

try {
  accidentalGlobal = 10;
} catch (error) {
  console.log(error.name); // ReferenceError
}

function showThis() {
  return this;
}
console.log(showThis()); // undefined in strict mode

// Modules and class bodies are strict automatically.
// Try this: remove "use strict" and compare the plain function call.
