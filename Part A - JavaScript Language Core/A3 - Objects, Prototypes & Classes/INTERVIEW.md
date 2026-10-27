# A3 — Interview Prep

## Q1. What are the ways to create an object?
Object literal `{}`, `new Object()`, `Object.create(proto)`, and class/constructor functions with `new`. `Object.create(null)` creates an object with no prototype.

## Q2. Difference between dot and bracket property access?
Dot access uses a fixed identifier (`obj.name`). Bracket access accepts any expression (`obj[key]`), including dynamic strings and symbols.

## Q3. What is a property descriptor?
An object that describes a property: `value`, `writable`, `enumerable`, `configurable` for data properties, or `get`/`set`/`enumerable`/`configurable` for accessor properties.

## Q4. Difference between `freeze`, `seal`, and `preventExtensions`?
`preventExtensions` blocks new properties. `seal` also blocks deletion. `freeze` also makes values read-only. All three are shallow.

## Q5. Difference between a data descriptor and an accessor descriptor?
A data descriptor stores a `value` and has `writable`. An accessor descriptor stores `get`/`set` functions and has no `value` or `writable`.

## Q6. How does property lookup work?
JavaScript checks the object's own properties first, then walks the prototype chain until it finds the key or reaches `null`. If nothing is found, the result is `undefined`.

## Q7. What is the prototype chain?
The linked list of prototype objects used for inheritance. Each object points to another object (or `null`), and property lookup follows this chain.

## Q8. Difference between `__proto__` and `prototype`?
`__proto__` is a legacy accessor for an object's internal `[[Prototype]]`. `prototype` is a property of constructor functions that becomes the `[[Prototype]]` of objects created with `new`.

## Q9. What is `Object.create(null)` used for?
It creates a dictionary object with no prototype, so inherited methods like `toString` or `hasOwnProperty` are absent. Useful for maps and avoiding prototype pollution.

## Q10. What are the four steps of the `new` operator?
1. Create a new empty object.
2. Set its `[[Prototype]]` to `Fn.prototype`.
3. Run `Fn` with `this` set to the new object.
4. Return the object, unless `Fn` explicitly returns another object.

## Q11. Difference between a class and a function constructor?
A class is syntax over prototypes. It is always strict mode, cannot be called without `new`, has non-enumerable methods, supports `extends`/`super`, private fields, and static blocks.

## Q12. How do private fields work?
Fields declared with `#` are accessible only inside the class body. They are not on the prototype, cannot be accessed outside, and support brand checks with `#field in obj`.

## Q13. What is a static block?
A `static { ... }` block runs once when the class is evaluated. It is useful for complex static initialisation and can access private static fields.

## Q14. How do `extends` and `super` work?
`extends` links the child prototype to the parent prototype and the child class to the parent class. `super()` calls the parent constructor; `super.method()` calls the parent method with the current `this`.

## Q15. What is `instanceof` and can it be customised?
`instanceof` checks whether a constructor's `prototype` appears in an object's prototype chain. It can be customised with `static [Symbol.hasInstance](obj)`.

## Q16. Mixins vs inheritance? What is composition?
Mixins copy or compose behaviour without a deep inheritance chain. Composition builds objects from small behaviours ("has a" / "can do") instead of inheriting from a base class ("is a"). Composition is usually easier to test and change.

## Q17. What are the pitfalls of `JSON.stringify`?
It drops `undefined`, functions, and symbols in objects (they become `null` in arrays), turns `NaN`/`Infinity` into `null`, converts `Date` to a string, turns `Map`/`Set` into `{}`, throws on `BigInt`, and throws on circular references.

## Q18. How do you deep clone an object? What are `structuredClone` limits?
Use `structuredClone(obj)`. It supports plain objects, arrays, `Date`, `Map`, `Set`, and typed arrays. It throws on functions, symbols, and DOM nodes, and class instances lose their prototype (become plain objects).

## Common Mistakes
- Using `obj.hasOwnProperty()` on an object created with `Object.create(null)` — the method does not exist.
- Thinking `Object.freeze` deep-freezes nested objects.
- Confusing `__proto__` with `prototype`.
- Forgetting `super()` in a derived constructor.
- Using an arrow function as a constructor or as an object method that needs its own `this`.
- Assuming class methods are enumerable — they are not.
- Reassigning `Fn.prototype` and expecting existing instances to change.
- Using `JSON.parse(JSON.stringify(obj))` for deep copies and losing dates, `undefined`, `Map`, and `Set`.
- Merging untrusted JSON into objects without guarding against prototype pollution.
- Returning a primitive from a constructor and expecting it to replace the instance.
