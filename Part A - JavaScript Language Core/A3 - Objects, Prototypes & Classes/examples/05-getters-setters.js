// Getters and setters run like properties but work like methods.
// Run: node examples/05-getters-setters.js

const user = {
  first: "Aman",
  last: "Sharma",

  get fullName() {
    return this.first + " " + this.last;
  },

  set fullName(value) {
    const [first, last] = value.split(" ");
    this.first = first;
    this.last = last;
  },
};

console.log(user.fullName); // Aman Sharma

user.fullName = "Riya Verma";
console.log(user.first); // Riya
console.log(user.last);  // Verma

// Try this: make the setter reject names without a space.
