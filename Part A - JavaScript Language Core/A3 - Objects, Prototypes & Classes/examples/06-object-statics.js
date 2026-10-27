// Object static helpers for reading and converting objects.
// Run: node examples/06-object-statics.js

const user = { name: "Aman", age: 20 };

console.log(Object.keys(user));    // [ 'name', 'age' ]
console.log(Object.values(user));  // [ 'Aman', 20 ]
console.log(Object.entries(user)); // [ [ 'name', 'Aman' ], [ 'age', 20 ] ]

const fromPairs = Object.fromEntries([["a", 1], ["b", 2]]);
console.log(fromPairs); // { a: 1, b: 2 }

const target = { a: 1 };
Object.assign(target, { b: 2 });
console.log(target); // { a: 1, b: 2 }

// Integer-like keys come first, in ascending order.
console.log(Object.keys({ b: 1, 2: "two", a: 2, 1: "one" }));
// [ '1', '2', 'b', 'a' ]

// Try this: build an object from an array of entries with fromEntries.
