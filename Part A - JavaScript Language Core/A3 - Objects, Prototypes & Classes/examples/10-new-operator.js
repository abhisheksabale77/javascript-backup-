// new = create object + link prototype + run constructor + return.
// Run: node examples/10-new-operator.js

function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return "Hi " + this.name;
};

const p = new Person("Aman");
console.log(p.name);    // Aman
console.log(p.greet()); // Hi Aman

// Simulate what new does:
function fakeNew(Fn, ...args) {
  const obj = Object.create(Fn.prototype); // 1 + 2
  const result = Fn.apply(obj, args);      // 3
  return result !== null && typeof result === "object" ? result : obj; // 4
}

const q = fakeNew(Person, "Riya");
console.log(q.greet()); // Hi Riya
console.log(q instanceof Person); // true

// Try this: make Person return an object and see fakeNew return it instead.
