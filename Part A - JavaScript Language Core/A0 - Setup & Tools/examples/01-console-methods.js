// console methods show output at different levels.
// Run: node examples/01-console-methods.js

console.log("normal message");
console.warn("warning message");
console.error("error message");

// console.table prints arrays of objects as a table.
console.table([
  { name: "Aman", score: 90 },
  { name: "Riya", score: 85 },
]);

// Output:
// normal message
// warning message
// error message
// (a table with name and score columns)

// Try this: add a third student to the table and run the file again.
