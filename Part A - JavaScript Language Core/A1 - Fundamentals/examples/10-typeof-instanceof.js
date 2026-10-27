// typeof checks primitives. instanceof checks the prototype chain.
// Run: node examples/10-typeof-instanceof.js

console.log(typeof "hi");       // Output: string
console.log(typeof 42);         // Output: number
console.log(typeof undefined);  // Output: undefined
console.log(typeof null);       // Output: object
console.log(typeof []);         // Output: object
console.log(Array.isArray([])); // Output: true

class User {}
const u = new User();
console.log(u instanceof User); // Output: true

// Try this: check `typeof function () {}` — it returns "function".
