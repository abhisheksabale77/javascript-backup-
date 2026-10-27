# A3 — Notes (Simple English, Deep Dive)

Each section has: **Quick idea → Deep dive → Gotchas → Remember**.

## 1. Object creation
**Quick idea:** `{}` is the normal way. `Object.create(null)` makes a prototype-less dictionary.

**Deep dive:**
- Object keys are always **strings or symbols**. `{ 1: "a" }` stores the key `"1"`.
- Computed keys `[expr]` are evaluated **once**, when the object is created.
- Shorthand `{ name }` means `{ name: name }`.
- Object literals get `Object.prototype` as their prototype.
- `Object.create(proto)` lets you choose the prototype. `Object.create(null)` gives no prototype at all.
```js
const key = "age";
const user = { name: "Aman", [key]: 20 };
console.log(user); // { name: 'Aman', age: 20 }
```

**Gotchas:**
- Duplicate keys: the last one wins.
- Numeric-looking keys are reordered when enumerated (see section 6).

**Remember:** computed keys are evaluated at creation, not at access.

## 2. Property access and lookup
**Quick idea:** dot access for fixed names, brackets for dynamic names. Lookup walks the prototype chain.

**Deep dive:**
- `obj.key` and `obj["key"]` do the same thing. Brackets are required for dynamic keys and symbols.
- Lookup order: own property → prototype → prototype's prototype → ... → `null`.
- `"key" in obj` checks **own and inherited** properties.
- `Object.hasOwn(obj, "key")` checks **own** properties only.
- `delete obj.key` removes an own, configurable property. It cannot delete inherited or non-configurable properties.
- Optional chaining `obj?.a?.b` stops at the first `null`/`undefined` and returns `undefined`.

**Gotchas:**
- `obj.hasOwnProperty(...)` can be shadowed or missing (especially with `Object.create(null)`). Prefer `Object.hasOwn`.
- `delete` does not free nested objects by itself.

**Remember:** `in` includes inherited keys; `hasOwn` does not.

## 3. Property descriptors
**Quick idea:** every property has hidden settings that control how it behaves.

**Deep dive:**
- **Data descriptor:** `value`, `writable`, `enumerable`, `configurable`.
- **Accessor descriptor:** `get`, `set`, `enumerable`, `configurable`.
- `Object.defineProperty` defaults everything to `false` and `value` to `undefined`.
- Properties created with a literal default all flags to `true`.
- `enumerable: false` hides a property from `for...in`, `Object.keys`, spread, and `JSON.stringify`.
- `configurable: false` blocks deletion and redefinition. One exception: `writable: true` can be changed to `false`.
```js
const obj = {};
Object.defineProperty(obj, "hidden", { value: 42, enumerable: false });
console.log(obj.hidden);      // 42
console.log(Object.keys(obj)); // []
```

**Gotchas:**
- `defineProperty` defaults are the opposite of literal defaults.
- A non-configurable property cannot be made configurable again.

**Remember:** `enumerable` controls visibility to loops and JSON, not normal access.

## 4. Object integrity
**Quick idea:** three levels of locking: `preventExtensions` < `seal` < `freeze`.

**Deep dive:**
- `Object.preventExtensions(obj)` — no new properties. Existing ones can still change or be deleted.
- `Object.seal(obj)` — no new properties, no deletion. Existing writable values can still change.
- `Object.freeze(obj)` — no new properties, no deletion, no value changes.
- All three are **shallow**. Nested objects remain mutable.
- In strict mode, failed writes throw `TypeError`. In sloppy mode they fail silently.
```js
const frozen = Object.freeze({ a: 1 });
frozen.a = 2;            // fails
console.log(frozen.a);   // 1
```

**Gotchas:**
- `Object.freeze` does not deep-freeze.
- Arrays can be frozen too, but their objects inside are still mutable.

**Remember:** freeze = seal + read-only values, but only one level deep.

## 5. Getters and setters
**Quick idea:** functions that run when a property is read or written.

**Deep dive:**
- A getter replaces the `value` with a function that runs on access.
- A setter receives the assigned value.
- `this` inside a getter/setter is the object being accessed.
- Common uses: computed values, validation, lazy loading.
- Accessors can live on a prototype, so every instance shares the logic.
```js
const user = {
  first: "Aman",
  last: "Sharma",
  get fullName() { return this.first + " " + this.last; },
  set fullName(v) { [this.first, this.last] = v.split(" "); },
};
console.log(user.fullName); // Aman Sharma
```

**Gotchas:**
- A getter that reads the same property causes infinite recursion.
- JSON serializes the getter's **value**, not the getter function.

**Remember:** get/set look like properties but run like methods.

## 6. Object static methods
**Quick idea:** tools to read, convert, and copy objects.

**Deep dive:**
- `Object.keys/values/entries` return **own enumerable string-keyed** properties.
- Key order: integer-like keys ascending first, then string keys in insertion order, then symbols (only `Reflect.ownKeys` shows symbols).
- `Object.fromEntries(pairs)` turns `[[k, v], ...]` into an object.
- `Object.assign(target, ...sources)` copies own enumerable properties (including symbols), **mutates target**, and triggers setters.
- Object spread `{ ...source }` also copies own enumerable properties, but **creates a new object** and defines properties instead of triggering setters.
- `Object.create(proto, descriptors)` creates an object with a chosen prototype.
- `Object.hasOwn(obj, key)` is the safe own-property check.
```js
console.log(Object.entries({ a: 1, b: 2 })); // [ [ 'a', 1 ], [ 'b', 2 ] ]
```

**Gotchas:**
- `Object.assign` with `__proto__`-like input can be risky; validate untrusted data.
- Inherited properties are never copied by spread or `assign`.

**Remember:** spread creates, `assign` mutates, both are shallow.

## 7. Copying objects
**Quick idea:** spread/`assign` copy one level. `structuredClone` copies deeply.

**Deep dive:**
- `{ ...obj }` copies own enumerable properties (strings and symbols) into a new plain object.
- It does **not** copy the prototype and turns getters into plain values.
- Nested objects are still shared — this is a **shallow copy**.
- `structuredClone(obj)` performs a real deep clone for structured-cloneable data: objects, arrays, `Date`, `Map`, `Set`, `ArrayBuffer`, typed arrays.
- `structuredClone` fails on functions, symbols, DOM nodes, and class prototypes are lost (instances become plain objects).
- JSON round-trip (`JSON.parse(JSON.stringify(x))`) is lossy: `undefined`, functions, and symbols disappear; dates become strings; `Map`/`Set` become `{}`; `BigInt` throws.
```js
const original = { nested: { n: 1 } };
const shallow = { ...original };
shallow.nested.n = 99;
console.log(original.nested.n); // 99
```

**Gotchas:**
- Spreading a class instance loses its class methods.
- `structuredClone` throws `DataCloneError` for non-cloneable values.

**Remember:** shallow copy shares nested data; deep copy does not.

## 8. Prototype chain
**Quick idea:** every object points to a prototype object; lookup follows that chain.

**Deep dive:**
- Each object has an internal `[[Prototype]]` that is either `null` or another object.
- Property lookup: own → `[[Prototype]]` → its `[[Prototype]]` → ... → `null`.
- Methods are stored once on the prototype and shared by all instances, saving memory.
- `Object.getPrototypeOf(obj)` reads the link.
- A normal object chain ends at `Object.prototype`, whose prototype is `null`.
- Arrays inherit from `Array.prototype`, functions from `Function.prototype`.
```js
const animal = { eats: true };
const dog = Object.create(animal);
console.log(dog.eats); // true (inherited)
```

**Gotchas:**
- Setting a property on the prototype affects every object that inherits it.
- Very long chains slow down lookups.

**Remember:** `dog.eats` works because lookup walks up the chain.

## 9. `__proto__`, `prototype`, `constructor`
**Quick idea:** three related names that mean different things.

**Deep dive:**
- `__proto__` is a legacy accessor on `Object.prototype` that exposes an object's `[[Prototype]]`. Prefer `Object.getPrototypeOf` / `Object.setPrototypeOf`.
- `Fn.prototype` is a normal object. When you use `new Fn()`, the new object's `[[Prototype]]` becomes `Fn.prototype`.
- `obj.constructor` is found through the prototype chain and usually points to the function that created the object.
- Reassigning `Fn.prototype` breaks the default `constructor` link unless you set it back.
- Arrow functions have no `prototype` property and cannot be constructors.
```js
function Person(name) { this.name = name; }
const p = new Person("Aman");
console.log(Object.getPrototypeOf(p) === Person.prototype); // true
console.log(p.constructor === Person); // true
```

**Gotchas:**
- `__proto__` on a `Object.create(null)` object does not exist.
- `constructor` is not a reliable type check — use `instanceof` or `Object.hasOwn`.

**Remember:** `prototype` belongs to the constructor function; `[[Prototype]]` belongs to the object.

## 10. The `new` operator
**Quick idea:** `new` creates an object, links it to the prototype, runs the constructor, and returns the object.

**Deep dive:** four steps:
1. Create a new empty object.
2. Set its `[[Prototype]]` to `Fn.prototype`.
3. Run `Fn` with `this` = the new object.
4. If `Fn` returns an **object**, return that object; otherwise return the new object.
```js
function Person(name) { this.name = name; }
const p = new Person("Aman");
console.log(p.name); // Aman
```
- Returning a primitive from a constructor is ignored.
- Class constructors must be called with `new`.
- `new.target` is defined only inside a constructor call.

**Gotchas:**
- Forgetting `new` on an old-style function sets properties on the global object (sloppy mode).
- Returning an object from a constructor replaces the created instance.

**Remember:** `new` = create + link + run + return.

## 11. Classes
**Quick idea:** classes are cleaner syntax over prototypes.

**Deep dive:**
- A class body is always in **strict mode**.
- Methods are non-enumerable and live on `Class.prototype`.
- Instance fields are created per instance, before the constructor body runs (after `super()` in a derived class).
- Class declarations are hoisted but stay in the **TDZ** until evaluated — you cannot use them before their line.
- `typeof ClassName` is `"function"`, but calling it without `new` throws.
```js
class User {
  constructor(name) { this.name = name; }
  greet() { return "Hi " + this.name; }
}
const u = new User("Aman");
console.log(u.greet()); // Hi Aman
```

**Gotchas:**
- Class methods are not enumerable, unlike object literal methods.
- Using `this` before `super()` in a derived constructor throws.

**Remember:** class = prototype + strict mode + no-call-without-new.

## 12. Class extras: static, private, static blocks
**Quick idea:** `static` belongs to the class. `#` makes a field truly private.

**Deep dive:**
- Static methods/fields live on the class itself, not on instances. Subclasses inherit them.
- `static` methods receive `this` = the class used to call them.
- Private `#field` must be declared inside the class. It is not on the prototype and cannot be accessed outside.
- `#field in obj` checks whether an object has that private brand.
- `static { ... }` runs once when the class is evaluated. It can access private static fields.
```js
class Counter {
  static count = 0;
  #value = 0;
  increment() { this.#value++; Counter.count++; return this.#value; }
  static hasValue(obj) { return #value in obj; }
}
```

**Gotchas:**
- Private fields are not inherited into subclass code — a subclass cannot read `this.#parentField`.
- Calling a private method on the wrong object throws a `TypeError`.

**Remember:** `#` is real privacy, not just a naming convention.

## 13. Inheritance: extends and super
**Quick idea:** `extends` links both the instance chain and the static chain.

**Deep dive:**
- `class Child extends Parent` sets `Child.prototype.[[Prototype]] = Parent.prototype`.
- It also sets `Child.[[Prototype]] = Parent`, so static members are inherited.
- In a derived constructor, `super(...)` must be called before using `this`.
- `super.method()` calls the parent method but keeps the current `this`.
- `instanceof` checks the prototype chain and can be customised with `Symbol.hasInstance`.
```js
class Dog extends Animal {
  speak() { return super.speak() + " (woof)"; }
}
```
```js
class Even {
  static [Symbol.hasInstance](n) { return n % 2 === 0; }
}
console.log(2 instanceof Even); // true
```

**Gotchas:**
- Forgetting `super()` in a derived constructor throws a `ReferenceError`.
- Overriding a method does not call the parent automatically — use `super.method()`.

**Remember:** `super()` = run parent constructor; `super.method()` = run parent method.

## 14. Mixins and composition
**Quick idea:** share behaviour without deep inheritance chains.

**Deep dive:**
- **Object mixin:** copy methods onto a prototype with `Object.assign(Class.prototype, mixin)`.
- **Functional mixin:** a function that takes a class and returns a subclass:
```js
const withFly = (Base) => class extends Base {
  fly() { return this.name + " flies"; }
};
```
- Mixins avoid the fragile base class problem and deep chains.
- **Composition:** build an object from small parts (`{ ...canFly, ...canSwim }`) or inject dependencies instead of inheriting them.
- Composition is usually easier to test and change than inheritance.

**Gotchas:**
- Mixins can collide on method names — the last copy wins.
- Mixins with state are harder to reason about than pure behaviour.

**Remember:** prefer "has a" / "can do" composition over "is a" inheritance when behaviour varies.

## 15. JSON deep dive
**Quick idea:** JSON is text. Only certain values survive the trip.

**Deep dive:**
- `JSON.stringify` rules:
  - `undefined`, functions, and symbols are **omitted** in objects and become `null` in arrays.
  - `NaN` and `Infinity` become `null`.
  - `BigInt` throws `TypeError`.
  - `Date` becomes an ISO string through `toJSON`.
  - `Map` and `Set` become `{}`.
  - Circular references throw `TypeError`.
- `toJSON()` lets an object control its own serialization.
- `JSON.parse(text, reviver)` can transform values while parsing (for example, turn date strings into `Date`).
- JSON is stricter than JavaScript: double quotes only, no comments, no trailing commas.
```js
JSON.stringify({ a: undefined, b: NaN }); // '{"b":null}'
JSON.stringify([undefined]);              // '[null]'
```
- Untrusted JSON plus a naive deep-merge can lead to prototype pollution. Validate and use `Object.create(null)` or `Object.hasOwn` checks.

**Gotchas:**
- `JSON.stringify` ignores symbol keys.
- Dates come back as strings unless you revive them.
- `structuredClone` is usually better for in-memory deep copies; JSON is for text exchange.

**Remember:** JSON is a data format, not a full JavaScript object copy tool.

## 16. Quick summary
- Objects: literal, `new Object`, `Object.create(proto|null)`.
- Lookup: own → prototype chain → `null`.
- Descriptors control writable/enumerable/configurable.
- freeze/seal/preventExtensions are shallow.
- `new` = create + link + run + return.
- Classes = strict prototypes; `#` = private; `static` = on the class.
- `super()` runs the parent constructor; `super.method()` runs the parent method.
- Prefer composition/mixins over deep inheritance.
- JSON drops `undefined`/functions/symbols, turns dates into strings, and throws on `BigInt` and circular data.
