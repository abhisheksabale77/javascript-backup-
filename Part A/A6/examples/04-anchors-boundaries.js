// Anchors match positions, not characters.
// Run: node examples/04-anchors-boundaries.js

console.log(/^cat$/.test("cat")); // true
console.log(/^cat$/.test("a cat")); // false
console.log(/^two$/m.test("one\ntwo\nthree")); // true (a whole line)
console.log(/\bcat\b/i.test("a CAT!")); // true
console.log(/\Bcat\B/.test("scatters")); // true

// Try this: remove the anchors and see a substring match succeed.
