// `this` depends on how the function is called.
// Run: node examples/13-this-rules.js

"use strict";

const user = {
  name: "Aman",
  greet() {
    return "Hi " + this.name;
  },
};

console.log(user.greet()); // Output: Hi Aman

const detached = user.greet;
try {
  console.log(detached()); // this is undefined in strict mode
} catch (err) {
  console.log("Error:", err.message);
}

function Person(name) {
  this.name = name;
}
const p = new Person("Riya");
console.log(p.name); // Output: Riya

// Try this: use `detached.call(user)` and see it work again.
