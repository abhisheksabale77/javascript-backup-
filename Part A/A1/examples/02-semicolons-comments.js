// Semicolons end statements. Comments explain code.
// Run: node examples/02-semicolons-comments.js

const a = 5; // single-line comment

/* multi-line
   comment */

console.log(a); // Output: 5

// ASI (automatic semicolon insertion) usually works,
// but a line starting with ( or [ can join the previous line.
const b = 1;
const c = 2;
console.log(b + c); // Output: 3

// Try this: remove the semicolon after `const a = 5` — it still works.
