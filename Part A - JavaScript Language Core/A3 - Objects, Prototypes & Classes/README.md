# A3 — Objects, Prototypes, Classes

**Time:** 2 weeks · **Priority:** `[B]` backend-critical

## Topics
- [ ] Object literals, computed keys, shorthand, methods
- [ ] Property access, `delete`, `in`, optional chaining
- [ ] Property descriptors: writable/enumerable/configurable
- [ ] `Object.defineProperty`, `freeze`, `seal`, `preventExtensions`
- [ ] Getters and setters
- [ ] `Object.keys/values/entries/fromEntries/assign/create/getPrototypeOf/hasOwn`
- [ ] Spread/rest for objects, shallow vs deep copy, `structuredClone`
- [ ] Prototype chain, `__proto__`, `Object.create`, constructor property
- [ ] Classes: constructor, methods, `static`, private `#fields`, static blocks
- [ ] Inheritance: `extends`, `super`, `instanceof`, mixins
- [ ] Composition over inheritance
- [ ] JSON: `parse`/`stringify`, replacer/reviver, edge cases

## Examples
15 runnable files, numbered to match `NOTES.md`:
```bash
node examples\01-object-creation.js
# ... up to 15-json-edge-cases.js
```

## Project
Build two things from scratch:
1. **Custom error hierarchy** — a base `AppError` with `statusCode`, then `NotFoundError`, `ValidationError`, and `UnauthorizedError` extending it. Each must have a correct `name` and stack trace.
2. **Custom collection class** — `List` with `add`, `get`, `remove`, `size`, `toArray`, and a `[Symbol.iterator]` so `for...of` works.

## Done when
- [ ] You can create objects three ways and explain the difference
- [ ] You can explain the prototype chain with a diagram or words
- [ ] You can use `extends` and `super` correctly, including `super.method()`
- [ ] You can choose composition over inheritance with a reason
- [ ] You can explain what `new` does in 4 steps
- [ ] You can handle JSON safely (undefined, dates, circular data)
- [ ] Your custom errors and `List` work with `for...of` and `instanceof`
