// Property descriptors control how a property behaves.
// Run: node examples/03-property-descriptors.js

const obj = {};

Object.defineProperty(obj, "hidden", {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log(obj.hidden); // 42 (still readable)
console.log(Object.keys(obj)); // [] (not enumerable)
console.log(JSON.stringify(obj)); // {} (not enumerable)

console.log(Object.getOwnPropertyDescriptor(obj, "hidden"));
// { value: 42, writable: false, enumerable: false, configurable: false }

// Try this: change enumerable to true and run again.
