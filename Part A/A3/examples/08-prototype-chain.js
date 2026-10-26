// Property lookup walks the prototype chain.
// Run: node examples/08-prototype-chain.js

const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks); // true (own)
console.log(dog.eats);  // true (inherited)

console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(Object.getPrototypeOf(animal) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null

const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(arr.hasOwnProperty("map")); // false (map is inherited)

// Try this: add a method to animal and call it from dog.
