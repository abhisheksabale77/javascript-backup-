// There are seven primitive types.
// Run: node examples/04-primitive-types.js

const str = "text";
const num = 42;
const big = 10n;
const bool = true;
const undef = undefined;
const empty = null;
const sym = Symbol("id");

console.log(typeof str);   // Output: string
console.log(typeof num);   // Output: number
console.log(typeof big);   // Output: bigint
console.log(typeof bool);  // Output: boolean
console.log(typeof undef); // Output: undefined
console.log(typeof empty); // Output: object (old bug)
console.log(typeof sym);   // Output: symbol

// Try this: check `typeof []` and `typeof {}` — both are "object".
