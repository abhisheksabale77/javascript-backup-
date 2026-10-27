// Expressions produce a value. Statements perform an action.
// Run: node examples/01-statements-expressions.js

console.log(2 + 3);              // expression: 5
console.log("hi".toUpperCase()); // expression: HI

const x = 10;                    // statement: creates a variable
if (x > 5) {                     // statement: control flow
  console.log("x is big");       // Output: x is big
}

// Try this: put an if statement inside console.log and read the SyntaxError.
