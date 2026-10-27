// Shallow copy shares nested data. structuredClone copies deeply.
// Run: node examples/07-copying.js

const original = { name: "Aman", nested: { score: 1 } };

const shallow = { ...original };
shallow.nested.score = 99;
console.log(original.nested.score); // 99 (same nested object)

const deep = structuredClone(original);
deep.nested.score = 50;
console.log(original.nested.score); // 99 (not affected)

// JSON round-trip is lossy:
const withDate = { when: new Date("2024-01-01T00:00:00.000Z") };
const jsonCopy = JSON.parse(JSON.stringify(withDate));
console.log(typeof jsonCopy.when); // string (no longer a Date)

// structuredClone also loses the class prototype:
class Point {
  constructor() { this.x = 1; }
}
const clone = structuredClone(new Point());
console.log(clone instanceof Point); // false

// Try this: use Object.assign({}, original) and compare with spread.
