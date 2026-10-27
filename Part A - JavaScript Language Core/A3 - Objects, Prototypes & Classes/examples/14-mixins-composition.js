// Share behaviour without deep inheritance.
// Run: node examples/14-mixins-composition.js

// Object mixin: copy methods onto the prototype.
const canFly = {
  fly() { return this.name + " flies"; },
};
const canSwim = {
  swim() { return this.name + " swims"; },
};

class Duck {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(Duck.prototype, canFly, canSwim);

const d = new Duck("Donald");
console.log(d.fly());  // Donald flies
console.log(d.swim()); // Donald swims

// Functional mixin: take a class, return a subclass.
const withFly = (Base) =>
  class extends Base {
    fly() { return this.name + " flies"; }
  };

class Bird {
  constructor(name) {
    this.name = name;
  }
}
const FlyingBird = withFly(Bird);
console.log(new FlyingBird("Tweety").fly()); // Tweety flies

// Try this: create a `withSwim` functional mixin and combine both.
