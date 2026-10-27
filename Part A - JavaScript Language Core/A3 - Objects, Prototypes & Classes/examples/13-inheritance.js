// extends links prototypes; super calls the parent.
// Run: node examples/13-inheritance.js

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // must run before using this
    this.kind = "dog";
  }

  speak() {
    return super.speak() + " (woof)";
  }
}

const d = new Dog("Tommy");
console.log(d.speak()); // Tommy makes a sound (woof)
console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true

// Static members are inherited too.
class Cat extends Animal {}
console.log(Object.getPrototypeOf(Cat) === Animal); // true

// Try this: remove super(name) and run to see the error.
