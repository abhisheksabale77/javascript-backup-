// __proto__, prototype, and constructor are different things.
// Run: node examples/09-proto-prototype-constructor.js

function Person(name) {
  this.name = name;
}

const p = new Person("Aman");

console.log(Object.getPrototypeOf(p) === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
console.log(p.constructor === Person); // true (found through the chain)

// A prototype-less dictionary has no inherited methods.
const dict = Object.create(null);
dict.key = 1;
console.log(Object.getPrototypeOf(dict)); // null
console.log(typeof dict.hasOwnProperty); // undefined

// Try this: log `p.__proto__ === Person.prototype` (legacy but works).
