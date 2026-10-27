// Dot vs bracket access. Lookup walks the prototype chain.
// Run: node examples/02-property-access.js

const user = { name: "Aman", age: 20 };

console.log(user.name);   // Aman
console.log(user["age"]); // 20

console.log("name" in user);              // true (own)
console.log("toString" in user);          // true (inherited)
console.log(Object.hasOwn(user, "name")); // true
console.log(Object.hasOwn(user, "toString")); // false

delete user.age;
console.log(user.age); // undefined

const missing = null;
console.log(missing?.name); // undefined (no crash)

// Try this: add a dynamic key variable and use brackets to read it.
