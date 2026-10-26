// static, private fields, and static blocks.
// Run: node examples/12-class-features.js

class Counter {
  static count = 0;
  #value = 0;

  static {
    console.log("static block runs once");
  }

  increment() {
    this.#value++;
    Counter.count++;
    return this.#value;
  }

  static hasValue(obj) {
    return #value in obj; // brand check
  }
}

const c = new Counter();
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(Counter.count); // 2
console.log(Counter.hasValue(c)); // true
console.log(Counter.hasValue({})); // false

// Try this: uncomment `console.log(c.#value)` and see the SyntaxError.
