// Symbols create unique property keys.
// Run: node examples/18-symbol.js

const id = Symbol("id");
const user = { name: "Aman", [id]: 123 };

console.log(user[id]); // 123
console.log(Object.keys(user)); // [ 'name' ]
console.log(Reflect.ownKeys(user)); // [ 'name', Symbol(id) ]
console.log(JSON.stringify(user)); // {"name":"Aman"}

const registered = Symbol.for("app.id");
console.log(Symbol.for("app.id") === registered); // true
console.log(Symbol.keyFor(registered)); // app.id

// Well-known symbols customise language behaviour.
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next: () =>
        current <= end
          ? { value: current++, done: false }
          : { value: undefined, done: true },
    };
  }
}

console.log([...new Range(1, 3)]); // [ 1, 2, 3 ]

// Try this: give an object a Symbol.toPrimitive method.
