// Classes are cleaner syntax over prototypes.
// Run: node examples/11-classes.js

class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return "Hi " + this.name;
  }
}

const u = new User("Aman");
console.log(u.name);    // Aman
console.log(u.greet()); // Hi Aman

console.log(typeof User); // function
console.log(Object.getPrototypeOf(u) === User.prototype); // true
console.log(Object.keys(User.prototype)); // [] (methods are not enumerable)

try {
  User("Aman");
} catch (err) {
  console.log("Error:", err.message); // Class constructor User cannot be invoked without 'new'
}

// Try this: add a static method to User and call it on the class.
