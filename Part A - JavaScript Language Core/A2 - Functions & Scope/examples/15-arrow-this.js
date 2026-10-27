// Arrow functions use the surrounding `this`.
// Run: node examples/15-arrow-this.js

"use strict";

const obj = {
  name: "Aman",
  regular() {
    return this.name;
  },
  arrow: () => this.name,
};

console.log(obj.regular()); // Output: Aman
console.log(obj.arrow()); // Output: undefined (outer this)

// Try this: move the arrow outside the object and compare.
