// Objects can remain usable after the function that created them returns.
// Run: node examples/02-heap-references.js

function makeUser() {
  return { name: "Mia" };
}

const first = makeUser();
const second = first;
second.name = "Noah";

console.log(first.name); // Noah (both variables refer to the same object)

// Stack/heap are helpful mental models, not a complete picture of V8 internals.
// Try this: return a new object from each call and compare the references.
