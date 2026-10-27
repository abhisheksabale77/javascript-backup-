// An iterator returns one result at a time.
// Run: node examples/01-iterator-protocol.js

const iterator = ["a", "b"][Symbol.iterator]();

console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Try this: create an iterator from a string and call next() twice.
