// preventExtensions < seal < freeze. All are shallow.
// Run: node examples/04-object-integrity.js

const extensible = { a: 1 };
Object.preventExtensions(extensible);
extensible.a = 2; // allowed
extensible.b = 3; // silently fails in sloppy mode
console.log(extensible); // { a: 2 }

const sealed = Object.seal({ a: 1 });
sealed.a = 2; // allowed
delete sealed.a; // silently fails
console.log(sealed); // { a: 2 }
console.log(Object.isSealed(sealed)); // true

const frozen = Object.freeze({ a: 1 });
frozen.a = 2; // silently fails
console.log(frozen); // { a: 1 }
console.log(Object.isFrozen(frozen)); // true

// Try this: add "use strict"; at the top and watch the failures throw.
