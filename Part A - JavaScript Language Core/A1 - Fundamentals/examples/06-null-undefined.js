// undefined = not assigned. null = intentionally empty.
// Run: node examples/06-null-undefined.js

let notSet;
const empty = null;

console.log(notSet);           // Output: undefined
console.log(empty);            // Output: null
console.log(notSet == empty);  // Output: true
console.log(notSet === empty); // Output: false
console.log(typeof undefined); // Output: undefined
console.log(typeof null);      // Output: object

// Try this: use `notSet ?? "fallback"` and see what it prints.
