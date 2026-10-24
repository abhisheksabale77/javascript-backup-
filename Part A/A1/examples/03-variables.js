// const cannot be reassigned. let can. Avoid var.
// Run: node examples/03-variables.js

const name = "Aman";
let age = 20;
var oldStyle = "avoid me";

age = 21;
console.log(name, age, oldStyle); // Output: Aman 21 avoid me

// const locks the binding, not the contents:
const user = { name: "Riya" };
user.name = "Sita";
console.log(user.name); // Output: Sita

// Try this: write `name = "Bob";` and run — you get a TypeError.
