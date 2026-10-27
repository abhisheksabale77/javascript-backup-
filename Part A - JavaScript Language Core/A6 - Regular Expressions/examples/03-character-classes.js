// Character classes match one character from a set.
// Run: node examples/03-character-classes.js

console.log(/[A-Z]\d/.test("B7")); // true
console.log(/[a-f]+/i.test("face")); // true
console.log(/[^0-9]/.test("7")); // false (only a digit)
console.log(/\s/.test("hello world")); // true (space)
console.log(/\D/.test("123x")); // true (non-digit exists)

// Escape a dot when it should mean a literal dot.
console.log(/\.js$/.test("app.js")); // true
console.log(/.js$/.test("appXjs")); // true (dot means any char)

// Try this: match a string containing only letters and digits.
