// Objects can be created in several ways.
// Run: node examples/01-object-creation.js

const literal = { name: "Aman" };

const key = "age";
const withComputed = { [key]: 20 }; // computed key

const shorthandName = "Riya";
const shorthand = { shorthandName }; // same as { shorthandName: shorthandName }

const noProto = Object.create(null); // dictionary with no prototype
noProto.x = 1;

console.log(literal);      // { name: 'Aman' }
console.log(withComputed); // { age: 20 }
console.log(shorthand);    // { shorthandName: 'Riya' }
console.log(Object.getPrototypeOf(noProto)); // null

// Try this: create an object with a symbol key and log its keys.
